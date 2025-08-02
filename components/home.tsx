'use client'
import { cn } from "@/lib/utils";
import {
    IconAdjustmentsBolt,
    IconCloud,
    IconCurrencyDollar,
    IconEaseInOut,
    IconHeart,
    IconHelp,
    IconRouteAltLeft,
    IconTerminal2,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { useState, FormEvent } from "react";
import { useRouter } from 'next/navigation';
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { useSession } from "next-auth/react";
import VideoCarousel from "./videoCarousel";


const Feature = ({
    title,
    description,
    icon,
    index,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
}) => {
    return (
        <div
            className={cn(
                "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
                (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
                index < 4 && "lg:border-b dark:border-neutral-800"
            )}
        >
            {index < 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            {index >= 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
                {icon}
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                    {title}
                </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
                {description}
            </p>
        </div>
    );
};





export default function Home() {
    const testimonials = [
        {
            quote:
                "I am software engineer",
            name: "Sanuj Kumar",
            designation: "full-stack developer ",
            src: "/images/sanujp1-image.jpg",
        },
        {
            quote:
                "I am software engineer",
            name: "Sanuj kumar",
            designation: "Devops engineer",
            src: "/images/sanuj2-image.jpg",
        }
    ];

    const features = [
        {
            title: "Programming and Tech",
            description:
                "Built for engineers, developers,Problem solver, thinkers and doers.",
            icon: <IconTerminal2 />,
        },
        {
            title: "Graphics and Design ",
            description:
                " the art of composing visual elements — such as typography, images, colors, and shapes — to communicate information or convey a message effectively.",
            icon: <IconEaseInOut />,
        },
        {
            title: "Video & Animation",
            description:
                "videos created with original designs, drawings, illustrations or computer-generated effects that have been made to move in an eye-catching way using any number of artistic styles",
            icon: <IconCurrencyDollar />,
        },
        {
            title: "Photgraphy",
            description: "the art, application, and practice of creating images by recording light, either electronically via an image sensor or chemically on light-sensitive material.",
            icon: <IconCloud />,
        },
        {
            title: "Digital Marketing",
            description: "he promotion of brands to connect with potential customers using the internet and other forms of digital communication",
            icon: <IconRouteAltLeft />,
        },
        {
            title: "24/7 Customer Support",
            description:
                "We are available a 100% of the time. Atleast our AI Agents are.",
            icon: <IconHelp />,
        },
        {
            title: "Money back guarantee",
            description:
                "If you donot like EveryAI, we will convince you to like us.",
            icon: <IconAdjustmentsBolt />,
        },
        {
            title: "And everything else",
            description: "I just ran out of copy ideas. Accept my sincere apologies",
            icon: <IconHeart />,
        },
    ];


    const router = useRouter();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const { data: session, status } = useSession();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Submitted:', { email, message });
    }

    return (
        <>
            <div className="relative my-2 flex flex-col items-center justify-center mx-4 z-auto right-auto left-auto">

                <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
                    <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
                </div>
                <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
                    <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
                    <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                </div>

                <div className="w-full max-w-3xl sm:max-w-4xl md:max-w-6xl overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700  p-6">
                    <VideoCarousel />
                </div>


                {/* <motion.div
                    initial={{
                        opacity: 0,
                        y: 10,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.3,
                        delay: 1.2,
                    }}
                    className="relative z-10 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
                >
                    <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
                        <img
                            src="/images/home.jpg"
                            alt="Landing page preview"
                            className="aspect-[16/9] h-auto w-full object-cover"
                            height={100}
                            width={100}
                        />
                    </div>
                </motion.div> */}
                <div className="px-4 py-10 md:py-20">

                    <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
                        {"Find SkillsFull work related to own skills and earn money"
                            .split(" ")
                            .map((word, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.1,
                                        ease: "easeInOut",
                                    }}
                                    className="mr-2 inline-block"
                                >
                                    {word}
                                </motion.span>
                            ))}
                    </h1>
                    <motion.p
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        transition={{
                            duration: 0.3,
                            delay: 0.8,
                        }}
                        className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
                    >

                    </motion.p>
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        transition={{
                            duration: 0.3,
                            delay: 1,
                        }}
                        className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
                    >
                        <button onClick={() => router.push('/pages/AllProjects')} className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                            FindProjects
                        </button>
                        {status === "unauthenticated" && (
                            <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
                                Login
                            </button>
                        )}
                    </motion.div>



                </div>

            </div>

            <h1 className="text-black text-3xl text-center py-4 font-extrabold">Feature Section</h1>
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto gap-4 sm:space-y-4">
                {features.map((feature, index) => (
                    <Feature key={feature.title} {...feature} index={index} />
                ))}
            </div>

            <h1 className="text-white text-3xl text-center py-4 font-extrabold">Testimonial</h1>
            <AnimatedTestimonials testimonials={testimonials} />




            <div className="mt-10">
                <footer className='bg-gray-800 text-gray-400 py-12'>
                    <div className='max-w-6xl grid grid-cols-1
        sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8 ml-32 lg:mx-auto'>
                        <div>
                            <h2 className="text-white text-lg font-semibold mb-4">About Us</h2>
                            <p className="mb-4">
                                task_management.com a global online marketplace designed to connect employers with freelancers for various projects and tasks, operating as a platform for both hiring and finding work
                            </p>
                        </div>
                        <div>
                            <h2 className="text-white text-lg font-semibold mb-4">Quick Links</h2>
                            <ul>
                                <li>
                                    <a
                                        href="/"
                                        className="hover:text-white transition-colors duration-300"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/pages/about"
                                        className="hover:text-white transition-colors duration-300"
                                    >
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/pages/AllProjects"
                                        className="hover:text-white transition-colors duration-300"
                                    >
                                        Projects
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/pages/inbox"
                                        className="hover:text-white transition-colors duration-300"
                                    >
                                        Message
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/pages/person"
                                        className="hover:text-white transition-colors duration-300"
                                    >
                                        Conect with someone
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-white text-lg font-semibold mb-4">Follow Us</h2>
                            <div className="flex space-x-4">
                                <a
                                    href="https://github.com/Sanujkumar"
                                    className="hover:text-white transition-colors duration-300"
                                >
                                    Github
                                </a>
                                <a
                                    href="https://x.com/sanujkumar67943"
                                    className="hover:text-white transition-colors duration-300"
                                >
                                    Twitter
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/sanuj-kumar-a27362254/"
                                    className="hover:text-white transition-colors duration-300"
                                >
                                    Linkedin
                                </a>
                            </div>
                        </div>  
                        <div>
                            <h2 className="text-white text-lg font-semibold mb-4">Contact Us</h2>
                            <p>Bihar patna, India</p>
                            <p>Datna 80008</p>
                            <p>Email: sanujkumar67943@gmail.com</p>
                            <p>Phone: 620148394</p>
                        </div>
                    </div>
                    <p className="text-center text-xs pt-8">© 2025 Task_management. All rights reserved.</p>

                </footer>
            </div>
        </>
    );


}