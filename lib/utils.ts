import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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


