import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import CryptoJS from "crypto-js"
const SECRET_KEY = "your-secret-key";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number) {
  // if number less then or equal 999 it's show number 
  if (num < 1000) {
      const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      return num.toString().split('').map(digit => banglaDigits[parseInt(digit)]).join('');
  } 
  // if number grater than or equal 1000 its show like ১ হাজার বা ১.৫ হাজার ফরম্যাট এ দেখাবে 
  else {
      let formattedNum;
      if (num >= 1000 && num < 100000) {
          formattedNum = (num / 1000).toFixed(1) + ' হাজার';
      } else if (num >= 100000) {
          formattedNum = (num / 1000).toFixed(0) + ' হাজার';
      }
      return formattedNum;
  }


  /* Output Example 
    999   = ৯৯৯, 
    1500  = ১.৫ হাজার, 
    10500 = ১০ হাজার

  */
}

/* Full Name To Convert Short Name like: Rakib Miah -> RM */
export function getInitials(fullName:string) {
    if (!fullName){
        return;
    }
    const words = fullName.trim().split(/\s+/); // Split by spaces and remove extra spaces

    if (words.length === 1) {
        return words[0].substring(0, 2).toUpperCase(); // Take first two letters if only one word
    }

    return (words[0][0] + words[words.length - 1][0]).toUpperCase(); // First and last word initials
}





// encrypt data 
export function encryptData(data: unknown) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

//decrypt data
export function decryptData(encryptedData: unknown) {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
        console.error("Decryption Error:", error);
        return null;
    }
}
