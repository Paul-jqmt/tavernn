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
        <aside id='club-view-column' className='w-full max-w-2xs bg-deep-purple rounded-2xl p-6 flex flex-col gap-6'>
            <div className='flex flex-col items-center text-center'>
                <Avatar id='club-picture' className='mb-2 w-35 h-35'>
                    <AvatarImage src={logo} alt={`${name} logo`} />
                    <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
                </Avatar>

                <h2 className='text-xl font-extrabold'>{name}</h2>
            </div>

            {/*   CLUB OWNER   */}
            <div>
                <p className='text-sm mb-1 ml-4'>Owner</p>
                <div className='bg-mid-purple rounded-lg px-4 py-2'>
                    <p className='font-semibold'>{owner?.username}</p>
                </div>
            </div>

            {/*   CLUB ADMINS   */}
            <div>
                <p className='text-sm mb-2 ml-4'>Admins</p>
                <div className='flex flex-col gap-2'>
                    {admins?.map((admin: ClubMember) => (
                        <div key={admin.userId} className='bg-mid-purple rounded-lg px-4 py-2 flex justify-between items-center'>
                            <p className='font-semibold mb-1 text-sm'>{admin.username}</p>
                        </div>
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