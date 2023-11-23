import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const AbsolutePath = (path:string)=>{
  return `${process.env.NEXT_ROOT_PATH}${path}`
}