import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="bg-gradient-to-r from-indigo-900 to-purple-600 px-10 py-4 text-white flex justify-between items-center">
            {/* Logo à gauche */}
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold">
                    LOGO
                </div>
                <span className="text-xl font-bold">Tavernn</span>
            </div>

            {/* Liens à droite */}
            <div className="flex gap-6 text-sm font-medium">
                <Link to="/" className="hover:underline">Home</Link>
                <Link to="/clubs" className="hover:underline">Club</Link>
                <Link to="/profile" className="hover:underline">Profile</Link>
            </div>
        </nav>
    )
}
