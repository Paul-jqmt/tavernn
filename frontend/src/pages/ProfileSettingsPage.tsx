import Navbar from "@/components/common/Navbar.tsx";
import ProfileSideColumn from "@/components/common/profile/ProfileSideColumn.tsx";
import {useEffect} from "react";
import {useUser} from "@/contexts/UserContext.tsx";
import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import ProfileSettings from "@/components/common/profile/ProfileSettings.tsx";
import { ArrowLeft } from 'lucide-react';

export default function ProfileSettingsPage() {
    const navigate = useNavigate();

    const {
        user,
        refreshUser,
    } = useUser();

    useEffect(() => {
        if (!user) {
            window.location.href = '/auth';
        }
    }, [user]);

    if(!user) {
        return null;
    }

    return (
        <>
            <Navbar />

            <main className="flex items-stretch h-screen gap-4">
                <ProfileSideColumn user={user} />

                <div className='flex-1 flex flex-col'>
                    <div id='profile-sub-header' className='flex items-center mb-4 gap-4'>

                        {/*   BUTTON TO GO BACK   */}
                        <Button
                            variant='secondary'
                            className='bg-muted hover:bg-primary active:bg-white'
                            onClick={() => navigate(-1)}>
                            <ArrowLeft /> Back
                        </Button>

                        <h2 className='page-title'>Settings</h2>
                    </div>

                    {/*   PROFILE SETTINGS   */}
                    <ProfileSettings
                        userData={user}
                        onUserDataUpdate={refreshUser}
                    />
                </div>
            </main>
        </>
    )
}