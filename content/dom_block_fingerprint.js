'use strict';
// 拦截浏览器硬件指纹

// 保存原始方法的引用，用于后期可能的恢复
const originals = {
    deviceMemory: Object.getOwnPropertyDescriptor(Navigator.prototype, 'deviceMemory')?.get,
    hardwareConcurrency: Object.getOwnPropertyDescriptor(Navigator.prototype, 'hardwareConcurrency')?.get,
    // 【优化】修正获取引用的原型对象：getImageData 存在于 CanvasRenderingContext2D，而非 HTMLCanvasElement
    getImageData: window.CanvasRenderingContext2D?.prototype.getImageData,
    matchMedia: window.matchMedia,
    getBoundingClientRect: Element.prototype.getBoundingClientRect,
    //
    offsetWidth: Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth')?.get,
    offsetHeight: Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight')?.get,
    fontCheck: window.FontFaceSet?.prototype.check
};

// 恢复原厂设置的函数
function restore_originals() {
    if (originals.deviceMemory) {
        Object.defineProperty(Navigator.prototype, 'deviceMemory', { get: originals.deviceMemory, configurable: true });
    }
    // if (originals.hardwareConcurrency) {
    //     Object.defineProperty(Navigator.prototype, 'hardwareConcurrency', { get: originals.hardwareConcurrency, configurable: true });
    // }
    if (originals.getImageData && window.CanvasRenderingContext2D) {
        CanvasRenderingContext2D.prototype.getImageData = originals.getImageData;
    }
    if (originals.matchMedia) {
        window.matchMedia = originals.matchMedia;
    }
    if (originals.getBoundingClientRect) {
        Element.prototype.getBoundingClientRect = originals.getBoundingClientRect;
    }
    if (originals.offsetWidth && originals.offsetHeight) {
        Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { get: originals.offsetWidth, configurable: true });
        Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { get: originals.offsetHeight, configurable: true });
    }
    if (originals.fontCheck && window.FontFaceSet) {
        FontFaceSet.prototype.check = originals.fontCheck;
    }

}

