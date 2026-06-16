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
    block_fingerprint_on: {
        zh: "拦截",
        en: "Block",
        jp: "ブロック",
        de: "Blockieren",
        vi: "Chặn",
    },
    help_msg_browser_set_block_fingerprint: {
        zh: "💡 拦截效果和拦截标准基本对齐Safari，对有正常浏览器特性需求的参数不做拦截，有效兼顾正常参数需求与拦截浏览器指纹。",
        en: "💡 The blocking efficacy and criteria are largely aligned with Safari. Parameters that are required for normal browser functionality are not blocked, effectively balancing the need for legitimate parameter usage with browser fingerprinting protection.",
        jp: "💡 ブロック効果およびブロック基準は、Safariとほぼ同等に合わせています。通常のブラウザ機能に必要なパラメータはブロック対象外とすることで、正当なパラメータ要件とブラウザフィンガープリンティング対策の両立を実現します。",
        de: "💡 Die Blockierwirkung und -kriterien sind weitgehend an Safari angelehnt. Parameter, die für normale Browserfunktionen erforderlich sind, werden nicht blockiert. Dies gewährleistet eine effektive Abwägung zwischen legitimen Parameteranforderungen und dem Schutz vor Browser-Fingerprinting.",
        vi: "💡 Hiệu quả và tiêu chuẩn chặn về cơ bản được căn chỉnh theo Safari. Các tham số cần thiết cho chức năng trình duyệt thông thường sẽ không bị chặn, qua đó cân bằng hiệu quả giữa nhu cầu tham số hợp lệ và việc chống lại dấu vân tay trình duyệt (browser fingerprinting).",
    },

};