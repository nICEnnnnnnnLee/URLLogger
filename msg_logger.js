(function() {
    /**
	 * Check and set a global guard variable. If this content script is injected
	 * into the same page again, it will do nothing next time.
	 */
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    function copyToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = '0';
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            var successful = document.execCommand("Copy");
        } catch(err) {
            // alert("Fail to Copy");
        }
        document.body.removeChild(textArea);
    }

    /**
	 * Listen for messages from the background script.
	 */
    browser.runtime.onMessage.addListener((message) =>{
        if(message.command === "log"){
            console.log(message.param);
            if(message.isCopy){
                alert(message.param);
                copyToClipboard(message.param);
            }
            
        };
    });

})();