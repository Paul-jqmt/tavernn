import { useEffect, useState } from 'react'
import axios from 'axios'

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
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Liste des clubs</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {clubs.map(club => (
                    <div key={club.id} className="bg-white p-4 rounded shadow">
                        <h2 className="text-xl font-semibold">{club.name}</h2>
                        <p className="text-gray-600 text-sm">{club.description}</p>
                        <p className="mt-2 text-sm">
                            Niveau : {club.level} | Membres : {club.nr_members}/{club.max_members}
                        </p>
                        <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
              {club.type}
            </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
