function htmlEncode(str) {
    return String(str).replace(/[^\w. ]/gi, function (c) {
        return '&#' + c.charCodeAt(0) + ';';
    });
}

function jsEscape(str) {
    return String(str).replace(/[^\w. ]/gi, function (c) {
        return '\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4);
    });
}

function isUserNameValid(username) {
    /*
    Usernames can only have:
    - Lowercase Letters (a-z)
    - Numbers (0-9) 
    - Dots (.)
    - Underscores (_)
    */
    const res = /^[a-z0-9_\.]+$/.exec(username);
    const valid = !!res;
    return valid;
}

function checkUsername(username) {
    if (username.length < 3) {
        alert('Username must be at least 3 characters long');
        return false;
    }
    if (username.length > 20) {
        alert('Username must be less than 20 characters long');
        return false;
    }
    if (!isUserNameValid(username)) {
        alert('Username can only have: \n- Lowercase Letters (a-z) \n- Numbers (0-9) \n- Dots (.) \n- Underscores (_)');
        return false;
    }
    return true;
}