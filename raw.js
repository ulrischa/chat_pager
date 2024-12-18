(function () {
    try {
        var articles = document.querySelectorAll('article');
        var timestamp = new Date().toLocaleString();
        var currentHref = window.location.href;
        
        var htmlContent = ""
          + "<!DOCTYPE html>\n"
          + "<html>\n"
          + "<head>\n"
          + "    <meta charset=\"UTF-8\">\n"
          + "    <title>Chat Export</title>\n"
          + "    <link rel=\"stylesheet\" href=\"https://unpkg.com/mvp.css\">\n"
          + "    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/default.min.css\">\n"
          + "    <style>\n"
          + "        .w-fit {\n"
          + "            width: fit-content;\n"
          + "            max-width: 48rem;\n"
          + "            height: 100%;\n"
          + "        }\n"
          + "        .chat-container {\n"
          + "            width: 100%;\n"
          + "            max-width: 800px;\n"
          + "            margin: 20px auto;\n"
          + "            font-family: Arial, sans-serif;\n"
          + "        }\n"
          + "        h1 {\n"
          + "            text-align: center;\n"
          + "            margin-bottom: 10px;\n"
          + "        }\n"
          + "        .timestamp {\n"
          + "            text-align: center;\n"
          + "            margin-bottom: 20px;\n"
          + "            font-size: 14px;\n"
          + "            color: #555;\n"
          + "        }\n"
          + "        .chat-message {\n"
          + "            display: flex;\n"
          + "            margin: 10px 0;\n"
          + "        }\n"
          + "        .chat-message.right {\n"
          + "            justify-content: flex-end;\n"
          + "        }\n"
          + "        .chat-message.left {\n"
          + "            justify-content: flex-start;\n"
          + "        }\n"
          + "        .chat-bubble {\n"
          + "            padding: 10px;\n"
          + "            border-radius: 10px;\n"
          + "            position: relative;\n"
          + "            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n"
          + "            overflow: hidden;\n"
          + "        }\n"
          + "        .chat-bubble.right {\n"
          + "            background-color: #dcf8c6;\n"
          + "        }\n"
          + "        .chat-bubble.left {\n"
          + "            background-color: #ffffff;\n"
          + "        }\n"
          + "        .chat-bubble.right::after {\n"
          + "            content: \"\";\n"
          + "            position: absolute;\n"
          + "            right: -10px;\n"
          + "            top: 10px;\n"
          + "            border-width: 10px 0 10px 10px;\n"
          + "            border-style: solid;\n"
          + "            border-color: transparent transparent transparent #dcf8c6;\n"
          + "        }\n"
          + "        .chat-bubble.left::after {\n"
          + "            content: \"\";\n"
          + "            position: absolute;\n"
          + "            left: -10px;\n"
          + "            top: 10px;\n"
          + "            border-width: 10px 10px 10px 0;\n"
          + "            border-style: solid;\n"
          + "            border-color: transparent #ffffff transparent transparent;\n"
          + "        }\n"
          + "        button.select-none {\n"
          + "            position: absolute;\n"
          + "            top: -5px;\n"
          + "            right: -5px;\n"
          + "            padding: 5px 10px;\n"
          + "            font-size: 12px;\n"
          + "            cursor: pointer;\n"
          + "            border: none;\n"
          + "            border-radius: 5px;\n"
          + "        }\n"
          + "        pre {\n"
          + "            position: relative;\n"
          + "            display: inline-block;\n"
          + "        }\n"
          + "        code {\n"
          + "            padding: 2px 4px;\n"
          + "            background-color: #f5f5f5;\n"
          + "            border-radius: 3px;\n"
          + "            display: inline;\n"
          + "        }\n"
          + "    </style>\n"
          + "</head>\n"
          + "<body>\n"
          + "    <h1><a href=\"" + currentHref + "\" target=\"_blank\">" + currentHref + "</a></h1>\n"
          + "    <div class=\"timestamp\">Exported on: " + timestamp + "</div>\n"
          + "    <div class=\"chat-container\">\n";

        // Nachrichten verarbeiten
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            var messageContent = article.querySelector('.whitespace-pre-wrap, .markdown');
            var imagesHtml = "";
            if (messageContent) {
                var images = article.querySelectorAll('img[width][height]');
                for (var j = 0; j < images.length; j++) {
                    imagesHtml += images[j].outerHTML;
                }
                htmlContent += ""
                  + "                <div class=\"chat-message " + (i % 2 === 0 ? 'right' : 'left') + "\">\n"
                  + "                    <div class=\"chat-bubble " + (i % 2 === 0 ? 'right' : 'left') + "\">\n"
                  + "                        " + imagesHtml + messageContent.innerHTML + "\n"
                  + "                    </div>\n"
                  + "                </div>\n";
            }
        }

        htmlContent += ""
          + "    </div>\n"
          + "    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js\"></script>\n"
          + "    <script>\n"
          + "        hljs.highlightAll();\n"
          + "        document.querySelectorAll(\"button.flex.gap-1.items-center.select-none.py-1\").forEach(function(btn){\n"
          + "            btn.addEventListener(\"click\", function(){\n"
          + "                var pre = btn.closest(\"pre\");\n"
          + "                if (pre) {\n"
          + "                    var code = pre.querySelector(\"code\");\n"
          + "                    if (code) {\n"
          + "                        var textarea = document.createElement(\"textarea\");\n"
          + "                        textarea.value = code.innerText;\n"
          + "                        document.body.appendChild(textarea);\n"
          + "                        textarea.select();\n"
          + "                        try {\n"
          + "                            document.execCommand(\"copy\");\n"
          + "                            alert(\"Code copied to clipboard.\");\n"
          + "                        } catch (e) {\n"
          + "                            alert(\"Failed to copy code.\");\n"
          + "                        }\n"
          + "                        document.body.removeChild(textarea);\n"
          + "                    }\n"
          + "                }\n"
          + "            });\n"
          + "        });\n"
          + "    </script>\n"
          + "</body>\n"
          + "</html>\n";

        var textarea = document.createElement('textarea');
        textarea.value = htmlContent;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        var success = false;
        try {
            success = document.execCommand('copy');
        } catch (e) {
            // Fehler beim Kopieren
        }
        document.body.removeChild(textarea);

        if (success) {
            alert('Complete HTML file with syntax highlighting and timestamp copied to clipboard.');
        } else {
            alert('Failed to copy the content.');
        }
    } catch (error) {
        alert('Error: ' + error);
    }
})();
