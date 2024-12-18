  (function () {
    try {
            alert('da');
        var articles = document.querySelectorAll('article');
        var timestamp = new Date().toLocaleString();
        // HTML Template
         
     

      

        // Copy to clipboard
        var textarea = document.createElement('textarea');
        textarea.value = 'sdsd';
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
})();
