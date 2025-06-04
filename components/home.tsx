import Image from 'next/image';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();  

    return (
        <div className=" h-screen w-full">
            <div className="h-full w-full bg-gray-100">

                <div className="flex-row p-10 space-y-10 sm:space-x-4 ">
                    <div className=' w-full sm:w-1/2 sm:h-40 text-center  pb-10 '>
                        <span className='text-blue-500 text-3xl sm:text-6xl  '>Welcome to </span><span className='sm:text-3xl text-blue-400'>Task-management platform</span>
                    </div>
                    <div className="relative h-40 w-full sm:h-40 sm:w-1/2 md:h-40 md:w-w-1/2 bg-yellow-200 ">
                        <Image  
                            src="https://img.favpng.com/25/12/14/project-management-portable-network-graphics-clip-art-png-favpng-8seWcJ3cbkXCs3gAfJRnhJKtb.jpg"
                            alt="remote"
                            fill
                            className="object-cover"
                        />  
                    </div>

                </div>

                <div className="ml-10 ">Here show all project to pending</div>
                <Button className='ml-10 ' onClick={() => router.push("/pages/AllProjects")}>
                    show
                </Button>

            </div>
        </div>
    )
    
}  