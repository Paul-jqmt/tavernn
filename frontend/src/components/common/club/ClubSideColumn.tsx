import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {ClubMember} from "@/types/clubMember.ts";
import {formatDate} from "@/lib/utils.ts";

export default function ClubSideColumn({
    logo,
    name,
    owner,
    admins,
    creationDate
} : {
    logo: string | undefined;
    name: string;
    owner: ClubMember | undefined;
    admins: ClubMember[] | undefined;
    creationDate: string | undefined;
}) {
    return (
        <aside id='club-view-column' className='w-full max-w-2xs bg-aside rounded-2xl px-4 py-6 flex flex-col gap-6'>

            {/*   CLUB LOGO   */}
            <div className='flex flex-col items-center text-center gap-2'>
                <Avatar id='club-picture' className='w-35 h-35'>
                    <AvatarImage src={logo} alt={`${name} logo`} />
                    <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
                </Avatar>

                <h3>{name}</h3>
            </div>

            {/*   CLUB OWNER   */}
            <div className='px-4 py-2 bg-card-2 rounded-lg'>
                <p className='text-sm mb-2'>Owner</p>
                <p className='font-semibold'>{owner?.username}</p>
            </div>

            {/*   CLUB ADMINS   */}
            <div className='px-4 py-2 bg-card-2 rounded-lg'>
                <p className='text-sm mb-2'>Admins</p>
                <div className='flex flex-col gap-2'>
                    {admins?.map((admin: ClubMember) => (
                        <p key={admin.userId} className='font-semibold mb-1 text-sm'>{admin.username}</p>
                    ))}
                </div>
            </div>

            {/*   CREATION DATE   */}
            <div className='mt-auto text-center'>
                <p className='text-xs font-medium'>Together since</p>
                <p className='text-sm'>{formatDate(creationDate)}</p>
            </div>
        </aside>
    );
}