import Navbar from "@/components/common/Navbar.tsx";
import {Club} from "@/types/club.ts";
import {useEffect, useState} from "react";
import ClubSideColumn from "@/components/common/club/ClubSideColumn.tsx";
import {Button} from "@/components/ui/button.tsx";
import {clubService} from "@/services/clubService.ts";
import {Team} from "@/types/team.ts";
import {useNavigate, useParams} from "react-router-dom";
import {TeamCard} from "@/components/common/TeamCard.tsx";
import {ArrowLeft} from "lucide-react";
import {ErrorAlert} from "@/components/common/ErrorAlert.tsx";
import {ClubMember} from "@/types/clubMember.ts";

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
        if ( !id ) return;

        try {
            await clubService.joinClub(id);
            await fetchClubData();
        } catch (error) {
            console.log('Error joining club:', error);
        }
    }

    useEffect(() => {
        if ( id )
            fetchClubData();
    }, [id]);

    useEffect(() => {
        if (club && clubMembers.length > 0) {
            const owner = clubMembers.find(member => member.isOwner);
            if(owner) {
                setClubOwner(owner);
            }

            const admins = clubMembers.filter(member => member.isAdmin && member.userId !== owner?.userId);
            setClubAdmins(admins);
        }
    }, [clubMembers, club]);

    const fetchClubData = async () => {
        if ( !id ) return;

        try {
            setIsLoading(true);
            setError(null);

            const [ clubResponse, membersResponse, teamsResponse ] = await Promise.all([
                clubService.getClub(id),
                clubService.getClubMembers(id),
                clubService.getClubTeams(id),
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
                            <ClubSideColumn club={club} clubOwner={clubOwner} clubAdmins={clubAdmins} />

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

                                        {/*   CLUB NAME   */}
                                        <h2 className='page-title'>{club.name}</h2>
                                    </div>

                                    {/*   JOIN CLUB BUTTON   */}
                                    <Button onClick={handleJoinClub}>
                                        Join Club
                                    </Button>
                                </div>

                                {/*   CLUB TEAMS LIST   */}
                                <div className='space-y-4'>
                                    <h3 className='text-xl font-semibold'>Teams</h3>

                                    <div className='flex-1 overflow-y-auto space-y-2 hide-scrollbar'>
                                        { clubTeams && clubTeams.length > 0 ? (
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
                                            <div className='flex flex-col items-center justify-center p-4 bg-muted rounded-lg text-center'>
                                                <p className='text-lg font-medium mb-2'>No Teams Yet</p>
                                                <p className='text-sm text-muted-foreground font-light'>
                                                    This club hasn't created any teams yet.
                                                </p>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </>
                    ) : null}
            </main>
        </>
    );
}