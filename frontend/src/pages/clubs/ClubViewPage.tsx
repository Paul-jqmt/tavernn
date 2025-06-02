import Navbar from "@/components/common/Navbar.tsx";
import { Club } from "@/types/club.ts";
import { useEffect, useState } from "react";
import api from "@/services/api.ts";
import { ClubMember } from "@/types/clubMember.ts";
import ClubSideColumn from "@/components/common/club/ClubSideColumn.tsx";
import {Button} from "@/components/ui/button.tsx";
import {clubService} from "@/services/clubService.ts";
import {Team} from "@/types/team.ts";
import {useUser} from "@/contexts/UserContext.tsx";
import {ClubRole} from "@/types/clubRole.ts";
import { useParams } from "react-router-dom";

export function ClubViewPage() {
    const { id } = useParams<{ id: string }>();
    const [club, setClub] = useState<Club>();
    const [ clubMembers, setClubMembers ] = useState<ClubMember[]>([]);
    const [ clubTeams, setClubTeams ] = useState<Team[]>([]);
    const [ clubOwner, setClubOwner ] = useState<ClubMember>();
    const [ clubAdmins, setClubAdmins ] = useState<ClubMember[]>([]);

    const [ userRole, setUserRole ] = useState<ClubRole>(ClubRole.NON_MEMBER);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { user } = useUser();

    const handleJoinClub = async () => {
        try {
            await api.post(`/api/club/${id}/join`);
            fetchClubData();
        } catch (error) {
            console.log('Error joining club:', error);
        }
    }

    const handleLeaveClub = async () => {
        try {
            await api.post(`/api/club/${id}/leave`);
            fetchClubData();
        } catch (error) {
            console.log('Error leaving club:', error);
        }
    }

    // TODO: IMPLEMENT CREATE TEAM FUNCTIONALITY
    const handleCreateTeam = async () => {};

    // TODO: IMPLEMENT DELETE TEAM FUNCTIONALITY
    const handleDeleteTeam = async () => {};

    const handleDeleteClub = async () => {
        try {
            await api.delete(`/api/club/${id}`);
            window.location.href = '/clubs';
        } catch (error) {
            console.log('Error deleting club:', error);
        }
    };

    useEffect(() => {
        if ( id ) fetchClubData();
    }, [id]);

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

            const [ clubResponse, membersRespose, teamsResponse, ownerResponse, adminsResponse ] = await Promise.all([
                clubService.getClub(id),
                clubService.getClubMembers(id),
                clubService.getClubTeams(id),
                clubService.getClubOwner(id),
                clubService.getClubAdmins(id)
            ]);

            setClub(clubResponse);
            setClubMembers(membersRespose);
            setClubTeams(teamsResponse);
            setClubOwner(ownerResponse);
            setClubAdmins(adminsResponse);

            // SETTING THE ROLE OF THE CURRENT USER
            setUserRole(determineUserRole());
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
                                description={club.description}
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
                                <div>
                                    {clubTeams && clubTeams.length > 0 ? (
                                        clubTeams.map((team) => (
                                            <div key={team.id}>
                                                <p>{team.name}</p>
                                            </div>
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