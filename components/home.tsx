import Image from 'next/image';

export default function Home() {

    return (
        <div className=" h-screen w-full">
            <div className="h-full w-full bg-gray-100">

                <div className=" w-full h-3/4 flex  p-10 gap-4 ">
                    <div className=' w-1/2 h-full text-center pt-20'>
                        <p><span className='text-blue-400'>Welcome to </span>Task-management platform</p>
                    </div>
                    <div>
                        <Image
                            src="https://startinfinity.s3.us-east-2.amazonaws.com/production/blog/post/5/main/1SvzKctRCi8bwB0QPdOZkBP0pRhsOqZpl0wjs6y0.png"
                            alt='remote'
                            width={400}
                            height={300}
                            className='rounded-4xl h-2/2'
                        />
                    </div>

                </div>
                <div>


                </div>
            </div>
        </div>
    )
}  