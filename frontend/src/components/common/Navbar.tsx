import {Link, useNavigate} from "react-router-dom";
import logo from "@/assets/icons/logo.svg";
import menu from "@/assets/icons/menu.svg";
import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {useUser} from "@/contexts/UserContext.tsx";
import {Button} from "@/components/ui/button.tsx";
import NotificationPanel from "@/components/dialogs/NotificationPanel.tsx";

export default function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const { user } = useUser();

    const menuItems = [
        { to: '/home', label: 'Home' },
        { to: user?.club ? '/myclub' : '/clubs', label: user?.club ? 'My Club' : 'Clubs' },
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
        <header className="fixed w-full top-0 left-0 z-50 bg-transparent text-foreground">
            <div className="px-10 py-6 backdrop-blur-md flex items-center justify-between max-w-7x1 mx-auto">

                {/*   LOGO   */}
                <Link to="/" className={"flex items-center gap-3"}>
                    <img src={logo} alt="Tavernn Logo" className="h-10 w-10 object-contain"/>
                    <span className="text-xl font-semibold">Tavernn</span>
                </Link>

                {/*   NAV MENU   */}
                <nav className="hidden md:flex items-center gap-8">
                    { menuItems.map((item) => (
                        <Button
                            key={item.label}
                            variant='secondary'
                            onClick={() => navigate(item.to, {replace: true})}
                        >
                            { item.label }
                        </Button>
                    ))}

                    <NotificationPanel isOpen={isNotificationOpen} onOpenChange={setIsNotificationOpen} />
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
                        className='md:hidden px-10 flex flex-col items-end text-right space-y-10'
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
