import React from 'react'
import Card from './Card'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useStoreContext } from '../contextApi/ContextApi';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
}

const fadeDown = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
}

const fadeRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
}

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
}

const LandingPage = () => {
    const navigate = useNavigate();
    const { token } = useStoreContext();

    console.log("token from landing page", token);
    const dashBoardNavigateHandler = () => {

    };



    return (
        <div className="min-h-[calc(100vh-64px)] lg:px-14 sm:px-8 px-4">

            {/* HERO SECTION */}
            <div className="lg:flex-row flex-col lg:py-5 pt-16 lg:gap-10 gap-8 flex justify-between">

                {/* TEXT */}
                <div className="flex-1">
                    <motion.h1
                        variants={fadeDown}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="font-bold font-roboto text-slate-800 md:text-5xl text-3xl md:leading-[55px] sm:leading-[45px] leading-10 lg:w-full md:w-[70%]"
                    >
                        Linklytics Simplifies URL Shortening for Efficient Sharing
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-slate-700 text-sm my-5"
                    >
                        Linklytics streamlines the process of URL shortening, making sharing
                        links effortless and efficient. With its user-friendly interface,
                        Linklytics allows you to generate concise, easy-to-share URLs in
                        seconds.
                    </motion.p>

                    {/* BUTTONS */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex items-center gap-3"
                    >
                        <button
                            onClick={dashBoardNavigateHandler}
                            className="bg-custom-gradient w-40 text-white rounded-md py-2">
                            Manage Links
                        </button>
                        <button
                            onClick={dashBoardNavigateHandler}
                            className="border-btnColor border w-40 text-btnColor rounded-md py-2">
                            Create Short Link
                        </button>
                    </motion.div>
                </div>

                {/* IMAGE */}
                <motion.div
                    variants={fadeRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.9 }}
                    className="flex-1 flex justify-center w-full"
                >
                    <img
                        className="sm:w-[480px] w-[400px] object-cover rounded-md"
                        src="/images/img2.png"
                        alt=""
                    />
                </motion.div>
            </div>

            {/* TRUST TEXT */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="sm:pt-12 pt-7"
            >
                <p className="text-slate-800 font-roboto font-bold lg:w-[60%] md:w-[70%] sm:w-[80%] mx-auto text-3xl text-center">
                    Trusted by individuals and teams at the world best companies
                </p>
            </motion.div>

            {/* CARDS */}
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="pt-4 pb-7 grid lg:gap-7 gap-4 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-4"
            >
                {[
                    {
                        title: "Simple URL Shortening",
                        desc: "Experience the ease of creating short, memorable URLs in just a few clicks.",
                    },
                    {
                        title: "Powerful Analytics",
                        desc: "Gain insights into your link performance with our comprehensive analytics dashboard.",
                    },
                    {
                        title: "Enhanced Security",
                        desc: "Rest assured with our robust security measures.",
                    },
                    {
                        title: "Fast and Reliable",
                        desc: "Enjoy lightning-fast redirects and high uptime.",
                    },
                ].map((card, index) => (
                    <motion.div key={index} variants={fadeUp}>
                        <Card {...card} />
                    </motion.div>
                ))}
            </motion.div>

        </div>
    )
}

export default LandingPage
