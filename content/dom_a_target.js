// dom_content.js - 注入到每个网页内容的脚本
// 负责实际修改a标签链接的target属性，只对a标签有用，js跳转无用

let currentRadioMode = '_default'; // 取值范围：'_default' '_blank' '_self'
let observer = null; // 观察动态网页

// 更新静态网页中链接的target属性
function updateStaticLinks(mode) {
    const allLinks = document.querySelectorAll('a');
    let updatedACount = 0;

    //
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        // 跳过特殊链接
        if (href && (href.startsWith('javascript:') || href.startsWith('JAVASCRIPT:') || href.startsWith('#') || href === '#' || href === '')) {
            func.console_log("已跳过情况-1");
        }else{
            // 设置target
            if (mode === '_self' || mode === '_blank') {
                link.target = mode;
                updatedACount++;
            }else{ // 默认链接的target，不做任何动作：_default
                func.console_log("已跳过情况-2");
            }
        }
    });

    func.console_log(`[LinkTarget] 已更新 ${updatedACount} 个链接，目标模式: ${mode}`);
    return updatedACount;
}

// 监听动态链接，安装MutationObserver
function observerAliveLinks() {
    //
    if (observer) {observer.disconnect();}

    //
    observer = new MutationObserver((mutations) => {
        const addedLinks = [];

        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // 直接添加的链接
                    if (node.tagName === 'A') {
                        addedLinks.push(node);
                    }
                    // 添加的容器内的所有链接
                    if (node.querySelectorAll) {
                        const nestedLinks = node.querySelectorAll('a');
                        addedLinks.push(...nestedLinks);
                    }
                }
            });
        });

        if (addedLinks.length > 0 && currentRadioMode) {
            addedLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('javascript:') && href !== '#' && !href.startsWith('JAVASCRIPT:') && !href.startsWith('#')) {
                    if (currentRadioMode === '_self' || currentRadioMode === '_blank') {
                        link.target = currentRadioMode;
                    }else{ // 默认链接的target，不做任何动作：_default
                        func.console_log("已跳过情况-3");
                    }
                }
            });
            func.console_log(`[LinkTarget] 处理了 ${addedLinks.length} 个动态添加的链接`);
        }
    });

    // 开始观察
    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    } else {
        // 如果body还没加载，等待DOMContentLoaded
        document.addEventListener('DOMContentLoaded', () => {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }
}

// 应用模式
function applyMode(mode) {
    if (mode === '_self' || mode === '_blank' || mode === '_default') {
        func.console_log("获取的mode=", mode);
        // 更新静态网页链接
        updateStaticLinks(mode);
        // 监听动态网页链接，确保observer已安装
        if (!observer) {observerAliveLinks();}
        return true;
    }else{
        console.error('[LinkTarget] 无效的模式:', mode);
        return false;
    }
}

// 页面加载完成后初始化
function init_dom_a_target(e) {
    func.get_data('custom_a_target_mode').then(mode => {
        const savedMode = mode || '_default';
        currentRadioMode = savedMode;
        applyMode(savedMode);
    });
}

// 如果页面已经加载完成，立即初始化
(function (){
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init_dom_a_target);
    } else {
        init_dom_a_target(2);
    }
})();