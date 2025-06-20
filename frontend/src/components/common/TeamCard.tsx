import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useNavigate} from "react-router-dom";

export function TeamCard({ id, name, nrMembers, maxMembers, type
                         } : {
    id: string,
    name: string,
    nrMembers: number,
    maxMembers: number,
    type: 'open' | 'closed' | 'invite_only',
}) {
    const navigate = useNavigate();

    return (
        <div
            key={id}
            className='flex flex-row items-center justify-between bg-foreground text-white px-6 py-3 rounded-xl hover:bg-primary cursor-pointer'
            onClick={() => navigate(`/clubs/${id}`)}
        >

            {/*   LOGO AND NAME   */}
            <p className='text-base font-bold'>{name}</p>

            {/*   GAME AND MEMBERS   */}
            <div className='flex items-center text-sm'>
                <p className='text-xs'>{nrMembers}/{maxMembers} Members</p>
            </div>

            {/*   ADMISSION TYPE   */}
            <div>
                {type === "open"
                    ? "Open"
                    : type === "closed"
                        ? "Closed"
                        : "Application"}
            </div>
        </div>
    );
}