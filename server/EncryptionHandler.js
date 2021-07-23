const crypto = require("crypto");

//need to have some encryption key
//should something strong and secret, but here using the letter 'p' 32 times as a trial
const secret = "pppppppppppppppppppppppppppppppp";


//encrypt
const encrypt = (password)=> {
    //iv->identifier for encryption
    const iv = Buffer.from(crypto.randomBytes(16));//to keep it random

    //cipher->where magic happens
    const cipher = crypto.createCipheriv("aes-256-ctr", Buffer.from(secret), iv);

    const encryptedPassword = Buffer.concat([cipher.update(password), cipher.final()]);

    //encryptedPassword is a buffer so we need to convert it to string, we're following here hexadecimal
    return {
        iv: iv.toString("hex"), 
        password: encryptedPassword.toString("hex")
    };//returning an object
};


//decrypt
const decrypt = (encryption)=> {
    const decipher = crypto.createDecipheriv(
        "aes-256-ctr", 
        Buffer.from(secret), 
        Buffer.from(encryption.iv, "hex")
        );

    const decryptedPassword = Buffer.concat([
        decipher.update(Buffer.from(encryption.password, "hex")), //converting to hex also
        decipher.final()
    ]);
    
    return decryptedPassword.toString();//no need to put "hex" here
};

module.exports = {encrypt, decrypt};