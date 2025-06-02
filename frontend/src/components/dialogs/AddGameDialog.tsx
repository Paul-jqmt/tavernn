import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select.tsx";
import type { Game } from "@/types/game.ts";
import {useEffect, useState} from "react";
import {GameLevel, UserGame} from "@/types/userGame.ts";
import api from "@/services/api.ts";
import {userService} from "@/services/userService.ts";
import {Alert, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircleIcon} from "lucide-react";

type AddGameDialogProps = {
    onSubmit: (userGame: UserGame) => void;
    userId: string | undefined;
};

export default function AddGameDialog({ onSubmit, userId }: AddGameDialogProps) {
    const [ games, setGames ] = useState<Game[]>([]);
    // @ts-ignore
    const [ userGames, setUserGames ] = useState<UserGame[]>([]);
    const [ gameId, setGameId ] = useState<string>('');
    const [ level, setLevel ] = useState<GameLevel | ''>('');

    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        fetchGames();
    }, [userId]);

    const fetchGames = async () => {
        try {
            setIsLoading(true);
            setError(null);

            // FETCH THE GAMES LIST AND THE USER GAMES LIST
            const [ gamesResponse, userGamesResponse ] = await Promise.all([
                api.get(`/api/game`),
                userService.getUserGames(userId)
            ]);

            const games : Game[] = gamesResponse.data;

            // FILTER OUT THE GAMES THAT THE USER ALREADY HAS
            const userGameIds = new Set(userGamesResponse.map(g => g.gameId));
            const availableGames = games.filter(game => !userGameIds.has(game.id));

            setGames(availableGames);
            setUserGames(userGamesResponse);
        } catch (error) {
            console.log('Error fetching games:', error);
            setError('Error fetching games');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!gameId || !level) return;

        try {
            setIsLoading(true);
            setError(null);

            const newUserGame = await userService.addUserGame( userId, gameId, level );
            onSubmit(newUserGame);

            setGames(games.filter(g => g.id !== gameId));

            setGameId('');
            setLevel('');
        } catch (error) {
            console.log('Error adding game:', error);
            setError('Error adding game');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add game</Button>
            </DialogTrigger>

            <DialogContent className='bg-deep-purple text-white rounded-xl max-w-md'>
                <DialogHeader>
                    <DialogTitle>Add game</DialogTitle>
                    <DialogDescription className='text-white font-extralight'>Add a game to your profile</DialogDescription>
                </DialogHeader>

                <div className='space-y-5 p-6'>

                    { error && (
                        <Alert variant='destructive'>
                            <AlertCircleIcon />
                            <AlertTitle>{error}</AlertTitle>
                        </Alert>
                    )}

                    {/*   GAME SELECTION   */}
                    <div>
                        <Label className='mb-2'>Choose game:</Label>
                        <Select value={gameId} onValueChange={setGameId}>
                            <SelectTrigger className='bg-white text-deep-purple w-full'>
                                <SelectValue placeholder='Game'></SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                                {isLoading ? (
                                    <div className="px-3 py-2 text-sm text-muted-foreground">
                                        Loading games...
                                    </div>
                                ) : games.length === 0 ? (
                                    <div className="px-3 py-2 text-sm text-muted-foreground">
                                        No available games to add
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
                    </div>

                    {/*   LEVEL SELECTION   */}
                    <div>
                        <Label className='mb-2'>Choose level:</Label>
                        <Select value={level} onValueChange={(value) => setLevel(value as GameLevel)}>
                            <SelectTrigger className='bg-white text-deep-purple w-full'>
                                <SelectValue placeholder='Level'></SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value='beginner'>Beginner</SelectItem>
                                <SelectItem value='intermediate'>Intermediate</SelectItem>
                                <SelectItem value='advanced'>Advanced</SelectItem>
                                <SelectItem value='professional'>Professional</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter className='flex justify-center gap-4 mt-6'>
                    <DialogClose asChild>
                        <Button variant='destructive'>Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            className='bg-light-purple text-white'
                            onClick={handleSubmit}
                            disabled={!gameId || !level || isLoading}
                        >
                            {isLoading ? 'Adding...' : 'Add'}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}