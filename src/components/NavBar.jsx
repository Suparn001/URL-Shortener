import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";


const menuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
        height: "auto",
        opacity: 1,
        transition: { duration: 0.3 },
    },
    exit: {
        height: 0,
        opacity: 0,
        transition: { duration: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
};

const navVariants = {
    hidden: { y: -60, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};


const Navbar = () => {
    const path = useLocation().pathname;
    const [navbarOpen, setNavbarOpen] = useState(false);
    const token = null;

    return (
        <motion.div
            variants={navVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6 }}
            className="h-16 bg-custom-gradient z-50 flex items-center sticky top-0"
        >
            <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between items-center">

                {/* LOGO */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Link to="/">
                        <h1 className="font-bold text-3xl text-white italic">
                            Linklytics
                        </h1>
                    </Link>
                </motion.div>

                {/* DESKTOP + MOBILE MENU */}
                <AnimatePresence>
                    {(navbarOpen || window.innerWidth >= 640) && (
                        <motion.ul
                            variants={menuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className={`flex sm:gap-10 gap-4 sm:items-center sm:static absolute left-0 top-[62px] sm:shadow-none shadow-md
                bg-custom-gradient sm:bg-transparent sm:flex-row flex-col px-4 sm:px-0 sm:w-fit w-full`}
                        >
                            {["/", "/about"].map((route, i) => (
                                <motion.li
                                    key={route}
                                    variants={itemVariants}
                                    transition={{ delay: i * 0.1 }}
                                    className="font-[500]"
                                >
                                    <Link
                                        to={route}
                                        className={`${path === route
                                            ? "text-white font-semibold"
                                            : "text-gray-200"
                                            } hover:text-btnColor transition`}
                                    >
                                        {route === "/" ? "Home" : "About"}
                                    </Link>
                                </motion.li>
                            ))}

                            {!token && (
                                <motion.li
                                    variants={itemVariants}
                                    transition={{ delay: 0.3 }}
                                    className="bg-rose-700 text-white w-24 text-center font-semibold px-2 py-2 rounded-md cursor-pointer"
                                >
                                    <Link to="/register">SignUp</Link>
                                </motion.li>
                            )}
                        </motion.ul>
                    )}
                </AnimatePresence>

                {/* MENU ICON */}
                <motion.button
                    onClick={() => setNavbarOpen(!navbarOpen)}
                    className="sm:hidden"
                    animate={{ rotate: navbarOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {navbarOpen ? (
                        <RxCross2 className="text-white text-3xl" />
                    ) : (
                        <IoIosMenu className="text-white text-3xl" />
                    )}
                </motion.button>

            </div>
        </motion.div>
    );
};

export default Navbar;
