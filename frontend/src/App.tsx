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
import ProtectedRoute from "@/components/common/ProtectedRoute.tsx";
import {ClubDiscoverDetailsPage} from "@/pages/clubs/ClubDiscoverDetailsPage.tsx";

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

                {/*   PAGE WITH CLUB DETAILS*/}
                <Route path='/clubs/:id' element={
                    <ProtectedRoute>
                        <ClubDiscoverDetailsPage />
                    </ProtectedRoute>
                } />

                {/*   PAGE WITH USER'S CLUB   */}
                <Route path='/myclub' element={
                    <ProtectedRoute>
                        <ClubViewPage />
                    </ProtectedRoute>
                } />
            </Routes>
        </UserProvider>

    )
}

export default App
