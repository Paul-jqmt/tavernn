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
import {clubService} from "@/services/clubService.ts";
import {useUser} from "@/contexts/UserContext.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import CharacterCounter from "@/components/common/CharacterCounter.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {gameService} from "@/services/gameService.ts";
import {CaptainCombobox} from "@/components/forms/CaptainComboboxProps.tsx";
import ConfirmCancelDialog from "@/components/dialogs/ConfirmCancelDialog.tsx";
import {Button} from "@/components/ui/button.tsx";

export function CreateTeamForm() {
    const { user } = useUser();
    const navigate = useNavigate();

    const [ clubMembers, setClubMembers ] = useState<ClubMember[]>([]);

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
        fetchGames();
        fetchClubMembers();
    }, [user]);

    const fetchGames = async () => {
        if ( !user?.club?.id ) return;

        try {
            const [ gamesResponse, teamsResponse ] = await Promise.all([
                gameService.getGames(),
                clubService.getClubTeams(user.club.id),
            ]);

            const gList : Game[] = gamesResponse;

            const clubGames = new Set(teamsResponse.map(team => team.gameId));
            const availableGames = gList.filter(game => !clubGames.has(game.id));

            setGames(availableGames);
        } catch (error) {
            console.log('Failed to fetch games:', error);
            setError('Failed to fetch games');
        }
    }

    const fetchClubMembers = async () => {
        if (!user?.club?.id) return;

        try {
            const members = await clubService.getClubMembers(user.club.id);
            setClubMembers(members);
        } catch (error) {
            console.log('Failed to fetch club members:', error);
            setError('Failed to fetch club members');
        }
    };


    async function handleSubmit(data: CreateTeamValues) {
        try {
            const requestData = {
                name: data.teamName,
                gameId: data.gameId,
                admissionType: data.admissionType,
                description: data.description,
                captainId: data.becomeCaptain ? user?.id : data.captainId,
            };

            await teamService.createTeam(requestData, user?.club?.id);
            navigate(-1);
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
                    <form onSubmit={form.handleSubmit(handleSubmit)}>

                        {/*   FORM CONTENT   */}
                        <div className='space-y-6 flex gap-8'>

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
                                            <FormMessage />
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
                            <div className='w-1/2 space-y-4'>

                                {/*   BECOME TEAM CAPTAIN CHECKBOX   */}
                                <FormField
                                    name='becomeCaptain'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className='flex items-center justify-between'>
                                            <div>
                                                <FormLabel>Become Team Captain ?</FormLabel>
                                                <p className='text-xs font-light mt-2'>If you do not wish to become the team captain you will have to select someone else.</p>
                                            </div>


                                            <FormControl>
                                                <Checkbox
                                                    className='border-2 w-5 h-5'
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => {
                                                        field.onChange(checked);
                                                        if (checked) {
                                                            form.setValue('captainId', '');
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/*   TEAM CAPTAIN SELECTION   */}
                                { !form.watch('becomeCaptain') && (
                                    <FormField
                                        name='captainId'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Team Captain*</FormLabel>
                                                <FormControl>
                                                    <CaptainCombobox
                                                        members={clubMembers}
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}

                                {/*   TEAM ADMISSION TYPE   */}
                                <FormField
                                    name='admissionType'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className='flex items-center space-x-2 w-2/3'>
                                            <FormLabel>Admission type *</FormLabel>

                                            <FormControl>
                                                <Select value={field.value} onValueChange={field.onChange}>
                                                    <SelectTrigger className='w-1/3'>
                                                        <SelectValue placeholder='Select' />
                                                    </SelectTrigger>

                                                    <SelectContent>
                                                        <SelectItem value='open'>Open</SelectItem>
                                                        <SelectItem value='closed'>Closed</SelectItem>
                                                        <SelectItem value='invite_only'>Application</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>
                        </div>

                        {/*   FORM BUTTONS   */}
                        <div className='flex justify-center gap-4'>

                            {/*   CANCEL BUTTON   */}
                            <ConfirmCancelDialog
                                trigger={
                                    <Button
                                        variant='outlineDestructive'
                                        className='w-1/4'>
                                        Cancel
                                    </Button>
                                }
                                onConfirm={() => handleCancel()}
                            />

                            {/*   CREATE CLUB BUTTON   */}
                            <Button
                                type='submit'
                                variant='outline'
                                onClick={() => form.handleSubmit(handleSubmit)}
                                className='w-1/4'>
                                Create Team
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}