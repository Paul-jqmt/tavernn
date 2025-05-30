import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import profilePic from "@/assets/icons/profile-pic-1.svg";

export default function ProfileSideColumn() {
    const teamsList = [
        { id: 1, name: 'Capri-Sun', game: 'Fortnite' },
        { id: 2, name: 'Evian', game: 'Valorant' },
    ];

    return(
        <aside id='profile-view-column' className='w-full max-w-2xs bg-deep-purple rounded-2xl p-6 flex flex-col gap-6'>
            <div className='flex flex-col items-center text-center'>
                <Avatar id='profile-picture' className='mb-2 w-35 h-35'>
                    <AvatarImage src={profilePic} alt='@picture' />
                    <AvatarFallback>SD</AvatarFallback>
                </Avatar>

                <h2 id='profile-username' className='text-xl font-extrabold'>scuzedederanj</h2>
                <p id='profile-discord' className='text-sm font-medium'>@discord</p>
            </div>

            <div id='profile-club-container'>
                <p className='text-sm mb-1 ml-4'>Club</p>
                <div className='bg-mid-purple rounded-lg px-4 py-2'>
                    <p className='font-semibold'>Pro Player Paradise</p>
                </div>
            </div>

            <div id='profile-teams-container'>
                <p className='text-sm mb-2 ml-4'>Teams</p>
                <div id='profile-teams-list' className='flex flex-col gap-2'>
                    {teamsList.map((team) => (
                        <div key={team.id} className='bg-mid-purple rounded-lg px-4 py-2 flex justify-between items-center'>
                            <p className='font-semibold mb-1 text-sm'>{team.name}</p>
                            <p className='font-extralight text-xs'>{team.game}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div id='profile-member-date' className='mt-auto text-center'>
                <p className='text-xs font-medium'>Member since</p>
                <p className='text-sm'>12.05.2025</p>
            </div>
        </aside>
    );
};