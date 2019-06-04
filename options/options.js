const txtPattern = document.getElementById('txtPattern');
const btnUpdate = document.getElementById('update');
const btnReset = document.getElementById('reset');
const btnCopyToggle = document.getElementById('copyToggle');

const txtIsFunction = document.getElementById('isFunction');
const txtIsCopyAlert = document.getElementById('isCopyAlert');
/*
 * Store the currently selected settings and send a signal
 */
function storeSettings() {
    var patterns = txtPattern.value.split(/\r?\n/);
    //console.log(patterns);
    browser.storage.local.set({
        configs: patterns
    });
    
    browser.runtime.sendMessage({
        "action": "btnUpdateClick",
    });
}

/*
 * Update the options UI with the settings values retrieved from storage, or the
 * default settings if the stored settings are empty.
 */
function updateUIByLocal() {
    browser.storage.local.get().then(restoredSettings =>{
        var patterns = restoredSettings.configs;
        console.log("--------- updateUIByLocal ---------");
        console.log(patterns);
        if(restoredSettings.on){
            txtIsFunction.innerHTML = "开";
        }else{
            txtIsFunction.innerHTML = "关";
        }
        if(patterns != undefined && patterns.length != 0){
            var html = "";
            var j;
            for(j = 0,len=patterns.length - 1; j < len; j++) {
                html += patterns[j] + "\n";    
            }
            if(patterns[j]){
                html += patterns[j];
            }
            txtPattern.value = html;
        }
    });
}

// toggleCopy
function toggleCopy() {
    // 切换开关
    browser.storage.local.get().then(restoredSettings =>{
        var toggle = restoredSettings.isCopy;
        if(toggle){
            toggle = false;
            txtIsCopyAlert.innerHTML = "关";
            console.log("功能已经关闭！");
        }else{
            toggle = true;
            txtIsCopyAlert.innerHTML = "开";
            console.log("功能已经开启！");
        }
        browser.storage.local.set({
            isCopy: toggle
        });
    });
}

function onError(e) {
    console.error(e);
}

/*
 * On opening the options page, fetch stored settings and update the UI with
 * them.
 */
updateUIByLocal();


btnUpdate.addEventListener("click", storeSettings);
btnReset.addEventListener("click", updateUIByLocal);
btnCopyToggle.addEventListener("click", toggleCopy);

