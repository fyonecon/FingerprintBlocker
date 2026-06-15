// 保存新标签网址
function save_href(){
    //
    const ele_input_href = document.getElementById("input-custom_new_tab_href");
    const ele_input_href_alert = document.getElementById("input-custom_new_tab_href-alert");
    const ele_btn_href = document.getElementById("input-custom_new_tab_btn");
    let timer_input_href_alert = 0;
    // 监听保存事件
    ele_btn_href.addEventListener("click", function(){
        let href = ele_input_href.value;
        //
        let alert_txt_old = func.get_language("custom_new_tab_alert");
        let alert_txt_yes = func.get_language("custom_new_tab_alert_yes");
        let alert_txt_no = func.get_language("custom_new_tab_alert_no");
        let alert_txt_default= func.get_language("custom_new_tab_alert_default");
        clearTimeout(timer_input_href_alert);
        //
        function remove_input_href_alert_font_color(){
            ele_input_href_alert.classList.remove("font-gray");
            ele_input_href_alert.classList.remove("font-blue");
            ele_input_href_alert.classList.remove("font-red");
        }
        //
        if (!func.is_url(href)){ // 错误
            if (!href){
                ele_input_href_alert.innerText = alert_txt_old;
                remove_input_href_alert_font_color();
                ele_input_href_alert.classList.add("font-gray");
                // del
                func.del_data("custom_new_tab_href").then(state => {
                    show_href();
                });
                // alert
                ele_input_href_alert.innerText = alert_txt_default;
                timer_input_href_alert = setInterval(function(){
                    ele_input_href_alert.innerText = alert_txt_old;
                    remove_input_href_alert_font_color();
                    ele_input_href_alert.classList.add("font-gray");
                    //
                    ele_input_href.focus();
                }, 5000);
            }else{
                remove_input_href_alert_font_color();
                ele_input_href_alert.classList.add("font-red");
                // alert
                ele_input_href_alert.innerText = alert_txt_no;
                timer_input_href_alert = setInterval(function(){
                    ele_input_href_alert.innerText = alert_txt_old;
                    remove_input_href_alert_font_color();
                    ele_input_href_alert.classList.add("font-gray");
                    //
                    ele_input_href.value = "";
                    ele_input_href.focus();
                }, 5000);
            }
        }else{ // 正确
            remove_input_href_alert_font_color();
            ele_input_href_alert.classList.add("font-blue");
            // Save
            func.set_data("custom_new_tab_href", func.string_to_unicode(href)).then(value => {
                show_href();
            });
            // alert
            ele_input_href_alert.innerText = alert_txt_yes;
            timer_input_href_alert = setInterval(function(){
                ele_input_href_alert.innerText = alert_txt_old;
                remove_input_href_alert_font_color();
                ele_input_href_alert.classList.add("font-gray");
                //
            }, 5000);
        }
    });
}

// 展示已经设置的href
function show_href() {
    func.get_data("custom_new_tab_href").then(href => {
        if (href){href = func.unicode_to_string(href);}
        const ele_input_href = document.getElementById("input-custom_new_tab_href");
        ele_input_href.value = href;
    });
}