import '@/styles/App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import AuthenticationPage from "@/pages/AuthenticationPage.tsx";
import ProfilePage from "@/pages/ProfilePage.tsx";
import ClubsDiscoverPage from "@/pages/clubs/ClubDiscoverPage.tsx";
import UserHomePage from "@/pages/UserHomePage.tsx";
import CreateClubForm from "@/components/forms/CreateClubForm.tsx";
import {ClubDetailsPage} from "@/pages/clubs/ClubDetailsPage.tsx";
import {UserProvider} from "@/contexts/UserContext.tsx";
import ProtectedRoute from "@/components/common/ProtectedRoute.tsx";
import {ClubDiscoverDetailsPage} from "@/pages/clubs/ClubDiscoverDetailsPage.tsx";
import ProfileSettingsPage from "@/pages/ProfileSettingsPage.tsx";
import {CreateTeamForm} from "@/components/forms/CreateTeamForm.tsx";

function App() {
    return (
        <UserProvider>
            <Routes>
                {/*   HOME PAGE WHEN UNAUTHENTICATED   */}
                <Route path='/' element={
                    <HomePage />}
                />

                {/*   HOME PAGE WHEN AUTHENTICATED   */}
                <Route path='/home' element={
                    <ProtectedRoute>
                        <UserHomePage />
                    </ProtectedRoute>
                } />

                {/*   AUTHENTICATION PAGE   */}
                <Route path='/auth' element={
                    <AuthenticationPage />}
                />

                {/*   PROFILE PAGE OF AUTHENTICATED USER   */}
                <Route path='/profile' element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                } />

                {/*   PROFILE SETTINGS   */}
                <Route path='/profile/settings' element={
                    <ProtectedRoute>
                        <ProfileSettingsPage />
                    </ProtectedRoute>
                } />

                {/*   PAGE WITH ALL THE CLUBS   */}
                <Route path='/clubs' element={
                    <ProtectedRoute>
                        <ClubsDiscoverPage />
                    </ProtectedRoute>
                } />

                {/*   PAGE TO CREATE A CLUB   */}
                <Route path='/clubs/create' element={
                    <ProtectedRoute>
                        <CreateClubForm />
                    </ProtectedRoute>
                } />

                {/*   PAGE WITH CLUB DETAILS   */}
                <Route path='/clubs/:id' element={
                    <ProtectedRoute>
                        <ClubDiscoverDetailsPage />
                    </ProtectedRoute>
                } />

                {/*   PAGE WITH THE CLUB OF THE CURRENT USER   */}
                <Route path='/myclub' element={
                    <ProtectedRoute>
                        <ClubDetailsPage />
                    </ProtectedRoute>
                } />

                <Route path='/teams/create' element={
                    <ProtectedRoute>
                        <CreateTeamForm />
                    </ProtectedRoute>
                } />
            </Routes>
        </UserProvider>

    )
}

export default App
