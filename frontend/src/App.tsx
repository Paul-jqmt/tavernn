import '@/styles/App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import AuthenticationPage from "@/pages/AuthenticationPage.tsx";
import ProfilePage from "@/pages/ProfilePage.tsx";
import ClubsDiscoverPage from "@/pages/clubs/ClubDiscoverPage.tsx";
import UserHomePage from "@/pages/UserHomePage.tsx";
import CreateClubForm from "@/components/forms/CreateClubForm.tsx";
import {ClubViewPage} from "@/pages/clubs/ClubViewPage.tsx";
import {UserProvider} from "@/contexts/UserContext.tsx";

function App() {
    return (
        <UserProvider>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/auth' element={<AuthenticationPage />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/home' element={<UserHomePage />} />
                <Route path='/clubs' element={<ClubsDiscoverPage />} />
                <Route path='/clubs/create' element={<CreateClubForm />} />
                <Route path='/clubs/:id' element={<ClubViewPage />} />
            </Routes>
        </UserProvider>

    )
}

export default App
