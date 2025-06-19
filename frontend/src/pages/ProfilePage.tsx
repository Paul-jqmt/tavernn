import Navbar from "@/components/common/Navbar.tsx";
import {Button} from "@/components/ui/button.tsx";
import ProfileSideColumn from "@/components/common/profile/ProfileSideColumn.tsx";
import ProfileGameList from "@/components/common/profile/ProfileGameList.tsx";
import {useEffect, useState} from "react";
import {useUser} from "@/contexts/UserContext.tsx";
import {useNavigate} from "react-router-dom";
import SubheaderButton from "@/components/common/SubheaderButton.tsx";
import {Gamepad2, MessageSquareText} from "lucide-react";
import ProfilePostList from "@/components/common/profile/ProfilePostList.tsx";

export default function ProfilePage(){
    const navigate = useNavigate();
    const [ activeTab, setActiveTab ] = useState<'games' | 'posts'>('posts');

    const {
        user,
        refreshUser,
    } = useUser();

    useEffect(() => {
        if (!user) {
            navigate('/auth', {replace: true });
        }
    }, [user]);

    if(!user) {
        return null;
    }

    return (
        <>
            <Navbar/>

            <main className="flex items-stretch min-h-screen gap-4">

                <ProfileSideColumn user={user}/>

                {/*   MAIN CONTENT AREA   */}
                <div className='flex-1 flex flex-col space-y-4'>

                    {/*   PROFILE PAGE SUBHEADER   */}
                    <div id='profile-sub-header' className='flex justify-between items-center'>

                        <h2 className='page-title'>Profile</h2>

                        {/*   BUTTON TO GO TO SETTINGS   */}
                        <Button
                            variant='secondary'
                            className='bg-muted hover:bg-primary active:bg-white'
                            onClick={() => navigate('/profile/settings')}>
                            Settings
                        </Button>
                    </div>

                    <div className='flex gap-4'>
                        <SubheaderButton
                            buttonText='My games'
                            buttonIcon={<Gamepad2 className='w-5 h-5'/>}
                            onClick={() => setActiveTab('games')}
                        />

                        <SubheaderButton
                            buttonText='My posts'
                            buttonIcon={<MessageSquareText className='w-5 h-5'/>}
                            onClick={() => setActiveTab('posts')}
                        />
                    </div>


                    {/*   USER ACTIVITY   */}
                    { activeTab === 'posts' &&  (
                        <div className='w-1/2 flex-1 overflow-hidden'>
                            <ProfilePostList />
                        </div>
                    )}

                    {/*   PROFILE PAGE USER GAME LIST   */}
                    { activeTab === 'games' && (
                        <div id='profile-main-frame' className='w-1/2 flex-1 overflow-hidden'>
                            <ProfileGameList
                                userId={user.id}
                                onGameListUpdate={refreshUser}
                            />
                        </div>
                    )}

                </div>
            </main>
        </>
    );
}