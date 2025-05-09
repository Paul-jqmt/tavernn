import './App.css'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.tsx'
import SignupPage from "@/pages/SignupPage.tsx";
import LoginPage from "@/pages/LoginPage.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    )
}

export default App
