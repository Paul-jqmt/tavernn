import Navbar from "@/components/common/Navbar.tsx";
import { Club } from "@/types/club.ts";
import { useEffect, useState } from "react";
import api from "@/services/api.ts";
import { ClubMember } from "@/types/clubMember.ts";
import ClubSideColumn from "@/components/common/club/ClubSideColumn.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useParams} from "react-router-dom";

export function ClubViewPage() {
    const { id } = useParams();
    const [club, setClub] = useState<Club>();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>();

    // GET THE OWNER AND THE ADMINS OF THE CLUB
    // const owner: ClubMember | undefined = club?.members.find(member => member.isOwner);
    // const admins: ClubMember[] | undefined = club?.members.filter(member => member.isAdmin);

    const owner : ClubMember = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        email: "jane.doe@example.com",
        username: "JaneDoe",
        registrationDate: "2025-05-15T10:30:00Z",
        discord: "JaneDoe#1234",
        profilePicture: "https://example.com/avatars/janedoe.png",
        openAtInvite: true,
        isOwner: false,
        isAdmin: true,
    };

    const admins: ClubMember[] = [];

    const handleJoinClub = async () => {
        try {
            await api.post(`/api/club/${id}/join`);
            fetchClubData();
        } catch (error) {
            console.log('Error joining club:', error);
        }
    }

    // TODO: CHECK IF CURRENT USER IS MEMBER OF THE CLUB
    // TODO: CHECK IF CURRENT USER IS OWNER OF THE CLUB
    // TODO: CHECK IF CURRENT USER IS ADMIN OF THE CLUB

    useEffect(() => {
        fetchClubData()
    }, [id]);

    const fetchClubData = async () => {
        try {
            setIsLoading(true);

            const res = await api.get(`/api/club/${id}`);

            if (res.status === 200) {
                setClub(res.data);
            } else {
                console.log('Error fetching data:', res.data);
                setError(res.data);
            }
        } catch (error) {
            console.error('Failed to fetch club data:', error);
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
                                owner={owner}
                                admins={admins}
                                creationDate={club.creationDate}
                            />

                            <div className='flex-1 flex flex-col space-y-4'>
                                <div className='flex justify-between items-center mb-6'>
                                    <h2 className='font-extrabold text-5xl'>Teams</h2>
                                    <div className='flex gap-4 items-center'>

                                        {/*   JOIN CLUB BUTTON   */}
                                        {/*   TODO: IF THE CURRENT USER IS A MEMBER HIDE DE BUTTON   */}
                                        <Button
                                            className='bg-mid-orange hover:bg-deep-orange text-white'
                                            onClick={handleJoinClub}
                                        >
                                            Join Club
                                        </Button>

                                        {/*   TODO: IF CURRENT USER IS ADMIN OF THE CLUB DO CREATE TEAM BUTTON   */}
                                    </div>
                                </div>
                                <div>
                                    {club.teams && club.teams.length > 0 ? (
                                        club.teams.map((team) => (
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