// 硬件特性反指纹
function block_device_pr() {
    // 1. deviceMemory - 直接删除
    if ('deviceMemory' in navigator) {
        Object.defineProperty(navigator, 'deviceMemory', {
            get: () => undefined,  // 返回 undefined 。4、6、8、12、16、24、32、64、128
            configurable: true // 【优化】改为 true 允许后续通过 restore_originals 还原
        });
    }

    // 1.5 hardwareConcurrency - 覆盖vCPU核心数
    // if ('hardwareConcurrency' in navigator) {
    //     Object.defineProperty(navigator, 'hardwareConcurrency', {
    //         get: () => 8, // 4、8、16、32
    //         configurable: true // 【优化】改为 true 允许还原
    //     });
    // }

    // 2. oscpu - 直接删除
    if ('oscpu' in navigator) {
        // 【优化】严格模式下 delete navigator.oscpu 会报错阻塞后续执行，改用 Object.defineProperty 安全覆盖
        Object.defineProperty(navigator, 'oscpu', {
            get: () => undefined,
            configurable: true
        });
    }

    // 3. webdriver - 设置为 false
    if ('webdriver' in navigator) {
        Object.defineProperty(navigator, 'webdriver', {
            get: () => false,
            configurable: true // 【优化】改为 true 允许还原
        });
    }

    // 4. language 和 languages - 保留前两位
    const originalLanguages = navigator.languages;
    if (originalLanguages && originalLanguages.length > 0) {
        const trimmedLanguages = originalLanguages.slice(0, 2);

        Object.defineProperty(navigator, 'languages', {
            get: () => trimmedLanguages,
            configurable: true // 【优化】改为 true 允许还原
        });

        Object.defineProperty(navigator, 'language', {
            get: () => trimmedLanguages[0],
            configurable: true // 【优化】改为 true 允许还原
        });
    }

    // 5. mimeTypes：标准化为只包含 PDF（带迭代器）
    if (navigator.mimeTypes) {
        const standardMimeTypes = {
            0: {
                type: 'application/pdf',
                suffixes: 'pdf',
                description: 'Portable Document Format',
                enabledPlugin: null
            },
            1: {
                type: 'text/pdf',
                suffixes: 'pdf',
                description: 'Portable Document Format',
                enabledPlugin: null
            },
            length: 2,
            item: function(index) {
                return this[index] || null;
            },
            namedItem: function(name) {
                if (name === 'application/pdf' || name === 'text/pdf') {
                    return this[0];
                }
                return null;
            },
            // 添加迭代器，使其支持 [...mimeTypes]
            [Symbol.iterator]: function*() {
                for (let i = 0; i < this.length; i++) {
                    yield this[i];
                }
            }
        };

        Object.defineProperty(navigator, 'mimeTypes', {
            get: () => standardMimeTypes,
            configurable: true // 【优化】改为 true 允许还原
        });
    }

    // 6. plugins：标准化为只包含 PDF 插件（带迭代器）
    if (navigator.plugins) {
        // 创建 PDF 插件的 MimeType 对象
        const pdfMimeTypes = {
            0: {
                type: 'application/pdf',
                suffixes: 'pdf',
                description: 'Portable Document Format',
                enabledPlugin: null
            },
            1: {
                type: 'text/pdf',
                suffixes: 'pdf',
                description: 'Portable Document Format',
                enabledPlugin: null
            },
            length: 2,
            item: function(index) {
                return this[index] || null;
            },
            namedItem: function(name) {
                if (name === 'application/pdf' || name === 'text/pdf') {
                    return this[0];
                }
                return null;
            },
            // 添加迭代器
            [Symbol.iterator]: function*() {
                for (let i = 0; i < this.length; i++) {
                    yield this[i];
                }
            }
        };

        // 创建 PDF 插件对象
        const pdfPlugin = {
            name: 'Chrome PDF Plugin',
            filename: 'internal-pdf-viewer',
            description: 'Portable Document Format',
            length: 2,
            0: pdfMimeTypes[0],
            1: pdfMimeTypes[1],
            item: function(index) {
                return this[index] || null;
            },
            namedItem: function(name) {
                // 支持通过 MIME 类型查询
                if (name === 'application/pdf' || name === 'text/pdf') {
                    return this[0];
                }
                return null;
            },
            // 添加迭代器
            [Symbol.iterator]: function*() {
                for (let i = 0; i < this.length; i++) {
                    yield this[i];
                }
            }
        };

        // 标准化的 PluginArray
        const standardPlugins = {
            0: pdfPlugin,
            length: 1,
            item: function(index) {
                return this[index] || null;
            },
            namedItem: function(name) {
                // 支持通过插件名查询
                if (name === 'Chrome PDF Plugin' || name === 'PDF Viewer') {
                    return this[0];
                }
                // 支持通过 MIME 类型查询（重要！）
                if (name === 'application/pdf' || name === 'text/pdf') {
                    return this[0];
                }
                return null;
            },
            refresh: function() {},
            // 添加迭代器（关键修复）
            [Symbol.iterator]: function*() {
                for (let i = 0; i < this.length; i++) {
                    yield this[i];
                }
            }
        };

        Object.defineProperty(navigator, 'plugins', {
            get: () => standardPlugins,
            configurable: true // 【优化】改为 true 允许还原
        });
    }

    // 7. connection：智能 Wi-Fi（修正网速值）
    if ('connection' in navigator) {
        // 【优化】静态化返回对象，避免每次调用 getter 都执行动态计算，提高微观性能
        const cachedConnection = {
            effectiveType: '4g',
            rtt: 30,
            downlink: 100,
            saveData: false,
            type: 'wifi',
            onchange: null,
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => true
        };
        const cachedFastConnection = {
            effectiveType: '4g',
            rtt: 10,
            downlink: 300,
            saveData: false,
            type: 'wifi',
            onchange: null,
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => true
        };

        Object.defineProperty(navigator, 'connection', {
            get: () => {
                const hour = new Date().getHours();
                const isSlowTime = (hour >= 10 && hour <= 15) || (hour >= 17 && hour <= 22);
                return isSlowTime ? cachedConnection : cachedFastConnection;
            },
            configurable: true // 【优化】改为 true 允许还原
        });
    }

    // 8. performance.memory 浏览器自动分配给网页的堆栈大小，1GB-4GB
    if (window.performance && performance.memory) {
        // 【工业级优化】静态化一个基准值，利用随机上下摆动模拟真实网页的内存动态变化，防止死板数据被指纹算法识别
        const limit16GB = 2 * 1024 * 1024 * 1024; // 2GB 的精准字节数 (4 * 1024 * 1024 * 1024)

        Object.defineProperty(performance, 'memory', {
            get: () => {
                // 生成一个在 80MB 到 120MB 之间动态波动的总分配内存
                const baseTotal = 100000000 + (Math.random() - 0.5) * 20000000;
                // 已用内存永远小于总分配内存，占比在 45% ~ 65% 之间随机波动
                const baseUsed = baseTotal * (0.45 + Math.random() * 0.2);

                return {
                    jsHeapSizeLimit: limit16GB,  // 完美伪造 16GB 限制额度
                    totalJSHeapSize: Math.floor(baseTotal),
                    usedJSHeapSize: Math.floor(baseUsed)
                };
            },
            configurable: true // 【优化】改为 true 允许还原
        });
    }

}

