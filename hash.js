const { createHash } = require('crypto');

function decodeInput(str, len)
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

function hash(x) {
        x=parseInt(x)
        let bin = 0;
        let rem, i = 1, step = 1;
        while (x != 0) {
            rem = x % 2;
            x = parseInt(x / 2);
            bin = bin + rem * i;
            i = i * 10;
        }
        bin=bin.toString()
        var encoded='0'.repeat(bin.length-1)
        encoded+='1'
        encoded+=bin
        console.log(encoded)
        return createHash('sha256').update(encoded).digest('hex');  
}


function allow(password){
        if (password=='e5fd31a481496e7cffe837a2c71b05dd789dc4fdbd7df2291b9904fae8e6a8f2'){
                
        }
}

console.log(hash('7'))