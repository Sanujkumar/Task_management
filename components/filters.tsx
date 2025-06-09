"use client";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { useRef } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";


export default function Filter() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  let debounceTimer: NodeJS.Timeout;

  const updateSearchParams = () => {
    const q = inputRef.current?.value || "";
    const price = priceRef.current?.value || "";

    const params = new URLSearchParams();
    if (q) params.set("search", q);
    if (price) params.set("price", price);

    router.push(`?${params.toString()}`);
  };

  const handleChange = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(updateSearchParams, 200);
  };

  return (
    <div className="flex-block space-y-2 sm:flex gap-4 mb-4 ml-10 mr-10 justify-center">

      <Input
        className="rounded-4xl h-10 md:w-1/2 "
        ref={inputRef}
        placeholder="Search project..."
        onChange={handleChange}
      />

      <Label className="">filters</Label>
      <Input
        ref={priceRef}
        className="h-10 w-30"
        type="number"
        placeholder="price..."
        onChange={handleChange}
      />
    </div>

  );
}
