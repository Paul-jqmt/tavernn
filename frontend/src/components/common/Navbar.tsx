import { Link } from "react-router-dom";
import logo from "@/assets/icons/logo.svg";
import menu from "@/assets/icons/menu.svg";
import { useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {useUser} from "@/contexts/UserContext.tsx";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUser();

    const menuItems = [
        { to: '/home', label: 'Home' },
        { to: (user && user.club) ? `/clubs/${user.club.id}` : '/clubs', label: 'Club' },
        { to: '/profile', label: 'Profile' },
    ];

    const menuVariants = {
        hidden: {
            opacity: 0,
            y: -10,
            transition: {
                when: 'afterChildren',
                staggerChildren: 0.1,
                staggerDirection: -1,
            },
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                when: 'beforeChildren',
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -8 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <header className="fixed w-full top-0 left-0 z-50 bg-transparent text-white">
            <div className="px-10 py-6 backdrop-blur-md flex items-center justify-between max-w-7x1 mx-auto">

                {/*   LOGO   */}
                <Link to="/" className={"flex items-center gap-3"}>
                    <img src={logo} alt="Tavernn Logo" className="h-10 w-10 object-contain"/>
                    <span className="text-xl font-semibold">Tavernn</span>
                </Link>

                {/*   NAV MENU   */}
                <nav className="hidden md:flex items-center gap-18">
                    { menuItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.to}
                            className='font-semibold hover:underline active:text-mid-purple'
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden hover:cursor-pointer" aria-label="Toggle Menu">
                    <img src={menu} alt='Menu' className='w-6 object-contain' />
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial='hidden'
                        animate='visible'
                        exit='hidden'
                        variants={menuVariants}
                        className='md:hidden text-white px-10 flex flex-col items-end text-right space-y-10'
                    >
                        {menuItems.map((menuItem) => (
                            <motion.div key={menuItem.to} variants={itemVariants}>
                                <Link
                                    to={menuItem.to}
                                    onClick={() => setIsOpen(false)}
                                    className='text-sm font-semibold hover:underline active:text-mid-purple'>
                                    {menuItem.label}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

        </header>
    )
}
