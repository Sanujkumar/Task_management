'use client'; // Only for Next.js 13+ app directory

import { useState } from 'react';
import Image from 'next/image';
import { RiArrowDownSLine } from "react-icons/ri";
import { Button } from '../components/ui/button';
import { useRouter } from 'next/navigation';
import { RiArrowUpSLine } from "react-icons/ri";
import { Url } from '../lib/config';

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (



    <div className="">

      <Button
        onClick={() => setOpen(!open)}
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
        <div className=" absolute mt-2 w-40 bg-white shadow-md border rounded z-10">
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
