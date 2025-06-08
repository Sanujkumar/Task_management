import { Input } from "@/components/ui/input";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <nav className="flex justify-center">
        <Input className="h-10 w-80 rounded-4xl md:w-1/2" placeholder="search project "/>
      </nav>
      <main>{children}</main>
    </div>
  );
}