// 带缓存的阶梯形的随机canvas噪点反指纹
function block_canvas_pr() {
    // 【优化】Hook 正确的对象原型：CanvasRenderingContext2D
    if (!window.CanvasRenderingContext2D || !originals.getImageData) return;

    const resultCache = new WeakMap();  // 缓存修改结果

    CanvasRenderingContext2D.prototype.getImageData = function(...args) {
        // 【优化】在 Context2D 上，通过 this.canvas 拿到对应的 Canvas 节点作为缓存的 WeakMap 键值
        const canvasEl = this.canvas;

        // 检查缓存
        if (canvasEl && resultCache.has(canvasEl)) {
            const cached = resultCache.get(canvasEl);
            // 检查参数是否匹配
            if (cached.args && cached.args.every((v, i) => v === args[i])) {
                return cached.result;
            }
        }

        // 原始调用
        const imageData = originals.getImageData.apply(this, args);

        if (!imageData || !imageData.data) return imageData;

        // 添加噪点
        const data = imageData.data;
        const len = data.length;
        const pixelCount = len / 4;

        // 【性能优化防火墙】指纹追踪脚本通常只读取小尺寸 Canvas（如几十到几百像素）。
        // 如果网页生成的是超过 250,000 像素（相当于 > 500x500）的大画布（如网页游戏、复杂大图图表），则直接放行，完全避免大图卡顿。
        if (pixelCount > 250000) return imageData;

        let modifyRate, noiseStrength;
        if (pixelCount <= 4096) {
            modifyRate = 0.03;
            noiseStrength = 2;
        } else if (pixelCount <= 16384) {
            modifyRate = 0.01;
            noiseStrength = 1.5;
        } else {
            modifyRate = 0.002;
            noiseStrength = 1;
        }

        // 【性能优化】小图步长为4（全量检测），中等及大指纹图步长为8（跳跃遍历），大幅度压缩循环内的计算损耗
        const step = pixelCount > 4096 ? 8 : 4;

        for (let i = 0; i < len; i += step * 4) {
            if (Math.random() < modifyRate) {
                const offset = (Math.random() - 0.5) * noiseStrength * 2;
                data[i] = Math.min(255, Math.max(0, data[i] + offset));
                data[i+1] = Math.min(255, Math.max(0, data[i+1] + offset));
                data[i+2] = Math.min(255, Math.max(0, data[i+2] + offset));
            }
        }

        // 存入缓存
        if (canvasEl) {
            resultCache.set(canvasEl, {
                args: [...args],
                result: imageData
            });
        }

        return imageData;
    };

}

