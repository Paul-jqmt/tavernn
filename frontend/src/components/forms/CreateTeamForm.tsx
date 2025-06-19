import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {createTeamSchema, CreateTeamValues} from "@/schemas/createTeamSchema.ts";
import {ClubMember} from "@/types/clubMember.ts";
import {teamService} from "@/services/teamService.ts";
import axios from "axios";
import {Alert, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircleIcon} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Game} from "@/types/game.ts";
import api from "@/services/api.ts";
import {clubService} from "@/services/clubService.ts";
import {useUser} from "@/contexts/UserContext.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import CharacterCounter from "@/components/common/CharacterCounter.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";

export function CreateTeamForm() {
    const { user } = useUser();
    const navigate = useNavigate();

    const [ owner, setOwner ] = useState<ClubMember[]>([])
    const [ error, setError ] = useState<string | null>(null);
    const [ games, setGames ] = useState<Game[]>([]);

    const form = useForm<CreateTeamValues>({
        resolver: zodResolver(createTeamSchema),
        defaultValues: {
            teamName: '',
            gameId: '',
            description: '',
            admissionType: 'open',
            becomeCaptain: true,
            captainId: '',
        },
    });

    useEffect(() => {
        fetchGames()
    }, [user]);

    const fetchGames = async () => {
        if ( !user?.club?.id ) return;

        try {
            const [ gamesResponse, teamsResponse ] = await Promise.all([
                api.get('/api/games'),
                clubService.getClubTeams(user.club.id)
            ]);

            setGames(gamesResponse.data);

            const teamGames = new Set( teamsResponse.map(team => team.gameId));
            const availableGames : Game[] = games.filter(game => !teamGames.has(game.id));

            setGames(availableGames);
        } catch (error) {
            console.log('Failed to fetch games:', error);
            setError('Failed to fetch games');
        }
    }

    async function handleSubmit(data: CreateTeamValues) {
        try {
            const requestData = {
                name: data.teamName,
                gameId: data.gameId,
                admissionType: data.admissionType,
                becomeCaptain: data.becomeCaptain,
                description: data.description,
                captainId: data.captainId,
            };

            const response = await teamService.createTeam(requestData, user?.club?.id);
            navigate(`/team/${response.id}`, {replace: true});
        } catch (error) {
            console.log('Failed to create club:', error);

            if(axios.isAxiosError(error)) {
                if (error.response?.status === 403) {
                    setError('Your session has expired. Please log in again.');
                } else {
                    setError( error.response?.data?.message || 'Something went wrong' );
                }
            } else {
                setError( 'An unexpected error occurred' );
            }
        }
    }

    const handleCancel= () => {
        form.reset();
        navigate(-1);
    };

    return (
        <div className='min-h-screen flex flex-col justify-center space-y-2 max-w-5xl mx-auto'>
            <h1 className='page-title'>
                Create a <span className='text-accent'>Team</span>
            </h1>

            {error && (
                <Alert variant='destructive'>
                    <AlertCircleIcon />
                    <AlertTitle>{error}</AlertTitle>
                </Alert>
            )}

            <div className='bg-muted rounded-2xl py-6 px-8 space-y-4'>

                <p className='text-sm font-extralight'>Fields marked with * are mandatory.</p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>

                        {/*   LEFT COLUMN   */}
                        <div className='w-1/2 space-y-4'>
                            <FormField
                                name='teamName'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Team Name*</FormLabel>

                                        <FormControl>
                                            <Input
                                                placeholder='Enter the name of the team'
                                                maxLength={20}
                                                {...field}
                                            />
                                        </FormControl>

                                        <CharacterCounter currentNr={field.value?.length || 0} maxNr={20} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/*   TEAM GAME SELECTION   */}
                            <FormField
                                name='gameId'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className='flex items-center gap-2'>
                                        <FormLabel>Choose the game:</FormLabel>

                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className='w-2/3'>
                                                    <SelectValue placeholder='Game' />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    { games.length === 0 ? (
                                                        <div className="px-3 py-2 text-sm text-muted-foreground">
                                                            No games
                                                        </div>
                                                    ) : (
                                                        games.map((game) => (
                                                            <SelectItem key={game.id} value={game.id}>
                                                                {game.name}
                                                            </SelectItem>
                                                        ))
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name='description'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>

                                        <FormControl>
                                            <Textarea
                                                className='resize-none h-20 overflow-y-auto'
                                                placeholder='A short description about the team...'
                                                rows={2}
                                                maxLength={100}
                                                {...field}
                                            />
                                        </FormControl>

                                        <CharacterCounter currentNr={field.value?.length || 0} maxNr={100} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/*   RIGHT COLUMN   */}
                        <div className='w-1/2'>
                            <FormField
                                name='becomeCaptain'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className='flex items-center justify-between'>
                                        <FormLabel>Become Team Captain ?</FormLabel>

                                        <div>
                                            <FormControl>
                                                <Checkbox className='border-2 w-5 h-5' checked={field.value} onCheckedChange={field.onChange}></Checkbox>
                                            </FormControl>
                                        </div>

                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}