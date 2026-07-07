// 页面起始函数
function page_start(e){
    // console.log("page_start=", func.get_language("text"), func.get_theme());
    // 页面翻译
    func.set_language_title("help");
    func.set_language_span();
    //
    const table_td_version = document.getElementById("table-td-version");
    const table_td_platform = document.getElementById("table-td-platform");
    const table_td_es2024 = document.getElementById("table-td-es2024");

    //
    table_td_version.innerText = config.app_name + " - " + config.app_version;
    table_td_platform.innerText = func.get_runtime_info().sys_platform + " - " + func.get_runtime_info().browser_name;
    table_td_es2024.innerText = func.support_min_js()?"✅":"❌";
}

// 页面加载完成后或页面可见时
(function (){
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", page_start);
    } else {
        page_start(2);
    }
    //
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) { // onHide
            //
        } else { // onShow
            page_start(3);
        }
    });
})();