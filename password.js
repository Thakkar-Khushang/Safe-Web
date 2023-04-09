function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}
var st=""
function logclick(i){
    st+=i
    console.log(st)
}

function encode(inp){
var out=''
while(inp!=''){
    let len=inp.length
    if (len % 2 == 1)
        mid = parseInt(len / 2);
    else
        mid = parseInt(len / 2) - 1;
    out+=inp[mid]
    inp=removechar(inp,mid)
}
return out

}

function removechar(str, char_pos) 
{
    part1 = str.substring(0, char_pos);
    part2 = str.substring(char_pos + 1, str.length);
    return (part1 + part2);
}



function decodeStr(str, len)
{
    var c = Array(len).fill("");
    var mid, pos = 1, k;
    if (len % 2 == 1)
        mid = parseInt(len / 2);
    else
        mid = parseInt(len / 2) - 1;
    c[mid] = str[0];
    if (len % 2 == 0)
        c[mid + 1] = str[1];
    if (len & 1)
        k = 1;
    else
        k = 2;

    for (var i = k; i < len; i += 2) {
        c[mid - pos] = str[i];

        if (len % 2 == 1)
            c[mid + pos] = str[i + 1];
        else
            c[mid + pos + 1] = str[i + 1];
        pos++;
    }
    var out=''
    for (var i = 0; i < len; i++)
    {
        out+=c[i]
    }
    return out
}



function show() {
    var arr = ["./assets/animal1.png","./assets/animal2.png","./assets/animal3.png","./assets/animal4.png","./assets/animal5.png","./assets/animal6.png","./assets/animal7.png","./assets/animal8.png","./assets/animal9.png"]
    var index=[0,1,2,3,4,5,6,7,8]
    var arr1 = shuffleArray(index)
    
    for(var i = arr1.length-1; i >= 0; i--)
    {
        var img=document.createElement("img")
        img.setAttribute("src",arr[index[i]])
        img.setAttribute("onclick","logclick('"+index[i]+"')")
        document.getElementById('images').appendChild(img)
    }

    var button1 = document.getElementById('submit')
    button1.style.display = "block"

    var button2 = document.getElementById('show-images')
    button2.style.display = "none"
}

function save(){
    if(st.length!=4){
        alert("Please select 4 images")
        return
    }
    var out=encode(st)
    var input = document.getElementById('input')
    var isValid = checkUsername(input.value)
    if (isValid) {
        console.log(out)
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:3000/hash', true);
        const data = {
            user: input.value,
            pass: out
        }
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log('success');
                var button = document.getElementById('image')
                button.style.display = "block"
                fetchImage()
            } else {
                alert('Error logging you in');
                console.log('error');
            }
        };
        var button = document.getElementById('image')
        button.style.display = "block"
        fetchImage()
    } else{
        console.log("Invalid username")
    }
}