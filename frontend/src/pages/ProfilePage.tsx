import Navbar from "@/components/common/Navbar.tsx";
import {Button} from "@/components/ui/button.tsx";
import ProfileSideColumn from "@/components/common/profile/ProfileSideColumn.tsx";
import ProfileGameList from "@/components/common/profile/ProfileGameList.tsx";
import {useEffect, useState} from "react";
import ProfileSettings from "@/components/common/profile/ProfileSettings.tsx";
import {useUser} from "@/contexts/UserContext.tsx";
import {useNavigate} from "react-router-dom";
import ProfileNotifications from "@/components/common/profile/ProfileNotifications.tsx";

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

            <main className="flex items-stretch min-h-screen gap-4">

                <ProfileSideColumn userId={user.id} />

                {/*   MAIN CONTENT AREA   */}
                <div className='flex-1 flex flex-col'>
                    <div id='profile-sub-header' className='flex justify-between items-center mb-3'>
                        <h2 className='page-title'>Profile</h2>

                        {/*   PROFILE SECTION BUTTONS   */}
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

                    {/*   PROFILE SECTIONS DISPLAY   */}
                    <div id='profile-main-frame' className='bg-primary rounded-2xl w-full p-4 flex-1 overflow-hidden'>

                        {/*   USER NOTIFICATIONS TAB   */}
                        {activeTab === 'notifications' && (
                            <ProfileNotifications />
                        )}

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