import { LogoEd } from "./LogoEd";
import {List, X} from 'phosphor-react'
import { useState } from "react";
import { ConogramaAulas } from "./ConogramaAulas";


export function Header(){
    const[open, setOpen] = useState(true);
    return (
      <>
        <header className="max-w-full py-3 px-2 justify-between flex items-center md:justify-center bg-gray-700 border-b border-gray-600">
          <LogoEd 
          />
          <div
            className="flex items-center justify-between p-4  cursor-pointer md:hidden"
            onClick={() => setOpen(!open)}
          >
            <p>Aulas</p>
            {open ?  <List size={30} /> : <X size={30} />}
          </div>
        </header>
        <div>{!open ? <ConogramaAulas /> : ''}</div>
      </>
    );
}