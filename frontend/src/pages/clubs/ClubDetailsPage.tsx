import Navbar from "@/components/common/Navbar.tsx";
import {Club} from "@/types/club.ts";
import {useEffect, useState} from "react";
import {ClubMember} from "@/types/clubMember.ts";
import {Button} from "@/components/ui/button.tsx";
import {clubService} from "@/services/clubService.ts";
import {Team} from "@/types/team.ts";
import {useUser} from "@/contexts/UserContext.tsx";
import {ClubRole} from "@/types/clubRole.ts";
import {useNavigate} from "react-router-dom";
import {TeamCard} from "@/components/common/TeamCard.tsx";

export function ClubDetailsPage() {
    const { user } = useUser();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const [ club, setClub ] = useState<Club>();
    const [ clubMembers, setClubMembers ] = useState<ClubMember[]>([]);
    const [ clubTeams, setClubTeams ] = useState<Team[]>([]);
    const [ clubOwner, setClubOwner ] = useState<ClubMember>();
    const [ clubAdmins, setClubAdmins ] = useState<ClubMember[]>([]);

    const [ userRole, setUserRole ] = useState<ClubRole>(ClubRole.NON_MEMBER);

    const handleLeaveClub = async () => {
        try {
            await clubService.leaveClub(user?.club?.id);
        } catch (error) {
            console.log('Error leaving club:', error);
        }
    }

    const handleCreateTeam = async () => {
        // TODO: IMPLEMENT CREATE TEAM FUNCTIONALITY
    };

    const handleDeleteTeam = async () => {
        // TODO: IMPLEMENT DELETE TEAM FUNCTIONALITY
    };

    const handleDeleteClub = async () => {
        try {
            await clubService.deleteClub(user?.club?.id);
            window.location.href = '/clubs';
        } catch (error) {
            console.log('Error deleting club:', error);
        }
    };

    useEffect(() => {
        if (user?.club?.id) {
            fetchClubData();
        }
    }, [user?.club?.id]);

    useEffect(() => {
        if ( user && clubMembers.length > 0 ) {
            const role = determineUserRole();
            setUserRole(role);
        }
    }, [clubMembers, user]);

    const determineUserRole = (): ClubRole => {
        if ( !user ) return ClubRole.NON_MEMBER;

        const userMember = clubMembers.find(member => member.userId === user.id);

        if ( !userMember ) return ClubRole.NON_MEMBER;
        if ( userMember.isOwner ) return ClubRole.OWNER;
        if ( userMember.isAdmin ) return ClubRole.ADMIN;

        return ClubRole.MEMBER;
    };

    const fetchClubData = async () => {
        if ( !user?.club?.id ) return;

        try {
            setIsLoading(true);
            setError(null);

            const [ clubResponse, membersResponse, teamsResponse, ownerResponse, adminsResponse ] = await Promise.all([
                clubService.getClub(user.club.id),
                clubService.getClubMembers(user.club.id),
                clubService.getClubTeams(user.club.id),
                clubService.getClubOwner(user.club.id),
                clubService.getClubAdmins(user.club.id)
            ]);

            setClub(clubResponse);

            if (Array.isArray(membersResponse)) {
                setClubMembers(membersResponse);
            } else {
                setClubMembers([]);
            }

            if (Array.isArray(teamsResponse)) {
                setClubTeams(teamsResponse);
            } else {
                setClubTeams([]);
            }

            setClubOwner(ownerResponse);
            setClubAdmins(adminsResponse);
        } catch (error) {
            console.error('Failed to fetch club data:', error);
            setError('Failed to fetch club data');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <main className="flex items-stretch min-h-screen gap-4">
                {isLoading ? (
                    <div>Loading club information...</div>
                ) : error ? (
                    <div className='text-destructive'>{error}</div>
                ) : club ? (
                    <div className='flex-1 flex flex-col space-y-4'>
                        <div className='flex justify-between items-center'>
                            <h2 className='page-title'>{club.name}</h2>

                            <div className='flex gap-4 items-center'>


                                {/*   CREATE TEAM BUTTON   */}
                                { (userRole === ClubRole.ADMIN || userRole === ClubRole.OWNER) && (
                                    <Button
                                        variant='default'
                                        onClick={() => navigate('/teams/create')}
                                    >
                                        Create Team
                                    </Button>
                                )}

                            </div>
                        </div>

                        <h3 className='sub-title'>Teams</h3>
                        <div className='flex-1 overflow-y-auto space-y-2 hide-scrollbar'>
                            {clubTeams && clubTeams.length > 0 ? (
                                clubTeams.map((team: Team) => (
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
                                <p> No teams available.</p>
                            )}
                        </div>
                    </div>) : null}
            </main>
        </>
    );
}