
// For url log
function logURL(requestDetails) {
    //console.log("Loading: " + requestDetails.url);
    browser.tabs.query({
        active: true,
        currentWindow: true
    }).then(tabs => {
        browser.storage.local.get().then(restoredSettings =>{
            browser.tabs.sendMessage(tabs[0].id, {
                command: "log",
                param: requestDetails.url,
                isCopy: restoredSettings.isCopy
            });
        });      
    });
    
}

// config页面配置刷新
function onClickBtnUpdate() {
    console.log("---- onClickBtnUpdate ----");
    // 点击按钮， 刷新过滤 Pattern   
    // 先remove 原有Listener
    browser.webRequest.onBeforeRequest.removeListener(logURL);
    
    browser.storage.local.get().then(restoredSettings =>{
        // 获取开关
        var toggle = restoredSettings.on;
        if(toggle){
            // 从Config获取 Pattern 列表
            console.log(restoredSettings.configs);
            browser.webRequest.onBeforeRequest.addListener(
                logURL,
                {urls: restoredSettings.configs}
            );

        }
        
    });
}

// ToolBar按钮点击
function onClickBtnToolBar() {
    // 切换开关
    browser.storage.local.get().then(restoredSettings =>{
        var toggle = restoredSettings.on;
        if(toggle){
            toggle = false;
            browser.browserAction.setTitle({title: "当前功能：关。点击开启功能"});
            browser.browserAction.setIcon({path: "icons/off.png"});
            console.log("功能已经关闭！");
        }else{
            toggle = true;
            browser.browserAction.setTitle({title: "当前功能：开。点击关闭功能"});
            browser.browserAction.setIcon({path: "icons/on.png"});
            console.log("功能已经开启！");
        }
        browser.storage.local.set({
            on: toggle
        });
        onClickBtnUpdate();
    });
}

function onError(e) {
	console.log("oooooooooooops there is a error!");
    console.error(e);
}

function notify(msg) {
    console.log(msg.action);
    if(msg.action == "btnUpdateClick"){
        onClickBtnUpdate();
    }
}

browser.runtime.onMessage.addListener(notify);
browser.browserAction.onClicked.addListener(onClickBtnToolBar);
onClickBtnUpdate();
