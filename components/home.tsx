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
import { Session } from "inspector/promises";


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
                "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
            name: "Sanuj Kumar",
            designation: "full-stack developer ",
            src: "/images/sanujp1-image.jpg",
        },
        {
            quote:
                "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
            name: "Sanuj kumar",
            designation: "Devops engineer",
            src: "/images/sanuj2-image.jpg",
        }
    ];

    const features = [
        {
            title: "Built for developers",
            description:
                "Built for engineers, developers, dreamers, thinkers and doers.",
            icon: <IconTerminal2 />,
        },
        {
            title: "Ease of use",
            description:
                "It's as easy as using an Apple, and as expensive as buying one.",
            icon: <IconEaseInOut />,
        },
        {
            title: "Pricing like no other",
            description:
                "Our prices are best in the market. No cap, no lock, no credit card required.",
            icon: <IconCurrencyDollar />,
        },
        {
            title: "100% Uptime guarantee",
            description: "We just cannot be taken down by anyone.",
            icon: <IconCloud />,
        },
        {
            title: "Multi-tenant Architecture",
            description: "You can simply share passwords instead of buying new seats",
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

     const {data:session,status} = useSession();

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
                <motion.div
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
                            src="https://assets.aceternity.com/pro/aceternity-landing.webp"
                            alt="Landing page preview"
                            className="aspect-[16/9] h-auto w-full object-cover"
                            height={1000}
                            width={1000}
                        />
                    </div>
                </motion.div>
                <div className="px-4 py-10 md:py-20">

                    <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
                        {"Find skills full work related to own skills and earn money"
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
                        {status==="unauthenticated" && (   
                        <button  className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
                           Login
                        </button>
                        )}
                    </motion.div>



                </div>

            </div>

            <h1 className="text-white text-3xl text-center py-4 font-extrabold">Feature Section</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
                {features.map((feature, index) => (
                    <Feature key={feature.title} {...feature} index={index} />
                ))}
            </div>

            <h1 className="text-white text-3xl text-center py-4 font-extrabold">Testimonial</h1>
            <AnimatedTestimonials testimonials={testimonials} />


            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 relative">

                <div className="relative w-full max-w-xl flex flex-col items-center justify-center mx-auto">
                    <div className="bg-gray-100 dark:bg-gray-900 py-12 pt-36 relative">
                        <div className="max-w-2xl mx-auto p-4 relative z-10">
                            {' '}
                            {/* Add relative and z-10 to bring content to the front */}
                            <h1 className="text-lg md:text-7xl text-center font-sans font-bold mb-8 text-white">
                                Contact Us
                            </h1>
                            <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center">
                                We&apos;re here to help with any questions about our courses,
                                programs, or events. Reach out and let us know how we can assist you
                                in your musical journey.
                            </p>
                            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email address"
                                    className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700"
                                    required
                                />
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Your message"
                                    className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700"
                                    rows={5}
                                    required
                                ></textarea>
                                <button
                                    type="submit"
                                    className="px-6 py-2 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>


            <div className="mt-10">
                <footer className='bg-black text-gray-400 py-12'>
                    <div className='max-w-6xl grid grid-cols-1
        sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8 ml-32 lg:mx-auto'>
                        <div>
                            <h2 className="text-white text-lg font-semibold mb-4">About Us</h2>
                            <p className="mb-4">
                                Music School is a premier institution dedicated to teaching the art
                                and science of music. We nurture talent from the ground up,
                                fostering a vibrant community of musicians.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-white text-lg font-semibold mb-4">Quick Links</h2>
                            <ul>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors duration-300"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors duration-300"
                                    >
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors duration-300"
                                    >
                                        Courses
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors duration-300"
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-white text-lg font-semibold mb-4">Follow Us</h2>
                            <div className="flex space-x-4">
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors duration-300"
                                >
                                    Facebook
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors duration-300"
                                >
                                    Twitter
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-white transition-colors duration-300"
                                >
                                    Instagram
                                </a>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-white text-lg font-semibold mb-4">Contact Us</h2>
                            <p>New Delhi, India</p>
                            <p>Delhi 10001</p>
                            <p>Email: info@musicschool.com</p>
                            <p>Phone: (123) 456-7890</p>
                        </div>
                    </div>
                    <p className="text-center text-xs pt-8">© 2024 Music School. All rights reserved.</p>

                </footer>
            </div>
        </>
    );


}