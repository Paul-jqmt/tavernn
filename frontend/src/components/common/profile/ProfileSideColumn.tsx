import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import profilePic from "@/assets/icons/profile-pic-1.svg";
import {useEffect, useState} from "react";
import {User} from "@/types/user.ts";
import {Team} from "@/types/team.ts";
import {formatDate} from "@/lib/utils.ts";
import {Club} from "@/types/club.ts";
import {userService} from "@/services/userService.ts";
import {Alert, AlertTitle} from "../../ui/alert.tsx";
import {AlertCircleIcon} from "lucide-react";

interface ProfileSideColumnProps {
    userId: string;
}

export default function ProfileSideColumn({ userId }: ProfileSideColumnProps) {
    const [ userData, setUserData ] = useState<User | null>(null);
    const [ userClub, setUserClub ] = useState<Club[]>([]);
    const [ userTeams, setUserTeams ] = useState<Team[]>([]);

    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    const fetchUserData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const [userProfile, userClub, userTeams] = await Promise.all([
                userService.getUserProfile(userId),
                userService.getUserClub(userId),
                userService.getUserTeams(userId)
            ]);

            setUserData(userProfile);
            setUserClub(userClub);
            console.log(userClub);
            setUserTeams(userTeams);
        } catch (error) {
            console.log('Error fetching user data:', error);
            setError('Error fetching user data');
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <aside id='profile-view-column' className='w-full max-w-2xs bg-deep-purple rounded-2xl p-6 flex flex-col gap-6'>
            { isLoading ? (
                <p>Loading...</p>
            ) : userData ? (
                <>
                    <div className='flex flex-col items-center text-center'>
                        <Avatar id='profile-picture' className='mb-2 w-35 h-35'>
                            <AvatarImage
                                src={userData.profilePicture || profilePic}
                                alt={userData.username}
                            />
                            <AvatarFallback>{userData.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>

                        <h2 id='profile-username' className='text-xl font-extrabold'>{userData.username}</h2>
                        <p id='profile-discord' className='text-sm font-medium'>@{userData.discord || 'discord'}</p>
                    </div>

                    {/*   USER CLUB   */}
                    <div>
                        <p className='text-sm mb-1 ml-4'>Club</p>
                        <div className='bg-mid-purple rounded-lg px-4 py-2'>
                            {userClub.length > 0 ? (
                                <p className='font-semibold'>{userClub[0].name}</p>
                            ) : (
                                <p className='font-semibold'>No club yet</p>
                            )}
                        </div>
                    </div>

                    {/*   USER TEAMS   */}
                    <div>
                        <p className='text-sm mb-2 ml-4'>Teams</p>
                        <div id='profile-teams-list' className='flex flex-col gap-2'>
                            {userTeams && userTeams.length > 0 ? (
                                userTeams.map((team: Team) => (
                                        <div
                                            key={team.id}
                                            className='bg-mid-purple rounded-lg px-4 py-2 flex justify-between items-center'
                                        >
                                            <p className='font-semibold text-sm'>{team.name}</p>
                                            <p className='font-extralight text-xs'>{team.game}</p>
                                        </div>
                                    )
                                )) : (
                                <div className='bg-mid-purple rounded-lg px-4 py-2'>
                                    <p className='font-semibold text-sm'>No teams yet</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/*   USER MEMBER DATE   */}
                    <div id='profile-member-date' className='mt-auto text-center'>
                        <p className='text-xs font-medium'>Member since</p>
                        <p className='text-sm'>{formatDate(userData.registrationDate)}</p>
                    </div>
                </>
            ) : (
                <Alert variant="destructive">
                    <AlertCircleIcon className="h-4 w-4" />
                    <AlertTitle>{error}</AlertTitle>
                </Alert>

            )}
        </aside>
    );
};