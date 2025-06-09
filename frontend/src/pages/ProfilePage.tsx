import Navbar from "@/components/common/Navbar.tsx";
import {Button} from "@/components/ui/button.tsx";
import ProfileSideColumn from "@/components/common/profile/ProfileSideColumn.tsx";
import ProfileGameList from "@/components/common/profile/ProfileGameList.tsx";
import {useEffect, useState} from "react";
import ProfileSettings from "@/components/common/profile/ProfileSettings.tsx";
import {useUser} from "@/contexts/UserContext.tsx";
import {useNavigate} from "react-router-dom";

export default function ProfilePage(){
    const [ activeTab, setActiveTab ] = useState<'games' | 'settings' | 'notifications'>('games');
    const navigate = useNavigate();

    const {
        user,
        refreshUser,
    } = useUser();

    useEffect(() => {
        if (!user) {
            navigate('/auth', { replace: true });
        }
    }, [user]);

    if(!user) {
        return null;
    }

    return (
        <>
            <Navbar />

            <main className="flex items-stretch min-h-screen gap-4 text-white">

                <ProfileSideColumn userId={user.id} />

                {/*   MAIN CONTENT AREA   */}
                <div className='flex-1 flex flex-col'>
                    <div id='profile-sub-header' className='flex justify-between items-center mb-3'>
                        <h1 className='text-3xl font-extrabold'>Profile</h1>
                        <div className='flex gap-3'>

                            {/*   NOTIFICATIONS BUTTON    */}
                            <Button
                                variant={activeTab === 'notifications' ? 'ghost' : 'secondary'}
                                onClick={() => setActiveTab('notifications')}>
                                Notifications
                            </Button>

                            {/*   GAMES BUTTON   */}
                            <Button
                                variant={activeTab === 'games' ? 'ghost' : 'secondary'}
                                onClick={() => setActiveTab('games')}>
                                Games
                            </Button>

                            {/*   SETTINGS BUTTON   */}
                            <Button
                                variant={activeTab === 'settings' ? 'ghost' : 'secondary'}
                                onClick={() => setActiveTab('settings')}>
                                Settings
                            </Button>
                        </div>
                    </div>

                    <div id='profile-main-frame' className='bg-deep-purple rounded-2xl w-full p-6 flex-1 overflow-hidden'>

                        {/*   USER GAME LIST TAB   */}
                        {activeTab === 'games' && (
                            <ProfileGameList
                                userId={user.id}
                                onGameListUpdate={refreshUser}
                            />
                        )}

                        {/*   USER SETTINGS TAB   */}
                        {activeTab === 'settings' && (
                            <ProfileSettings
                                userData={user}
                                onUserDataUpdate={refreshUser}
                            />
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}