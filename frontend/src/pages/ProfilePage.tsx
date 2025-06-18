import Navbar from "@/components/common/Navbar.tsx";
import {Button} from "@/components/ui/button.tsx";
import ProfileSideColumn from "@/components/common/profile/ProfileSideColumn.tsx";
import ProfileGameList from "@/components/common/profile/ProfileGameList.tsx";
import {useEffect} from "react";
import {useUser} from "@/contexts/UserContext.tsx";
import {useNavigate} from "react-router-dom";

export default function ProfilePage(){
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

            <main className="flex items-stretch min-h-screen gap-4">

                <ProfileSideColumn user={user} />

                {/*   MAIN CONTENT AREA   */}
                <div className='flex-1 flex flex-col'>

                    {/*   PROFILE PAGE SUBHEADER   */}
                    <div id='profile-sub-header' className='flex justify-between items-center mb-3'>

                        <h2 className='page-title'>Profile</h2>

                        {/*   BUTTON TO GO TO SETTINGS   */}
                        <Button
                            variant='secondary'
                                className='bg-muted hover:bg-primary active:bg-white'
                            onClick={() => navigate('/profile/settings')}>
                            Settings
                        </Button>
                    </div>

                    {/*   PROFILE PAGE USER GAME LIST   */}
                    <div id='profile-main-frame' className='w-1/2 flex-1 overflow-hidden'>
                        <ProfileGameList
                            userId={user.id}
                            onGameListUpdate={refreshUser}
                        />
                    </div>
                </div>
            </main>
        </>
    );
}