import Navbar from "@/components/common/Navbar.tsx";
import {ArrowRight, Pen} from "lucide-react";
import {useNavigate} from "react-router-dom";
import ProfileSideColumn from "@/components/common/profile/ProfileSideColumn.tsx";
import {useUser} from "@/contexts/UserContext.tsx";
import {useEffect} from "react";
import {Button} from "@/components/ui/button.tsx";

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
                        <Button
                            variant='default'
                            className='w-xs bg-foreground text-white hover:bg-secondary active:bg-primary'
                            onClick={() => navigate('/clubs')}
                        >
                            Discover Clubs
                            <ArrowRight className='h-5 w-5' />
                        </Button>

                        <Button
                            variant='default'
                            className='w-xs bg-foreground text-white hover:bg-secondary active:bg-primary'
                            onClick={() => {}}
                        >
                            Write a Post
                            <Pen className='h-5 w-5' />
                        </Button>
                    </div>

                </div>
            </main>
        </>
    )
}