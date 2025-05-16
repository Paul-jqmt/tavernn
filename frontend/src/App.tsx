import '@/styles/App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import AuthenticationPage from "@/pages/AuthenticationPage.tsx";
import ProfilePage from "@/pages/ProfilePage.tsx";
import ClubViewPage from "@/pages/ClubViewPage.tsx";

function App() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/auth' element={<AuthenticationPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/club' element={<ClubViewPage />} />
        </Routes>
    )
}

export default App
