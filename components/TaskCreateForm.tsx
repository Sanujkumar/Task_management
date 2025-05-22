import { Input } from "./ui/input";


export default function TaskCreate(){

    return(
        <div className="w-screen h-sceeen bg-pink-400">    
            <div className="flex  justify-center items-center bg-blue-300">
                <div className="w-3/4 h-80 bg-amber-200">
                <div>
                    <Input/>
                </div>
                </div>
            </div>
        </div>
    )
}