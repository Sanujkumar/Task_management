'use client'; 

import { useState } from 'react';
import { RiArrowDownSLine } from "react-icons/ri";
import { Button } from '../components/ui/button';
import { useRouter } from 'next/navigation';
import { RiArrowUpSLine } from "react-icons/ri";
import { Url } from '../lib/config';
import { useRef,useEffect } from 'react';


export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLInputElement>(null);  
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="" ref={dropdownRef}>
      <Button
        onClick={() => setOpen((prev) => !prev)}
        size="sm"
        variant="link"
        className="w-20 pr-8"  
      >
        YourTask
        {open ? (
          <RiArrowDownSLine   />
        ) : (  
          <RiArrowUpSLine size={30} />
        )}  

      </Button>  

      {open && (
        <div className=" absolute mt-2 w-40 bg-white shadow-md border rounded z-10"
        >
          <Button
            onClick={() => router.push(`${Url}/pages/createTask`)}
            size="sm"
            variant="link"  
          >
            CreateTask
          </Button>
          <Button
            onClick={() => router.push(`${Url}/pages/allTasks`)}
            size="sm"
            variant="link"
          >
            AllTask
          </Button>
        </div>
      )}
    </div>
  );
}
