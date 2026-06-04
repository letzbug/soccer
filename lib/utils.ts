import { clsx, type ClassValue } from 'clsx'; import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function tendency(a:number,b:number){return a===b?'draw':a>b?'home':'away'}
export function scorePoints(tipHome:number,tipAway:number,realHome:number,realAway:number){ if(tipHome===realHome&&tipAway===realAway)return 3; return tendency(tipHome,tipAway)===tendency(realHome,realAway)?1:0 }
