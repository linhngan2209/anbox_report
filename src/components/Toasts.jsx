
import React, { useState, useEffect } from 'react'

let globalPush = null

export function pushToast(msg, type='info', timeout=3000){
  if(globalPush) globalPush({msg, type, timeout})
}

export default function Toasts(){
  const [list, setList] = useState([])
  useEffect(()=>{ globalPush = (t)=> setList(s=>[...s, {...t, id: Date.now()+Math.random()}]); return ()=>{ globalPush=null } },[])
  useEffect(()=>{
    list.forEach(item=>{
      if(item.timeout){
        const id = setTimeout(()=> setList(s=>s.filter(x=>x.id!==item.id)), item.timeout)
        return ()=> clearTimeout(id)
    }})
  },[list])
  if(list.length===0) return null;
  return (
    <div className="fixed right-4 top-4 z-50 flex flex-col gap-2">
      {list.map(i=> <div key={i.id} className={"px-3 py-2 rounded shadow "+(i.type==='error'?'bg-red-500 text-white': i.type==='success'?'bg-green-500 text-white':'bg-gray-800 text-white')}>{i.msg}</div>)}
    </div>
  )
}
