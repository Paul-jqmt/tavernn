import './App.css'
import { Routes, Route } from 'react-router-dom'
import Clubs from './pages/Clubs'
import Landing from './pages/Landing'
import CreateClub from "./pages/CreateClub"

function App() {
    return (
        <Routes>
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/" element={<Landing />} />
            <Route path="/clubs/create" element={<CreateClub />} />
        </Routes>
    )
}

export default App
