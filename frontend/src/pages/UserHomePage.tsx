import Navbar from "@/components/common/Navbar.tsx";
import {ArrowRight, Pen} from "lucide-react";
import {useNavigate} from "react-router-dom";
import ProfileSideColumn from "@/components/common/profile/ProfileSideColumn.tsx";
import {useUser} from "@/contexts/UserContext.tsx";
import {useEffect} from "react";
import SubheaderButton from "@/components/common/SubheaderButton.tsx";

export default function UserHomePage() {
    const navigate = useNavigate();
    const {
        user,
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
            <Navbar />

            <main className="flex items-stretch min-h-screen gap-4">
                <ProfileSideColumn user={user} />

                <div className='flex-1 flex flex-col space-y-4'>
                    <h2 className='page-title'>Latest News</h2>

                    <div className='flex gap-4'>

                        {/*   BUTTON TO GO TO DISCOVER CLUBS PAGE*/}
                        <SubheaderButton
                            buttonText='Discover Clubs'
                            buttonIcon={<ArrowRight className='h-5 w-5' />}
                            onClick={() => navigate('/clubs')}
                        />

                        {/*   BUTTON TO WRITE A PUBLIC POST   */}
                        <SubheaderButton
                            buttonText='Write a post'
                            buttonIcon={<Pen className='h-5 w-5' />}
                        />
                    </div>

                </div>
            </main>
        </>
    )
}