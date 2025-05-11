import './styles/App.css'
import {Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import SignupPage from "@/pages/SignupPage.tsx";
import LoginPage from "@/pages/LoginPage.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
        </Routes>
    )
}

export default App
