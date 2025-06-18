import { Button } from "@/components/ui/button.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import {useEffect, useState} from "react";
import ConfirmGameDeleteDialog from "@/components/dialogs/ConfirmGameDeleteDialog.tsx";
import EditGameDialog from "@/components/dialogs/EditGameDialog.tsx";
import AddGameDialog from "@/components/dialogs/AddGameDialog.tsx";
import { capitalize } from "@/lib/utils.ts";
import { UserGame } from "@/types/userGame.ts";
import {userService} from "@/services/userService.ts";
import {Alert, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircleIcon} from "lucide-react";
import { PenLine, Trash2 } from 'lucide-react';

interface ProfileGameListProps {
    userId: string;
    onGameListUpdate: () => void;
}

export default function ProfileGameList({ userId, onGameListUpdate }: ProfileGameListProps) {
    const [ gameList, setGameList ] = useState<UserGame[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        loadUserGames();
    }, [userId]);

    const loadUserGames = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const games = await userService.getUserGames(userId);
            setGameList(games);
        } catch (error) {
            console.log('Error fetching user games:', error);
            setError('Error fetching user games');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddGame = async () => {
        try {
            onGameListUpdate();
        } catch (error) {
            console.log('Error adding game:', error);
            setError('Error adding game');
        }
    };

    const handleDelete = async (gameId: string) => {
        try {
            await userService.deleteUserGame(userId, gameId);
            onGameListUpdate();
        } catch (error) {
            console.log('Error deleting game:', error);
            setError('Error deleting game');
        }
    };

    return (
        <div className='h-full flex flex-col overflow-hidden space-y-4'>
            <div className='space-y-2'>
                <h3 className='page-subtitle'>My games</h3>

                <p className='text-sm font-light'>These games will be displayed on your profile for other players to see and can be useful in club and teams membership applications. </p>

                {/*   ADD A GAME   */}
                <div className='flex justify-end'>
                    <AddGameDialog
                        userId={userId}
                        onSubmit={handleAddGame}
                    />
                </div>
            </div>

            {/*   LIST OF GAMES   */}
            {isLoading  ? (
                <div className='text-white'>Loading clubs...</div>
            ) : error ? (
                <Alert variant='destructive'>
                    <AlertCircleIcon />
                    <AlertTitle>{error}</AlertTitle>
                </Alert>
            ) : (
                <div className='flex-1 overflow-y-auto hide-scrollbar space-y-6'>
                    {gameList.map((game) => (
                        <div
                            key={game.gameId}
                            className='flex items-center justify-between'
                        >
                            <div className='flex items-center gap-4'>
                                <Avatar className='w-8 h-8'>
                                    <AvatarImage src={game.icon} alt='@game-icon' />
                                    <AvatarFallback>{game.gameName.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>

                                <div>
                                    <p className='font-bold'>{game.gameName}</p>
                                    <p className='font-extralight text-sm'>Level: <span className='font-medium'>{capitalize(game.gameLevel)}</span></p>
                                </div>
                            </div>

                            {/*   GAME OPTION BUTTONS   */}
                            <div className='flex gap-4'>

                                {/*   EDIT A GAME   */}
                                <EditGameDialog
                                    trigger={
                                        <Button variant='secondary'>
                                            <PenLine className='h-5 w-5'/> Edit
                                        </Button>
                                    }
                                    userId={userId}
                                    gameId={game.gameId}
                                    gameName={game.gameName}
                                    currentLevel={game.gameLevel}
                                    onUpdate={(updatedUserGame) => {
                                        setGameList(prev =>
                                            prev.map(g => g.gameId === updatedUserGame.gameId ? updatedUserGame : g)
                                        );
                                    }}
                                />

                                {/*   DELETE A GAME   */}
                                <ConfirmGameDeleteDialog
                                    trigger={
                                        <Button variant='secondary'>
                                            <Trash2 className='text-destructive h-6 w-6'/>
                                        </Button>
                                    }
                                    gameName={game.gameName}
                                    onConfirm={() => handleDelete(game.gameId)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};