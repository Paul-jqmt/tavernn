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
import {Separator} from "@/components/ui/separator.tsx";
import {ErrorAlert} from "@/components/common/ErrorAlert.tsx";
import ClubTeamsSidePanel from "@/components/common/ClubTeamsSidePanel.tsx";
import SubheaderButton from "@/components/common/SubheaderButton.tsx";
import {Crown, Gamepad2, MessageSquareText, Plus} from "lucide-react";

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
            const owner = clubMembers.find(member => member.isOwner);
            if(owner) {
                setClubOwner(owner);
            }

            const admins = clubMembers.filter(member => member.isAdmin);
            setClubAdmins(admins);

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

            const [ clubResponse, membersResponse, teamsResponse ] = await Promise.all([
                clubService.getClub(user.club.id),
                clubService.getClubMembers(user.club.id),
                clubService.getClubTeams(user.club.id),
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

            <main className="min-h-screen flex items-stretch gap-4">
                {isLoading ? (
                    <div>Loading club information...</div>
                ) : error ? (
                    <ErrorAlert message='Please log in to continue.' />
                ) : club ? (
                    <>
                        <ClubTeamsSidePanel teams={clubTeams} userRole={userRole} />

                        <div className='flex-1 flex flex-col space-y-4'>
                            <div className='flex justify-between items-center'>
                                <div className='space-y-2'>

                                    <div className='space-y-2'>

                                        {/*   CLUB NAME   */}
                                        <h2 className='page-title'>{club.name}</h2>

                                        {/* CLUB OWNER */}
                                        <div className='flex items-center gap-2 text-sm'>
                                            <Crown className='w-4 h-4' />
                                            <p>{clubOwner?.username}</p>
                                        </div>
                                    </div>

                                </div>

                                {/*   BUTTON TO EDIT THE CLUB   */}
                                <div className='flex items-center'>
                                    { (userRole === ClubRole.OWNER) && (
                                        <Button
                                            className='bg-muted hover:bg-primary active:bg-white'
                                            variant='secondary'
                                            onClick={() => {}}
                                        >
                                            Settings
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <Separator />

                            <div className='flex flex-row gap-4'>
                                <SubheaderButton
                                    buttonText='Create Post'
                                    buttonIcon={<MessageSquareText className='w-5 h-5'/>}
                                    onClick={() => {}}
                                />

                                { (userRole === ClubRole.OWNER || userRole === ClubRole.ADMIN) && (
                                    <SubheaderButton
                                        buttonText='Add Team'
                                        buttonIcon={<Plus className='w-5 h-5' />}
                                        onClick={() => navigate('/teams/create')}
                                    />
                                )}
                            </div>

                        </div>
                    </>
                ) : null}
            </main>
        </>
    );
}