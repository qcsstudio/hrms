import CryptoJS from "crypto-js";

const SECRET_KEY = "pankajtestcrypto";



export const encryptToken = (token) => {
  const strToken = typeof token === "string" ? token : JSON.stringify(token);
  return CryptoJS.AES.encrypt(strToken, SECRET_KEY).toString();
};


export const decryptToken = (cipherText) => {
  try {
    if (!cipherText || typeof cipherText !== "string") {
      return cipherText;
    }

    // Check if it's a URL-safe encoded token first
    if (cipherText.includes('-') || cipherText.includes('_')) {
      try {
        // Convert back from URL-safe base64
        const base64 = cipherText.replace(/-/g, '+').replace(/_/g, '/');
        const paddedBase64 = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
        const encryptedText = atob(paddedBase64);
        
        if (encryptedText.includes("U2FsdGVkX1")) {
          const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
          const originalText = bytes.toString(CryptoJS.enc.Utf8);
          return originalText || cipherText;
        }
      } catch (e) {
        console.warn("URL-safe decoding failed, trying regular decryption");
      }
    }

    // Regular decryption for non-URL-safe tokens
    if (cipherText.includes("U2FsdGVkX1")) {
      const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      return originalText || cipherText;
    }

    return cipherText;
  } catch (error) {
    console.warn("Error decrypting token, returning as-is:", error.message);
    return cipherText;
  }
};

