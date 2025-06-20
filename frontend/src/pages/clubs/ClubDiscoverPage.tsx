import Navbar from "@/components/common/Navbar.tsx";
import ProfileSideColumn from "@/components/common/profile/ProfileSideColumn.tsx";
import {useEffect, useState} from "react";
import {Club} from "@/types/club.ts";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useNavigate} from "react-router-dom";
import {ClubCard} from "@/components/common/club/ClubCard.tsx";
import {useUser} from "@/contexts/UserContext.tsx";
import {clubService} from "@/services/clubService.ts";
import {ErrorAlert} from "@/components/common/ErrorAlert.tsx";
import InformationBanner from "@/components/common/InformationBanner.tsx";

export default function ClubsDiscoverPage() {
    const [ clubs, setClubs ] = useState<Club[]>([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ searchQuery, setSearchQuery ] = useState('');
    const navigate = useNavigate();

    const {
        user,
        loading: userLoading,
        error: userError
    } = useUser();

    useEffect(() => {
        fetchClubs();
    }, [user]);

    const fetchClubs = async () => {
        try {
            setIsLoading(true);

            const res = await clubService.getClubs();

            if (Array.isArray(res)) {
                setClubs(res);
            } else {
                console.log('Unexpected response format:', res);
                setClubs([]);
            }
        } catch (error) {
            console.error('Failed to fetch clubs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredClubs = Array.isArray(clubs)
        ? clubs.filter((club: Club) => {
            if (user?.club?.id === club.id) {
                return false;
            }
            return club.name.toLowerCase().includes(searchQuery.toLowerCase());
        })
        : [];


    return (
        <>
            <Navbar />

            <main className="flex items-stretch min-h-screen gap-4">

                {userLoading ? (
                    <div>Loading user data...</div>
                ) : userError ? (
                    <ErrorAlert message='Failed to load user data. Please try again later.' />
                ) : (!user) ? (
                    <ErrorAlert message='Please log in to continue.' />
                ) : (
                    <>
                        <ProfileSideColumn user={user} />

                        <div className='flex-1 flex flex-col space-y-4'>
                            <div className='flex justify-between items-center mb-4'>
                                <h2 className='page-title'>Discover Clubs</h2>
                                <div className='flex gap-4 items-center'>

                                    {/*   FILTER BUTTON   */}
                                    {/*<Select value={filter} onValueChange={(v) => setFilter(v as any)}>*/}
                                    {/*    <SelectTrigger className='w-32'>*/}
                                    {/*        <SelectValue placeholder='Filter' />*/}
                                    {/*    </SelectTrigger>*/}

                                    {/*    <SelectContent>*/}
                                    {/*        <SelectItem value={'all'}>Filter</SelectItem>*/}
                                    {/*        <SelectItem value={'open'}>Open</SelectItem>*/}
                                    {/*        <SelectItem value={'invite_only'}>Application</SelectItem>*/}
                                    {/*    </SelectContent>*/}
                                    {/*</Select>*/}

                                    {/*   SORT BUTTON   */}
                                    {/*<Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>*/}
                                    {/*    <SelectTrigger className='w-32'>*/}
                                    {/*        <SelectValue placeholder='Sort by' />*/}
                                    {/*    </SelectTrigger>*/}
                                    {/*    <SelectContent>*/}
                                    {/*        <SelectItem value={'name'}>Name</SelectItem>*/}
                                    {/*        <SelectItem value={'members'}>Members</SelectItem>*/}
                                    {/*    </SelectContent>*/}
                                    {/*</Select>*/}

                                    {/*   CREATE CLUB BUTTON   */}
                                    { !user.club && (
                                        <Button
                                            variant='default'
                                            onClick={() => navigate('/clubs/create')}
                                        >
                                            Create Club
                                        </Button>
                                    )}

                                </div>
                            </div>

                            {/*   SEARCH BAR   */}
                            <div>
                                <Input
                                    type='search'
                                    placeholder='Search clubs...'
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className='max-w-md hover:cursor-text'
                                />
                            </div>

                            {/*   USER HAS NO CLUB BANNER   */}
                            { !user.club && (
                                <InformationBanner message='You haven’t joined a club yet. Choose your adventure' />
                            )}

                            {/*   MESSAGE IF CLUB LIST IS EMPTY   */}
                            {!isLoading && filteredClubs.length === 0 && (
                                <div className='text-center'>
                                    <p className='text-xl font-bold'>No other clubs found</p>
                                    <p className="text-sm opacity-70">
                                        {searchQuery ? 'Try different search terms' : 'Be the first to create a club!'}
                                    </p>
                                </div>
                            )}

                            {/*   LIST OF CLUBS   */}
                            { isLoading ? (
                                <p>Loading clubs...</p>
                            ) : (
                                <div className='flex-1 overflow-y-auto space-y-2 hide-scrollbar'>
                                    {filteredClubs.map((club: Club) => (
                                        <ClubCard
                                            key = {club.id}
                                            id={club.id}
                                            logoUrl={club.logo}
                                            name={club.name}
                                            description={club.description}
                                            nrTeams={0}
                                            nrMembers={club.nrMembers}
                                            maxMembers={club.maxMembers}
                                            type={club.clubType} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}


            </main>
        </>
    );
}

// {visible.map((club: Club) => (
//     <div
//         key={club.id}
//         className='flex items-center bg-deep-purple rounded-2xl p-6'
//     >
//         {/*   CLUB LOGO   */}
//         <Avatar className='h-12 w-12'>
//             <AvatarImage src={club.logo} alt={`${club.name} logo`} />
//             <AvatarFallback>{club.name.charAt(0)}</AvatarFallback>
//         </Avatar>
//
//         <div className='ml-6 flex-1'>
//             <p className='text-xl font-bold'>{club.name}</p>
//             <p>{club.description}</p>
//         </div>
//
//         <p className='whitespace-nowrap mx-6'>{club.nrTeams} Teams</p>
//         <p className='whitespace-nowrap mx-6'>{club.nrPlayers}/{club.maxPlayers} Members</p>
//
//         <Button variant='outline'>
//             {club.type === 'open' ? 'Open' : club.type === 'close' ? 'Closed' : 'Application'}
//         </Button>
//     </div>
// ))}