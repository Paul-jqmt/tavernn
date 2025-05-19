import { Button } from "@/components/ui/button.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { useState } from "react";
import valorantLogo from "@/assets/icons/valorant-logo.svg";
import fortniteLogo from "@/assets/icons/fortnite-logo.svg";
import stardewValleyLogo from "@/assets/icons/stardew-valley-logo.svg";
import ConfirmDeleteDialog from "@/components/common/ConfirmDeleteDialog.tsx";

const userGames = [
    { id: 1, name: 'Fortnite', level: 'Advanced', icon: fortniteLogo },
    { id: 2, name: 'Valorant', level: 'Advanced', icon: valorantLogo },
    { id: 3, name: 'Stardew Valley', level: 'Medium', icon: stardewValleyLogo },
];

export default function ProfileGameList() {
    const [gameList, setGameList] = useState(userGames);

    const handleDelete = (id: number) => {
        setGameList(prev => prev.filter(g => g.id !== id));
    };

    return (
        <>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl font-bold'>My games</h2>
                <Button>Add game</Button>
            </div>

            <div className='space-y-6'>
                {gameList.map((game) => (
                    <div
                        key={game.id}
                        className='flex items-center justify-between bg-deep-purple rounded-xl'
                    >
                        <div className='flex items-center gap-4'>
                            <Avatar className='w-8 h-8'>
                                <AvatarImage src={game.icon} alt='@game-icon' />
                                <AvatarFallback>{game.name[0].toUpperCase()}</AvatarFallback>
                            </Avatar>

                            <div>
                                <p className='font-bold'>{game.name}</p>
                                <p className='font-extralight text-sm'>Level: <span className='font-medium'>{game.level}</span></p>
                            </div>
                        </div>

                        <div className='flex gap-4'>
                            <Button variant='outline'>Edit</Button>
                            <ConfirmDeleteDialog trigger={<Button variant='outline' className='border-red-500 text-red-500 hover:bg-red-500 hover:text-white'>Delete</Button>} gameName={game.name} onConfirm={() => handleDelete(game.id)}/>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};