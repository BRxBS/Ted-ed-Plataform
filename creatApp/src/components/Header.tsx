import { LogoEd } from "./LogoEd";
import {List, X} from 'phosphor-react'
import {  useState, useEffect } from "react";
import { ConogramaAulas } from "./ConogramaAulas";
import { useNavigate,useLocation } from "react-router-dom";


export function Header(){
    const[open, setOpen] = useState(true);
      const navigate = useNavigate();
      const {pathname } = useLocation();

      const handleNavigate = (path: string | any) =>{
        navigate(path);
      }

      useEffect(() => {
        if (pathname === '/event/bar'){
          setOpen(false)
        }
      }, [pathname]);
 
    return (
      <>
        <header className="max-w-full py-3 px-2 justify-between flex items-center md:justify-center bg-gray-700 border-b border-gray-600">
          <LogoEd />
          <div
            className="flex items-center justify-between p-4  cursor-pointer md:hidden"
            onClick={() => setOpen(!open)}
          >
            <p>Aulas</p>
            {open ? 
              <List size={30} onClick={() => handleNavigate("/event/bar")} />
             : 
              <X size={30} onClick={() => handleNavigate(-1)} />
            }
          </div>
        </header>
    
    
      </>
    );
}