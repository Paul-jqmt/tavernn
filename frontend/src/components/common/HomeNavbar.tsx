import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import logo from '../../assets/icons/logo.svg';

export default function HomeNavbar() {
    const menuItems = [
        { to: '/discover', label: 'Discover' },
        { to: '/help', label: 'Help' },
    ];

    return (
        <header className="fixed w-full top-0 left-0 z-50 bg-background text-foreground">
            <div className="px-10 py-6 flex items-center justify-between max-w-7x1 mx-auto">
                {/*   LOGO   */}
                <Link to="/" className={"flex items-center gap-3"}>
                    <img src={logo} alt="Tavernn Logo" className="h-10 w-10 object-contain"/>
                    <span className="text-xl font-semibold">Tavernn</span>
                </Link>

                {/*   NAV MENU   */}
                <nav className="flex items-center gap-6 md:gap-10">
                    { menuItems.map((item) => (
                        <Button variant='secondary'>
                            <Link
                                key={item.label}
                                to={item.to}
                                className='font-semibold text-sm'
                            >
                                {item.label}
                            </Link>
                        </Button>
                    ))}
                    <Button className="px-8" variant="default" asChild>
                        <Link to={"/auth"}>Login</Link>
                    </Button>
                </nav>
            </div>
        </header>
    )
}