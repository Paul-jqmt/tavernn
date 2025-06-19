import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {useNavigate} from "react-router-dom";

export function ClubCard({ id, logoUrl, name, description, nrTeams, nrMembers, maxMembers, type
} : {
    id: string,
    logoUrl: string | undefined,
    name: string,
    description: string | null,
    nrTeams: number,
    nrMembers: number,
    maxMembers: number,
    type: 'open' | 'closed' | 'invite_only',
}) {
    const navigate = useNavigate();

    return (
        <Card
            key={id}
            className='flex flex-row items-center justify-between hover:bg-secondary cursor-pointer'
            onClick={() => navigate(`/clubs/${id}`)}
        >

            <CardHeader className='flex items-center gap-4 p-0 w-1/2'>

                {/*   LOGO   */}
                <Avatar className='w-12 h-12'>
                    <AvatarImage src={logoUrl} alt={`${name} logo`} />
                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>

                {/*   CLUB NAME AND DESCRIPTION   */}
                <div className='space-y-1'>
                    <CardTitle className='text-base font-bold'>{name}</CardTitle>
                    {description && (
                        <CardDescription className='text-xs font-extralight'>{description}</CardDescription>
                    )}
                </div>
            </CardHeader>

            <CardFooter className='flex w-1/2 items-center justify-between text-sm'>

                {/*   NUMBER OF TEAMS   */}
                <p>{nrTeams} Teams</p>

                {/*   NUMBER OF MEMBERS  */}
                <p>{nrMembers}/{maxMembers} Members</p>

                {/*   ADMISSION TYPE   */}
                <div className='py-2 px-4 bg-white rounded-md text-sm'>
                    {type === "open"
                        ? "Open"
                        : type === "closed"
                            ? "Closed"
                            : "Application"}
                </div>

            </CardFooter>
        </Card>
    );
}