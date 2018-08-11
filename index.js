(() => {
    let pressed = [];

    function injectHtmlAndExecuteScripts(parent, text) {
        regexScriptBody = /\<\s*script.*?\>(.*?)\<\/\s*script.*?\>/gsm;
        regexScriptSrc = /\<\s*?script[^>]*?src\s*?=\s*?['"](.*?)['"].*?\>.*?\<\/\s*?script\s*?\>/gsm;
        const matchesSrc = regexScriptSrc.exec(text);
        const matchesBody = regexScriptBody.exec(text);
        text = text.replace(regexScriptBody, "");
        text = text.replace(regexScriptSrc, "");
        parent.innerHTML = text;
        // we have to manually parse <script> tags from html because scripts won't run from innerHTML
        if (matchesSrc) {
            for (let i=1; i<matchesSrc.length; i++) {
                const match = matchesSrc[i];
                const script = document.createElement("script");
                script.src = match;
                document.body.appendChild(script);
            }
        }
        if (matchesBody) {
            for (let i=1; i<matchesBody.length; i++) {
                const match = matchesBody[i];
                const script = document.createElement("script");
                script.innerHTML = match;
                document.body.appendChild(script);
            }
        }
    }

    function injectFakeSuccessPage(event) {
        event.preventDefault();
        document.body.innerHTML = "";
        document.head.innerHTML = "";

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                injectHtmlAndExecuteScripts(document.body, this.responseText);
            }
        };
        xhttp.open("GET", chrome.runtime.getURL("success_body_only.html"), true);
        xhttp.send();
    
        var xhttp2 = new XMLHttpRequest();
        xhttp2.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                injectHtmlAndExecuteScripts(document.head, this.responseText);
            }
        };
        xhttp2.open("GET", chrome.runtime.getURL("success_head_only.html"), true);
        xhttp2.send();
        return false;
    }

    function injectClickListener(tagName) {
        for (let element of document.getElementsByTagName(tagName)) {
            element.onclick = injectFakeSuccessPage;
        }
    }

    function injectFormSubmitListener() {
        for (let element of document.getElementsByTagName("form")) {
            element.onsubmit = injectFakeSuccessPage;
        }
    }

    document.addEventListener("keydown", (evt => {
        pressed[evt.keyCode] = true;
        if (pressed[17] && pressed[77]) { // CTRL + M
            injectClickListener("a");
            injectClickListener("button");
            injectFormSubmitListener();
        }
    }));
    document.addEventListener("keyup", (evt => {
        pressed[evt.keyCode] = false;
    }));

    // injectFakeSuccessPage({preventDefault: () => {}});
})();