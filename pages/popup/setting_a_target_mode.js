// 设置 target mode 选中

let currentRadioMode = '_default'; // 取值范围：'_default' '_blank' '_self'
let custom_a_target_alert_timer = 0;

// ele
const modeDefault = document.getElementById('modeDefault');
const modeSelf = document.getElementById('modeSelf');
const modeBlank = document.getElementById('modeBlank');
const custom_a_target_alert = document.getElementById('radio-custom_a_target-alert');
const radioAlert = document.getElementById('radioAlert');

// 渲染选中UI
function show_a_target_radio() {
    func.get_data("custom_a_target_mode").then(mode => {
        currentRadioMode = mode;
        // 更新UI选中样式
        if (mode === '_self') {
            modeSelf.checked = true;
        } else if (mode === '_blank') {
            modeBlank.checked = true;
        } else { // _default or ""
            modeDefault.checked = true;
        }
    });
}

// 保存模式数据
function set_a_target_radio_mode(mode) {
    currentRadioMode = mode;
    //
    clearTimeout(custom_a_target_alert_timer);
    func.set_data('custom_a_target_mode', mode).then(mode => {
        // alert
        custom_a_target_alert.innerText = func.get_language("custom_a_target_alert");
        radioAlert.classList.remove("hide");
        custom_a_target_alert_timer = setInterval(() => {
            custom_a_target_alert.innerText = "";
            radioAlert.classList.add("hide");
        }, 5000);
        //
        show_a_target_radio();
    });
}

// 监听Radio单选
modeDefault.addEventListener('change', async () => {
    if (modeDefault.checked) {
        set_a_target_radio_mode('_default');
    }
});
modeSelf.addEventListener('change', async () => {
    if (modeSelf.checked) {
        set_a_target_radio_mode('_self');
    }
});
modeBlank.addEventListener('change', async () => {
    if (modeBlank.checked) {
        set_a_target_radio_mode('_blank');
    }
});