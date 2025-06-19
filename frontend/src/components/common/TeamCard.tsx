import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useNavigate} from "react-router-dom";

export function TeamCard({ id, name, description, game, nrMembers, maxMembers, type
                         } : {
    id: string,
    name: string,
    description: string | undefined,
    game: string;
    nrMembers: number,
    maxMembers: number,
    type: 'open' | 'closed' | 'invite_only',
}) {
    const navigate = useNavigate();

    return (
        <Card
            key={id}
            className='flex flex-row items-center justify-between hover:bg-primary cursor-pointer'
            onClick={() => navigate(`/clubs/${id}`)}
        >

            {/*   LOGO AND NAME   */}
            <CardHeader className='flex items-center gap-4 p-0 w-1/2'>
                <div className='space-y-1'>
                    <CardTitle className='text-base font-bold'>{name}</CardTitle>
                    {description && (
                        <CardDescription className='text-xs font-extralight'>{description}</CardDescription>
                    )}
                </div>
            </CardHeader>

            {/*   GAME AND MEMBERS   */}
            <div className='flex items-center gap-10 text-sm'>
                <p>{game}</p>
                <p>{nrMembers}/{maxMembers} Members</p>
            </div>

            {/*   ADMISSION TYPE   */}
            <CardFooter className='py-2 px-4 bg-white text-primary rounded-md text-sm'>
                {type === "open"
                    ? "Open"
                    : type === "closed"
                        ? "Closed"
                        : "Application"}
            </CardFooter>
        </Card>
    );
}