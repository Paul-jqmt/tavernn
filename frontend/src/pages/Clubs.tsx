import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

type Club = {
    id: string
    name: string
    description: string
    level: string
    max_members: number
    nr_members: number
    type: string
}

export default function Clubs() {
    const [clubs, setClubs] = useState<Club[]>([])

    useEffect(() => {
        axios.get('http://localhost:8080/api/clubs')
            .then(response => setClubs(response.data))
            .catch(error => console.error('Erreur lors du fetch des clubs', error))
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-900 to-purple-600 text-white">
            <Navbar />

            <div className="px-10 py-8">
                <h1 className="text-4xl font-extrabold mb-6">Clubs</h1>

                <div className="bg-orange-500 px-6 py-3 rounded-xl text-white font-medium mb-6 w-fit">
                    You haven't joined a club yet. Choose your adventure
                </div>

                <div className="flex justify-end gap-4 mb-4">
                    <select className="bg-white text-black px-3 py-2 rounded-md">
                        <option>Filter</option>
                    </select>
                    <select className="bg-white text-black px-3 py-2 rounded-md">
                        <option>Sort by</option>
                    </select>
                </div>

                <div className="flex flex-col gap-4">
                    {clubs.map((club) => (
                        <div
                            key={club.id}
                            className="bg-indigo-950 rounded-xl px-6 py-4 flex justify-between items-center"
                        >
                            {/* Logo + Infos */}
                            <div className="flex gap-4 items-center">
                                <div className="bg-orange-500 rounded-full w-12 h-12 flex items-center justify-center text-sm font-bold">
                                    LOGO
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold">{club.name}</h2>
                                    <p className="text-sm text-white/70">
                                        {club.description || 'Short description of the club'}
                                    </p>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex gap-10 items-center">
                                <p className="text-sm">{/* teams */}3 Teams</p>
                                <p className="text-sm">
                                    {club.nr_members}/{club.max_members} Members
                                </p>

                                {/* Status */}
                                <span className="bg-white text-black font-semibold text-sm px-4 py-2 rounded-md">
                {club.type.charAt(0).toUpperCase() + club.type.slice(1)}
              </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )}
