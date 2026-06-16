'use strict';
// 读取本地配置信息

(function (){
    func.get_data("block_fingerprint_mode").then(_mode => {
        const mode = _mode || 'off'; // 默认关闭
        const stringID = "id#"+func.js_rand(100000000, 9999999999);
        // 通过安全通道，把状态跨世界发送给 MAIN 脚本
        window.postMessage({
            type: "FROM_EXTENSION_STORAGE",
            mode: mode,
            stringID: stringID,
            userAgent: window.navigator.userAgent,
        }, "*");
    });

})();
