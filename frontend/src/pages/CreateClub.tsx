// src/pages/CreateClub.tsx
import { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { FaQuestionCircle } from 'react-icons/fa'

type AdmissionType = 'open' | 'closed' | 'invite_only'

export default function CreateClub() {
    const [name, setName] = useState('')
    const [type, setType] = useState<AdmissionType>('open')
    const [description, setDescription] = useState('')
    const [logoFile, setLogoFile] = useState<File | null>(null)
    const [logoPreview, setLogoPreview] = useState<string | null>(null)
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const navigate = useNavigate()

    // Validation simple
    const validate = () => {
        const errs: typeof errors = {}
        if (name.length < 5) errs.name = 'Min 5 caractères'
        if (name.length > 40) errs.name = 'Max 40 caractères'
        return errs
    }

    const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null
        setLogoFile(file)
        if (file) {
            const url = URL.createObjectURL(file)
            setLogoPreview(url)
        } else {
            setLogoPreview(null)
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length) {
            setErrors(errs)
            return
        }

        // Préparer un form-data pour inclure le fichier
        const formData = new FormData()
        formData.append('name', name)
        formData.append('type', type)
        formData.append('description', description)
        if (logoFile) formData.append('logo', logoFile)

        try {
            await axios.post('http://localhost:8080/api/clubs', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            // redirige vers la liste des clubs
            navigate('/clubs')
        } catch (err) {
            console.error(err)
            // TODO: gérer l'erreur (toast, etc.)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-900 to-purple-600 text-white">
            <Navbar />

            <div className="px-10 py-16 max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-8">
                    Create your <span className="text-orange-500">Club</span>
                </h1>

                <div className="bg-indigo-950 p-8 rounded-xl shadow-lg">
                    <p className="text-sm text-white/70 mb-6">
                        Fields that are marked by <span className="text-orange-500">*</span> are mandatory.
                    </p>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left column */}
                        <div className="space-y-6">
                            {/* Name */}
                            <div>
                                <label className="block mb-1" htmlFor="name">
                                    Club Name <span className="text-orange-500">*</span>
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className="w-full px-4 py-2 rounded-md text-black"
                                    placeholder="Lorem ipsum dolor…"
                                />
                                <div className="flex justify-between text-xs text-white/50 mt-1">
                                    <span>{errors.name}</span>
                                    <span>Min 5 char / Max 40 char</span>
                                </div>
                            </div>

                            {/* Admission type */}
                            <div>
                                <label className="block mb-1" htmlFor="type">
                                    Admission type <span className="text-orange-500">*</span>
                                    <FaQuestionCircle className="inline ml-2 text-white/50" />
                                </label>
                                <select
                                    id="type"
                                    value={type}
                                    onChange={e => setType(e.target.value as AdmissionType)}
                                    className="w-full px-4 py-2 rounded-md text-black"
                                >
                                    <option value="open">Open</option>
                                    <option value="closed">Closed</option>
                                    <option value="invite_only">Invite only</option>
                                </select>
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="block mb-1" htmlFor="description">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    className="w-full h-32 px-4 py-2 rounded-md text-black resize-none"
                                    placeholder="A short description about the club."
                                />
                            </div>

                            {/* Actions */}
                            <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="px-6 py-2 bg-white text-orange-500 rounded-md font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-orange-500 text-white rounded-md font-medium"
                                >
                                    Create
                                </button>
                            </div>
                        </div>

                        {/* Right column: upload logo */}
                        <div className="flex flex-col items-center justify-center">
                            <div
                                className="w-32 h-32 bg-orange-500 rounded-full flex items-center justify-center mb-4"
                            >
                                {logoPreview ? (
                                    <img src={logoPreview} className="w-full h-full object-cover rounded-full" />
                                ) : (
                                    <span className="text-black font-bold">LOGO</span>
                                )}
                            </div>
                            <label
                                htmlFor="logo"
                                className="cursor-pointer text-sm text-white/80 hover:underline"
                            >
                                Upload Logo
                                <input
                                    id="logo"
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    onChange={handleLogoChange}
                                    className="hidden"
                                />
                            </label>
                            <p className="text-xs text-white/50 mt-2">PNG, JPG · Max 5MB</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
