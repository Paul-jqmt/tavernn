import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import profilePic from "@/assets/icons/profile-pic-1.svg";
import {User} from "@/types/user.ts";
import {Team} from "@/types/team.ts";
import {formatDate} from "@/lib/utils.ts";
import {Alert, AlertTitle} from "../../ui/alert.tsx";
import {AlertCircleIcon} from "lucide-react";

interface ProfileSideColumnProps {
    user: User;
}

export default function ProfileSideColumn({ user }: ProfileSideColumnProps) {
    return(
        <aside id='profile-view-column' className='w-full max-w-2xs bg-aside rounded-2xl px-4 py-5 flex flex-col gap-8'>
            { user ? (
            <>
                <div className='flex flex-col items-center text-center gap-2'>

                    {/*   PROFILE PICTURE   */}
                    <Avatar id='profile-picture' className='w-35 h-35'>
                        <AvatarImage
                            src={user.profilePicture || profilePic}
                            alt={user.username}
                        />
                        <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>

                    <h2 id='profile-username' className='text-xl font-extrabold'>{user.username}</h2>
                    <p id='profile-discord' className='text-sm font-medium'>@{user.discord || 'discord'}</p>
                </div>

                {/*   USER'S CLUB   */}
                <div>
                    <p className='text-sm px-4 py-2'>Club</p>
                    <div className='bg-card text-card-foreground rounded-lg px-4 py-2 text-sm font-semibold'>
                        {user.club ? (
                            <p>{user.club.name}</p>
                        ) : (
                            <p>No club yet</p>
                        )}
                    </div>
                </div>

                {/*   USER'S TEAMS   */}
                <div>
                    <p className='text-sm px-4 py-2'>Teams</p>
                    <div id='profile-teams-list' className='flex flex-col gap-2'>
                        {user.teams && user.teams.length > 0 ? (
                            user.teams.map((team: Team) => (
                                    <div
                                        key={team.id}
                                        className='bg-card text-card-foreground rounded-lg px-4 py-2 flex justify-between items-center'
                                    >
                                        <p className='font-semibold text-sm'>{team.name}</p>
                                        <p className='font-extralight text-xs'>{team.gameId}</p>
                                    </div>
                                )
                            )) : (
                            <div className='bg-card text-card-foreground rounded-lg px-4 py-2'>
                                <p className='font-semibold text-sm'>No teams yet</p>
                            </div>
                        )}
                    </div>
                </div>

                {/*   USER MEMBER DATE   */}
                <div id='profile-member-date' className='mt-auto text-center'>
                    <p className='text-xs font-medium'>Member since</p>
                    <p className='text-sm font-bold'>{formatDate(user.registrationDate)}</p>
                </div>
            </>
            ) : (
            <Alert variant="destructive">
                <AlertCircleIcon className="h-4 w-4" />
                <AlertTitle>'Error fetching data'</AlertTitle>
            </Alert>
            )}
        </aside>
    );
};