import CryptoJS from 'crypto-js';



// Encrypt
export const encryptphone= ({ payload = "", signature = process.env.TOKEN_SIGNATURE })=>{

    const encrypt = CryptoJS.AES.encrypt(payload, signature).toString();
         
    return encrypt
}

export const Decrypt=({ payload = "", signature = process.env.TOKEN_SIGNATURE })=>{

    const Decrypted = CryptoJS.AES.decrypt(payload, signature)
  const  decryptedData = JSON.parse(Decrypted.toString(CryptoJS.enc.Utf8))
    return decryptedData
}

