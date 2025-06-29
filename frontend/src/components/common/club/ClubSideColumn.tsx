import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {ClubMember} from "@/types/clubMember.ts";
import {formatDate} from "@/lib/utils.ts";
import {Club} from "@/types/club.ts";
import {AlertCircleIcon} from "lucide-react";
import {Alert, AlertTitle} from "@/components/ui/alert.tsx";

interface ClubSideColumnProps {
    club: Club | undefined;
    clubAdmins: ClubMember[];
    clubOwner?: ClubMember;
}

export default function ClubSideColumn({ club, clubAdmins, clubOwner }: ClubSideColumnProps) {
    return (
        <aside id='club-view-column' className='w-full max-w-2xs bg-aside rounded-2xl px-4 py-6 flex flex-col gap-6'>
            { club ? (
                <>
                    <div className='flex flex-col items-center'>

                        {/*   CLUB LOGO   */}
                        <Avatar id='club-picture' className='w-35 h-35'>
                            <AvatarImage src={club.logo} alt={`${club.name} logo`} />
                            <AvatarFallback>{club.name?.charAt(0)}</AvatarFallback>
                        </Avatar>

                    </div>

                    {/*   CLUB OWNER   */}
                    <div>
                        <p className='text-sm px-4 py-2'>Owner</p>
                        <div className='bg-card text-card-foreground rounded-lg px-4 py-2 text-sm font-semibold'>
                            <p className='font-semibold'>{ clubOwner?.username || 'No data' }</p>
                        </div>
                    </div>

                    {/*   CLUB ADMINS   */}
                    <div>
                        <p className='text-sm px-4 py-2'>Admins</p>
                        <div className='flex flex-col gap-2'>
                            {clubAdmins.length > 0 ? (
                                clubAdmins.map((admin: ClubMember) => (
                                    <div key={admin.userId}
                                         className='bg-card text-card-foreground rounded-lg px-4 py-2'>
                                        <p className='font-semibold mb-1 text-sm'>{admin.username}</p>
                                    </div>
                                ))
                            ) : (
                                <div className='bg-card text-card-foreground rounded-lg px-4 py-2'>
                                    <p className='text-sm'>No admins</p>
                                </div>
                            )}

                        </div>
                    </div>

                    {/*   CREATION DATE   */}
                    <div className='mt-auto text-center'>
                        <p className='text-xs font-medium'>Together since</p>
                        <p className='text-sm'>{formatDate(club.creationDate)}</p>
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
}