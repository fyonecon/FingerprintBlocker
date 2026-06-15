// 页面起始函数
function page_start(e){
    // console.log("page_start=", func.get_language("text"), func.get_theme());
    // 页面翻译
    func.set_language_title("example");
    func.set_language_span();
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