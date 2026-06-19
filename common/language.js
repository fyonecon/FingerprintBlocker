// 翻译对照表
const language_dict = {
    test: {
        zh: "测试", // 中文（包含繁体）
        en: "Test", // 英文（或默认英语）
        jp: "テスト", // 日文
        de: "Test", // 德语
        vi: "kiểm tra", // 越语
    },
    _null: {
        zh: "-空-",
        en: "-Null-",
        jp: "-空-",
        de: "-Leer-",
        vi: "-Trống rỗng-",
    },
    example: {
        zh: "举例页面",
        en: "Example Page",
        jp: "サンプルページ",
        de: "Beispielseite",
        vi: "Ví dụ trang",
    },
    popup: {
        zh: "FingerprintBlocker：设置",
        en: "FingerprintBlocker: Settings",
        jp: "FingerprintBlocker：設定",
        de: "FingerprintBlocker: Einstellung",
        vi: "FingerprintBlocker: thiết lập",
    },
    app_name: {
        zh: "FingerprintBlocker",
        en: "FingerprintBlocker",
        jp: "FingerprintBlocker",
        de: "FingerprintBlocker",
        vi: "FingerprintBlocker",
    },
    //
    block_fingerprint: {
        zh: "拦截浏览器指纹",
        en: "Block browser fingerprint",
        jp: "ブラウザの指紋をブロックする",
        de: "Browser-Fingerabdrücke blockieren",
        vi: "Chặn dấu vân tay trình duyệt",
    },
    radio_alert_yes: {
        zh: "✅ 已保存",
        en: "✅ Saved",
        jp: "✅ 保存済み",
        de: "✅ Speichert",
        vi: "✅ Đã lưu",
    },
    block_fingerprint_off: {
        zh: "不拦截",
        en: "Don't block",
        jp: "ブロックしない",
        de: "Nicht blockieren",
        vi: "Không chặn",
    },
    block_fingerprint_base: {
        zh: "拦截一些",
        en: "Block some",
        jp: "いくつか遮断する（しゃだんする）",
        de: "Einige blockieren",
        vi: "Ngăn chặn một số",
    },
    block_fingerprint_on: {
        zh: "拦截",
        en: "Block",
        jp: "ブロック",
        de: "Blockieren",
        vi: "Chặn",
    },
    help_msg_browser_set_block_fingerprint: {
        zh: "💡 拦截效果基本对齐Safari，对能生成浏览器指纹的参数进行屏蔽或弱化。对有正常浏览器特性需求的参数不做拦截。",
        en: "💡 The interception effectiveness is essentially aligned with Safari. Parameters that can be used for browser fingerprinting are either blocked or weakened, while parameters required for normal browser functionality are not intercepted.",
        jp: "💡 インターセプト効果は基本的にSafariと同等であり、ブラウザフィンガープリンティングに利用可能なパラメータについてはブロックまたは弱体化を実施する。一方、通常のブラウザ特性に必要なパラメータについてはインターセプトを行わない。",
        de: "💡 Die Unterdrückungswirkung ist im Wesentlichen mit Safari vergleichbar. Parameter, die zur Erstellung von Browser-Fingerabdrücken genutzt werden können, werden blockiert oder abgeschwächt. Parameter, die für normale Browserfunktionalitäten erforderlich sind, werden nicht unterdrückt.",
        vi: "💡 Hiệu quả chặn về cơ bản được căn chỉnh tương đương với Safari. Các tham số có thể được sử dụng để tạo dấu vân tay trình duyệt (browser fingerprinting) sẽ bị chặn hoặc làm suy yếu. Các tham số cần thiết cho các đặc tính trình duyệt thông thường sẽ không bị chặn.",
    },

};