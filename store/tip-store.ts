import { create } from 'zustand'
type TipState={draft:Record<string,{home:number;away:number}>;setTip:(id:string,home:number,away:number)=>void;clear:()=>void}
export const useTipStore=create<TipState>((set)=>({draft:{},setTip:(id,home,away)=>set(s=>({draft:{...s.draft,[id]:{home,away}}})),clear:()=>set({draft:{}})}))
