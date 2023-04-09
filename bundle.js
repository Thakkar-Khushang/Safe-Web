
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
let contractAddress = "0x1AE230B5B9F53a03ac7101FBB0e99DF13b7f65CD";

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
    reader.onload = async function(){
        var base64 = reader.result.split(',')[1];
        const encryptedBase64 = await encrypt(base64);
        console.log(encryptedBase64)
        // store image
        imageStorage.methods.storeImage(uname, encryptedBase64).send({from: "0x68bBBA10a2d3B44e75beb47ba58fcd48D3917D2F", gas: 999999999}).then(function(receipt){
            alert("Image stored successfully");
            console.log(receipt);
        });
    }
    
}

function fetchImage(){
    let uname = document.getElementById("input").value;
    imageStorage.methods.getImage(uname).call().then(async function(result){
        if(result == ""){
            alert("No image found");
            return;
        }
        var decryptedBase64 = await decrypt(result.split(',')[1]);
        var div = document.getElementById("fetched-img");
        var img = document.createElement("img");
        img.src = decryptedBase64;
        div.appendChild(img);
    });
}