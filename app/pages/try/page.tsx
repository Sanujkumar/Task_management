// "use client"
// import { useRef, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";

// export default function EditableGithubUrl() {
//   const inputRef = useRef<HTMLInputElement>(null);  
//   const [isEditable, setIsEditable] = useState(false);
//   const [value, setValue] = useState("");           

//   const handleClick = () => {
//     if (isEditable) {
//       const newValue = inputRef.current?.value.trim();
//       if (newValue) {
//         setValue(newValue);         
//         setIsEditable(false);       
//       }
//     } else {  
//       setIsEditable(true); 
//       setTimeout(() => {
//         inputRef.current?.focus(); 
//       }, 0);  
//     }
//   };

//   return (
//     <div className="space-y-2 w-full max-w-md">
//       <Label htmlFor="githubUrl">GitHub URL</Label>

//       <Input
//         ref={inputRef}
//         id="githubUrl"
//         defaultValue={value}
//         disabled={!isEditable}
//         placeholder="Enter your GitHub URL"
//       />

//       <Button onClick={handleClick}>
//         {isEditable ? "Save" : value ? "Edit" : "Add"}
//       </Button>
//     </div>
//   );
// }


import ProfileDetailInfo from "@/components/ProfileDetailInfo";

export default function tries(){
  return(
    <ProfileDetailInfo/>  
  )
}