// 反CSS指纹（轻微）
function block_css_pr() {
    // 1. 覆盖媒体查询
    if (!originals.matchMedia) return;

    window.matchMedia = function(query) {
        // 【优化】首先初筛关键字，避免每次都执行复杂的字符串匹配
        if (query.includes('prefers-')) {
            if (query.includes('prefers-contrast')) {
                return originals.matchMedia('(prefers-contrast: no-preference)');
            }
            if (query.includes('prefers-reduced-motion')) {
                return originals.matchMedia('(prefers-reduced-motion: no-preference)');
            }
        }
        return originals.matchMedia.call(this, query);
    };

    // 2. 字体检测防御
    if (!originals.getBoundingClientRect) return;

    // 【性能优化】预编译正则表达式，扩大防御范围，捕获更多指纹库常用的特征字符
    const fontRegex = /font|test|fingerprint|detector|measure/i;

    // --- 核心优化 A：修复 getBoundingClientRect 格式错误问题 ---
    Element.prototype.getBoundingClientRect = function() {
        const rect = originals.getBoundingClientRect.call(this);

        // 【性能优化】高效的长宽初筛，直接放行 99.9% 正常的页面布局元素
        if (rect.width >= 500 || rect.height >= 100 || rect.width === 0) {
            return rect;
        }

        // 检测是否为字体或指纹测量元素
        const id = this.id;
        const className = this.className;
        const isFontTest = (id && fontRegex.test(id)) || (typeof className === 'string' && fontRegex.test(className));

        if (isFontTest) {
            // 【安全修复】绝对不能直接返回 {} 字面量，必须使用 DOMRect.fromRect 保证完美的类型兼容，防止网页因类型检查崩溃
            if (window.DOMRect && typeof DOMRect.fromRect === 'function') {
                return DOMRect.fromRect({
                    x: rect.x,
                    y: rect.y,
                    width: rect.width + (Math.random() - 0.5) * 0.3,
                    height: rect.height + (Math.random() - 0.5) * 0.3
                });
            }
        }
        return rect;
    };

    // --- 核心优化 B：拦截更隐蔽的 offsetWidth 和 offsetHeight 字体指纹探测 ---
    const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth')?.get;
    const originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight')?.get;

    if (originalOffsetWidth && originalOffsetHeight) {
        Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
            get: function() {
                const width = originalOffsetWidth.call(this);
                // 只有小面积且名字命中的目标，才施加微妙噪点
                if (width > 0 && width < 500) {
                    const id = this.id;
                    const className = this.className;
                    if ((id && fontRegex.test(id)) || (typeof className === 'string' && fontRegex.test(className))) {
                        return width + (Math.random() > 0.5 ? 1 : -1); // 像素级轻微扰动
                    }
                }
                return width;
            },
            configurable: true
        });

        Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
            get: function() {
                const height = originalOffsetHeight.call(this);
                if (height > 0 && height < 100) {
                    const id = this.id;
                    const className = this.className;
                    if ((id && fontRegex.test(id)) || (typeof className === 'string' && fontRegex.test(className))) {
                        return height + (Math.random() > 0.5 ? 1 : -1);
                    }
                }
                return height;
            },
            configurable: true
        });
    }

    // --- 核心优化 C：全面封死现代高级字体检测 API ---
    if (window.FontFaceSet && FontFaceSet.prototype.check) {
        // 备份原始方法用于后期的还原
        originals.fontCheck = FontFaceSet.prototype.check;

        FontFaceSet.prototype.check = function(font, text) {
            // 现代高级指纹算法会调用 document.fonts.check("12px 'SomeRareFont'") 来直接肉测系统字体
            // 策略：如果是通用普通字体，返回真实值；如果是罕见的指纹探测字体，一律返回 false，假装用户没有安装
            const isCommonFont = /sans-serif|serif|mono|arial|helvetica|times|courier|tahoma|verdana/i.test(font);
            if (!isCommonFont) {
                return false; // 隐藏系统罕见的独立字体指纹
            }
            return originals.fontCheck.call(this, font, text);
        };
    }
}

// init
(function (){
    // 监听来自 ISOLATED 世界（扩展桥梁）的消息
    // 注意：V3有时序等级，不要过度Hook防御所谓的插件实效问题。
    window.addEventListener("message", (event) => {
        // 安全检查：只接收来自当前窗口，且类型正确的内部消息
        if (event.source !== window || !event.data || event.data.type !== "FROM_EXTENSION_STORAGE") {
            return;
        }
        const mode = event.data.mode;
        console.log("init=", mode);
        //
        if (mode === 'on') {
            block_device_pr();
            block_canvas_pr();
            block_css_pr();
        }else{
            // 如果用户在 Popup 里关掉了，我们就把 Hook 还原
            restore_originals();
        }
    });
})();