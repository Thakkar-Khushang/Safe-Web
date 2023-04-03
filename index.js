// map of the charaters to their ciphered counterparts
var map = {}
var ciphered = "";

var cipher = pool = "abcdefghijklmnopqrstuvwxyz";
for(var i = 0; i < 26; i++){
    // shift by shift amount
    var shift = Math.floor(Math.random() * 1000) + 1;
    var shifted = (i + shift) % pool.length;
    // append to cipher
    ciphered += pool[shifted];
    map[cipher[i]] = pool[shifted];
    appendToTable(cipher[i], pool[shifted], 0);

    // remove the character from the original pool
    var newPool = pool.substring(0, shifted) + pool.substring(shifted+1, pool.length);
    pool =  newPool;
}

// generate cipher
var cipher = pool = "0123456789";
for(var i = 0; i < 10; i++){
    console.log(pool)
    // shift by shift amount
    var shift = Math.floor(Math.random() * 1000) + 1;
    var shifted = (i + shift) % pool.length;
    // append to cipher
    ciphered += pool[shifted];
    map[cipher[i]] = pool[shifted];
    appendToTable(cipher[i], pool[shifted], 1);

    // remove the character from the original pool
    var newPool = pool.substring(0, shifted) + pool.substring(shifted+1, pool.length);
    pool =  newPool;
}

// generate cipher
var cipher = pool = "!@#$%^&*()_+{}|:<>?[];',./`~"
for(var i = 0; i < 28; i++){
    // shift by shift amount
    var shift = Math.floor(Math.random() * 1000) + 1;
    var shifted = (i + shift) % pool.length;
    // append to cipher
    ciphered += pool[shifted];
    map[cipher[i]] = pool[shifted];
    appendToTable(cipher[i], pool[shifted], 2);

    // remove the character from the original pool
    var newPool = pool.substring(0, shifted) + pool.substring(shifted+1, pool.length);
    pool =  newPool;
}

// Append the ciphered character to the table in html
function appendToTable(char, cipher, type){
    var table = document.getElementById(type==0 ? "alphabetTable": type==1 ? "numberTable" : "specialTable");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = char;
    cell2.innerHTML = cipher;
}

// Cipher including special characters and numbers
var isNumbersShown = true;
var isUpperCaseOn = false;

function special(){
    // hide display
    if(isNumbersShown){
        isNumbersShown = false;
        document.querySelector(".First").style.display = "none";
        document.querySelector(".Second").style.display = "block";
    } else{
        isNumbersShown = true;
        document.querySelector(".First").style.display = "block";
        document.querySelector(".Second").style.display = "none";
    }

    var alphabets = document.querySelectorAll(".alphabet")

    if(isUpperCaseOn){
        isUpperCaseOn = false;
        for(var i = 0; i < alphabets.length; i++){
            alphabets[i].style.textTransform = "lowercase";
        }
    } else{
        isUpperCaseOn = true;
        for(var i = 0; i < alphabets.length; i++){
            alphabets[i].style.textTransform = "uppercase";
        }
    }
}

function backspace(){
    var input = document.getElementById("input").value;
    // delete last character
    if(input.length == 0){
        return;
    }
    var newInput = input.slice(0, -1);
    document.getElementById("input").value = newInput;
}

function append(char){
    var newChar = map[char];
    if(isUpperCaseOn){
        newChar = newChar.toUpperCase();
    }
    document.getElementById("input").value += newChar;
}

function onpressed(){
    // get the last character inputted
    var input = document.getElementById("input").value;
    var lastChar = input.slice(-1);
    var newChar = map[lastChar];
    // new input
    if(isUpperCaseOn){
        newChar = newChar.toUpperCase();
    }
    var newInput = input.slice(0, -1) + newChar;
    document.getElementById("input").value = newInput;
}