import  Register from "../../../components/register-form"  

export default function Signup() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <Register />  
      </div>
    </div>
  )
}
