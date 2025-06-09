"use client"  
import React, { ReactNode } from "react";
import Filter from "../../../components/filters";


export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <nav className="">   
        <Filter />
      </nav>
      <main>{children}</main>
    </div>
  );
}
  