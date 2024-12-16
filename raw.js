
    try {
        var articles = document.querySelectorAll('article');
        var timestamp = new Date().toLocaleString();
        
        // HTML Template
        var htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Chat Export</title>
    <link rel="stylesheet" href="https://unpkg.com/mvp.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/default.min.css">
    <style>
        .w-fit {
            width: fit-content;
            max-width: 48rem;
            height: 100%;
        }
        .chat-container {
            width: 100%;
            max-width: 800px;
            margin: 20px auto;
            font-family: Arial, sans-serif;
        }
        h1 {
            text-align: center;
            margin-bottom: 10px;
        }
        .timestamp {
            text-align: center;
            margin-bottom: 20px;
            font-size: 14px;
            color: #555;
        }
        .chat-message {
            display: flex;
            margin: 10px 0;
        }
        .chat-message.right {
            justify-content: flex-end;
        }
        .chat-message.left {
            justify-content: flex-start;
        }
        .chat-bubble {
            padding: 10px;
            border-radius: 10px;
            position: relative;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .chat-bubble.right {
            background-color: #dcf8c6;
        }
        .chat-bubble.left {
            background-color: #ffffff;
        }
        .chat-bubble.right::after {
            content: "";
            position: absolute;
            right: -10px;
            top: 10px;
            border-width: 10px 0 10px 10px;
            border-style: solid;
            border-color: transparent transparent transparent #dcf8c6;
        }
        .chat-bubble.left::after {
            content: "";
            position: absolute;
            left: -10px;
            top: 10px;
            border-width: 10px 10px 10px 0;
            border-style: solid;
            border-color: transparent #ffffff transparent transparent;
        }
        button.flex.gap-1.items-center.select-none.py-1 {
            position: absolute;
            top: -5px;
            right: -5px;
            padding: 5px 10px;
            font-size: 12px;
            cursor: pointer;
            background-color: #f0f0f0;
            border: none;
            border-radius: 5px;
        }
        button.flex.gap-1.items-center.select-none.py-1:hover {
            background-color: #e0e0e0;
        }
        pre {
            position: relative;
            display: inline-block;
        }
        code {
            padding: 2px 4px;
            background-color: #f5f5f5;
            border-radius: 3px;
            display: inline;
        }
    </style>
</head>
<body>
    <h1><a href="${window.location.href}" target="_blank">${window.location.href}</a></h1>
    <div class="timestamp">Exported on: ${timestamp}</div>
    <div class="chat-container">
`;

        // Process articles and add messages
        articles.forEach(function (article, index) {
            var messageContent = article.querySelector('.whitespace-pre-wrap, .markdown');
            var imagesHtml = '';

            if (messageContent) {
                var images = article.querySelectorAll('img[width][height]');
                images.forEach(function (image) {
                    imagesHtml += image.outerHTML;
                });

                htmlContent += `
                <div class="chat-message ${index % 2 === 0 ? 'right' : 'left'}">
                    <div class="chat-bubble ${index % 2 === 0 ? 'right' : 'left'}">
                        ${imagesHtml}${messageContent.innerHTML}
                    </div>
                </div>
                `;
            }
        });

        // Close HTML content
        htmlContent += `
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js"></script>
    <script>
        hljs.highlightAll();
        document.querySelectorAll("button.flex.gap-1.items-center.select-none.py-1").forEach(btn => {
            btn.addEventListener("click", function () {
                var pre = btn.closest("pre");
                if (pre) {
                    var code = pre.querySelector("code");
                    if (code) {
                        var textarea = document.createElement("textarea");
                        textarea.value = code.innerText;
                        document.body.appendChild(textarea);
                        textarea.select();
                        try {
                            document.execCommand("copy");
                            alert("Code copied to clipboard.");
                        } catch (e) {
                            alert("Failed to copy code.");
                        }
                        document.body.removeChild(textarea);
                    }
                }
            });
        });
    </script>
</body>
</html>
`;

        // Copy to clipboard
        var textarea = document.createElement('textarea');
        textarea.value = htmlContent;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        var success = document.execCommand('copy');
        document.body.removeChild(textarea);

        // Notify the user
        if (success) {
            alert('Complete HTML file with syntax highlighting and timestamp copied to clipboard.');
        } else {
            alert('Failed to copy the content.');
        }
    } catch (error) {
        alert('Error: ' + error);
    }

