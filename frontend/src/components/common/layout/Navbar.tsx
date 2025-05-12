import {Link} from "react-router-dom";
import logo from "@/assets/logo.svg";

export default function Navbar() {
    return (
        <header className="fixed w-full top-0 left-0 z-50 backdrop-blur-md bg-transparent text-white">
            <div className="px-10 py-10 flex items-center justify-between max-w-7x1 mx-auto">
                <Link to="/" className={"flex items-center gap-3"}>
                    <img src={logo} alt="Tavernn Logo" className="h-10 w-10 object-contain"/>
                    <span className="text-xl font-semibold">Tavernn</span>
                </Link>
                <nav className="flex items-center gap-8 md:gap-18">
                    <Link className="hover:underline active:text-mid-purple text-sm font-semibold"
                          to="/discover">Home</Link>
                    <Link className="hover:underline active:text-mid-purple text-sm font-semibold"
                          to="/help ">Club</Link>
                    <Link className="hover:underline active:text-mid-purple text-sm font-semibold"
                          to="/help ">Profile</Link>
                </nav>
            </div>
        </header>
    )
}
