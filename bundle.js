
let contractAbi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_data",
          "type": "string"
        }
      ],
      "name": "storeImage",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "getImage",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
];
let contractAddress = "0x83d826E8dC9721F4441AE2F40127B36495fA4BDA";

let web3 = new Web3("http://127.0.0.1:7545/");
let imageStorage = new web3.eth.Contract(contractAbi, contractAddress);

function storeImage(e){
    e.preventDefault();
    var unameInput = document.getElementById("input");
    var uname = unameInput.value;
    // convert file received into base64
    var file = document.getElementById("image").files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(){
        var base64 = reader.result;
        console.log(base64)
        // store image
        imageStorage.methods.storeImage(uname, base64).send({from: "0x0D651C36073d813820Add4E426f1BcEb554a449C", gas: 3000000}).then(function(receipt){
            console.log(receipt);
        });
    }
    
}

function fetchImage(){
    let uname = document.getElementById("input").value;
    imageStorage.methods.getImage(uname).call().then(function(result){
        if(result == ""){
            alert("No image found");
            return;
        }
        var div = document.getElementById("fetched-img");
        var img = document.createElement("img");
        img.src = result;
        div.appendChild(img);
    });
}