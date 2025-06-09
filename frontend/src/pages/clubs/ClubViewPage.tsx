import Navbar from "@/components/common/Navbar.tsx";
import { Club } from "@/types/club.ts";
import { useEffect, useState } from "react";
import { ClubMember } from "@/types/clubMember.ts";
import ClubSideColumn from "@/components/common/club/ClubSideColumn.tsx";
import {Button} from "@/components/ui/button.tsx";
import {clubService} from "@/services/clubService.ts";
import {Team} from "@/types/team.ts";
import {useUser} from "@/contexts/UserContext.tsx";
import {ClubRole} from "@/types/clubRole.ts";
import { useParams } from "react-router-dom";
import {TeamCard} from "@/components/common/TeamCard.tsx";

export function ClubViewPage() {
    const { id } = useParams<{ id: string }>();
    const { user } = useUser();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [ club, setClub ] = useState<Club>();
    const [ clubMembers, setClubMembers ] = useState<ClubMember[]>([]);
    const [ clubTeams, setClubTeams ] = useState<Team[]>([]);
    const [ clubOwner, setClubOwner ] = useState<ClubMember>();
    const [ clubAdmins, setClubAdmins ] = useState<ClubMember[]>([]);

    const [ userRole, setUserRole ] = useState<ClubRole>(ClubRole.NON_MEMBER);

    const handleJoinClub = async () => {
        try {
            await clubService.joinClub(id);
        } catch (error) {
            console.log('Error joining club:', error);
        }
    }

    // @ts-ignore
    const handleLeaveClub = async () => {
        try {
            await clubService.leaveClub(id);
        } catch (error) {
            console.log('Error leaving club:', error);
        }
    }

    const handleCreateTeam = async () => {
        // TODO: IMPLEMENT CREATE TEAM FUNCTIONALITY
    };

    // @ts-ignore
    const handleDeleteTeam = async () => {
        // TODO: IMPLEMENT DELETE TEAM FUNCTIONALITY
    };

    // @ts-ignore
    const handleDeleteClub = async () => {
        try {
            await clubService.deleteClub(id);
            window.location.href = '/clubs';
        } catch (error) {
            console.log('Error deleting club:', error);
        }
    };

    useEffect(() => {
        if ( id )
            fetchClubData();
    }, [user]);

    const determineUserRole = (): ClubRole => {
        if ( !user ) return ClubRole.NON_MEMBER;

        const userMember = clubMembers.find(member => member.userId === user.id);

        if ( !userMember ) return ClubRole.NON_MEMBER;
        if ( userMember.isOwner ) return ClubRole.OWNER;
        if ( userMember.isAdmin ) return ClubRole.ADMIN;

        return ClubRole.MEMBER;
    };

    const fetchClubData = async () => {
        if ( !id ) return;

        try {
            setIsLoading(true);
            setError(null);

            const [ clubResponse, membersResponse, teamsResponse, ownerResponse, adminsResponse ] = await Promise.all([
                clubService.getClub(id),
                clubService.getClubMembers(id),
                clubService.getClubTeams(id),
                clubService.getClubOwner(id),
                clubService.getClubAdmins(id)
            ]);

            setClub(clubResponse);

            if (Array.isArray(membersResponse)) {
                console.log("response:", membersResponse);
                setClubMembers(membersResponse);
                console.log("members:", clubMembers);
            } else {
                setClubMembers([]);
            }

            if(Array.isArray(teamsResponse)) {
                setClubTeams(teamsResponse);
            } else {
                setClubTeams([]);
            }

            setClubOwner(ownerResponse);
            setClubAdmins(adminsResponse);

            // SETTING THE ROLE OF THE CURRENT USER
            setUserRole(determineUserRole());
            console.log(userRole);
        } catch (error) {
            console.error('Failed to fetch club data:', error);
            setError('Failed to fetch club data');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar/>

            <main className="flex items-stretch min-h-screen gap-8 p-10 text-white pt-32">
                {isLoading ? (
                    <div className='text-white'>Loading club information...</div>
                ) : error ? (
                    <div className='text-destructive'>{error}</div>
                ) : club ?
                    (
                        <>
                            <ClubSideColumn
                                logo={club.logo}
                                name={club.name}
                                owner={clubOwner}
                                admins={clubAdmins}
                                creationDate={club.creationDate}
                            />

                            <div className='flex-1 flex flex-col space-y-4'>
                                <div className='flex justify-between items-center mb-6'>
                                    <h2 className='font-extrabold text-5xl'>Teams</h2>
                                    <div className='flex gap-4 items-center'>

                                        { userRole === ClubRole.NON_MEMBER ? (
                                            // JOIN CLUB BUTTON
                                            <Button
                                                className='bg-mid-orange hover:bg-deep-orange text-white'
                                                onClick={handleJoinClub}
                                            >
                                                Join Club
                                            </Button>
                                        ) : userRole === ClubRole.ADMIN || ClubRole.OWNER ? (

                                            // CREATE TEAM BUTTON
                                            <Button
                                                className='bg-mid-orange hover:bg-deep-orange text-white'
                                                onClick={handleCreateTeam}
                                            >
                                                Create Team
                                            </Button>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                                <div className='flex-1 overflow-y-auto space-y-2 hide-scrollbar'>
                                    {clubTeams && clubTeams.length > 0 ? (
                                        clubTeams.map((team: Team) => (
                                            <TeamCard
                                                id={team.id}
                                                name={team.name}
                                                description={team.description}
                                                game={team.gameName}
                                                nrMembers={team.nrMembers}
                                                maxMembers={10}
                                                type={"open"}
                                            />
                                        ))
                                    ) : (
                                        <p> No teams available.</p>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : null}
            </main>
        </>
    );
}