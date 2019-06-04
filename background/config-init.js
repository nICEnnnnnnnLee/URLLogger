/*
Default settings. Initialize storage to these values.
 */
var configs = ["https://cache.video.iqiyi.com/jp/dash?*", 
    "*://*/*.flv", 
    "*://*/*.flv?*", 
    "*://*/*.mp4", 
    "*://*/*.mp4?*", 
    "*://*/*.m3u8", 
    "*://*/*.m3u8?*", 
    ];
var on = true;
var isCopy = true;
/*
 * Generic error logger.
 */
function onError(e) {
	console.error(e);
}

/*
 * On startup, check whether we have stored settings. If we don't, then store
 * the default settings.
 */
function checkStoredSettings(storedSettings) {
    
	var temp = storedSettings.configs;
    var temp2 = storedSettings.on;
    var temp3 = storedSettings.isCopy;
	browser.storage.local.set({
		configs : configs,
        on : true,
        isCopy : true
	});
	if(temp){
		browser.storage.local.set({
			configs : temp,
            on : temp2,
            isCopy : temp3
		});
        if(!temp2){
            browser.browserAction.setIcon({path: "icons/off.png"});
            browser.browserAction.setTitle({title: "当前功能：关。点击开启功能"});
        }else{
            browser.browserAction.setTitle({title: "当前功能：开。点击关闭功能"});
            browser.browserAction.setIcon({path: "icons/on.png"});
        }
	}else{
        //alert("---初始化---");
        browser.browserAction.setTitle({title: "当前功能：开。点击关闭功能"});
        browser.browserAction.setIcon({path: "icons/on.png"});
        onClickBtnUpdate();
    }
}

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(checkStoredSettings, onError);
