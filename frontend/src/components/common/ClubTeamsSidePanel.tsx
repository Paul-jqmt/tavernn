import {Team} from "@/types/team.ts";
import {ClubRole} from "@/types/clubRole.ts";
import {TeamCard} from "@/components/common/TeamCard.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";

interface ClubTeamsSidePanelProps {
    teams: Team[];
    userRole: ClubRole;
}

export default function ClubTeamsSidePanel({ teams, userRole }: ClubTeamsSidePanelProps) {
    const navigate = useNavigate();

    return (
        <aside className='w-full max-w-1/4 bg-aside rounded-2xl px-4 py-6 flex flex-col gap-6'>
            <div className='space-y-2'>
                <p className='font-semibold'>Teams</p>

                {teams && teams.length > 0 ? (
                    teams.map((team: Team) => (
                        <TeamCard
                            key={team.id}
                            id={team.id}
                            name={team.name}
                            description={team.description}
                            game={team.gameId}
                            nrMembers={team.nrMembers}
                            maxMembers={10}
                            type={"open"}
                        />
                    ))
                ) : (
                    <div
                        className='bg-card text-card-foreground rounded-lg px-4 py-2 space-y-2'>
                        { userRole === ClubRole.ADMIN || userRole === ClubRole.OWNER ? (
                            <>
                                <p className='text-sm'>Time to Build Your First Team!</p>
                                <p className='text-xs font-light'>
                                    Start your journey by creating the first team for this club.
                                </p>
                            </>
                        ) : (
                            <>
                                <p className='text-lg font-medium mb-2'>No Teams Yet</p>
                                <p className='text-xs font-light'>
                                    This club hasn't created any teams yet.
                                </p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </aside>
    )
}