import Navbar from "@/components/common/Navbar.tsx";
import { Club } from "@/types/club.ts";
import { useEffect, useState } from "react";
import { ClubMember } from "@/types/clubMember.ts";
import ClubSideColumn from "@/components/common/club/ClubSideColumn.tsx";
import {Button} from "@/components/ui/button.tsx";
import {clubService} from "@/services/clubService.ts";
import {Team} from "@/types/team.ts";
import {useNavigate, useParams} from "react-router-dom";
import {TeamCard} from "@/components/common/TeamCard.tsx";
import {AlertCircleIcon, ArrowLeft} from "lucide-react";
import {Alert, AlertTitle} from "@/components/ui/alert.tsx";
import {ErrorAlert} from "@/components/common/ErrorAlert.tsx";

export function ClubDiscoverDetailsPage() {
    const { id } = useParams<{ id: string }>();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const [ club, setClub ] = useState<Club>();
    const [ clubMembers, setClubMembers ] = useState<ClubMember[]>([]);
    const [ clubTeams, setClubTeams ] = useState<Team[]>([]);
    const [ clubOwner, setClubOwner ] = useState<ClubMember>();
    const [ clubAdmins, setClubAdmins ] = useState<ClubMember[]>([]);

    const handleJoinClub = async () => {
        try {
            await clubService.joinClub(id);
        } catch (error) {
            console.log('Error joining club:', error);
        }
    }

    useEffect(() => {
        if ( id )
            fetchClubData();
    }, [id]);

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
                setClubMembers(membersResponse);
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
                    <ErrorAlert message={error} />
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
                                <div className='flex justify-between items-center'>
                                    <div className='flex items-center gap-4'>

                                        {/*   BACK BUTTON   */}
                                        <Button
                                            variant='default'
                                            className='bg-muted hover:bg-primary active:bg-white'
                                            onClick={() => navigate(-1)}
                                        >
                                            <ArrowLeft className='h-5 w-5' /> Back
                                        </Button>

                                        <h2 className='page-title'>Teams</h2>
                                    </div>

                                    {/*   JOIN CLUB BUTTON   */}
                                    <Button onClick={handleJoinClub}>
                                        Join Club
                                    </Button>
                                </div>

                                {/*   CLUB TEAMS LIST   */}
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