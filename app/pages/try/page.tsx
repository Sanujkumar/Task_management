"use client"
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function EditableGithubUrl() {
  const inputRef = useRef<HTMLInputElement>(null);  // holds input DOM
  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState("");           // final saved value

  const handleClick = () => {
    if (isEditable) {
      // When saving: get the value from the inputRef
      const newValue = inputRef.current?.value.trim();
      if (newValue) {
        setValue(newValue);         // update the displayed value
        setIsEditable(false);       // lock input
      }
    } else {  
      setIsEditable(true); // unlock input for editing
      setTimeout(() => {
        inputRef.current?.focus(); // auto-focus when editing starts
      }, 0);  
    }
  };

  return (
    <div className="space-y-2 w-full max-w-md">
      <Label htmlFor="githubUrl">GitHub URL</Label>

      <Input
        ref={inputRef}
        id="githubUrl"
        defaultValue={value}
        disabled={!isEditable}
        placeholder="Enter your GitHub URL"
      />

      <Button onClick={handleClick}>
        {isEditable ? "Save" : value ? "Edit" : "Add"}
      </Button>
    </div>
  );
}
