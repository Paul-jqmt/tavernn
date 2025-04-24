import './App.css'
import { Routes, Route } from 'react-router-dom'
import Clubs from './pages/Clubs'

function App() {
    return (
        <Routes>
            <Route path="/clubs" element={<Clubs />} />
        </Routes>
    )
}

export default App
