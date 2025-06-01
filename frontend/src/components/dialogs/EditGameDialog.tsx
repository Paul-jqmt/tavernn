import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select.tsx";
import { useState } from "react";
import * as React from "react";
import {GameLevel, UserGame} from "@/types/userGame.ts";
import {userService} from "@/services/userService.ts";
import {Alert, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircleIcon} from "lucide-react";

type EditGameDialogProps = {
    trigger: React.ReactNode;
    userId: string | undefined;
    gameId: string;
    gameName: string;
    currentLevel: GameLevel;
    onUpdate: (userGame: UserGame) => void;
};

export default function EditGameDialog({trigger, userId, gameId, gameName, currentLevel, onUpdate }: EditGameDialogProps) {
    const [ level, setLevel ] = useState(currentLevel);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState<string | null>(null);

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const updatedUserGame = await userService.updateGameLevel(userId, gameId, level);
            onUpdate(updatedUserGame);
        } catch (error) {
            console.log('Error updating game:', error);
            setError('Error updating game');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className='bg-deep-purple text-white rounded-xl max-w-mld'>
                <DialogHeader>
                    <DialogTitle>Edit game</DialogTitle>
                    <DialogDescription className='text-white font-extralight'>Edit the level of your game</DialogDescription>
                </DialogHeader>

                { error && (
                    <Alert variant='destructive'>
                        <AlertCircleIcon />
                        <AlertTitle>{error}</AlertTitle>
                    </Alert>
                )}

                <div className='space-y-4 mt-4'>

                    {/*   GAME NAME   */}
                    <div>
                        <Label className='m-2'>Game</Label>
                        <Input placeholder={gameName} disabled />
                    </div>

                    {/*   NEW GAME LEVEL SELECTOR   */}
                    <div>
                        <Label className='m-2'>Choose level:</Label>
                        <Select value={level} onValueChange={(value) => setLevel(value as GameLevel)}>
                            <SelectTrigger className='w-[180px]'>
                                <SelectValue placeholder={currentLevel} />
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

                    {/*   CANCEL BUTTON   */}
                    <DialogClose asChild>
                        <Button variant='destructive'>Cancel</Button>
                    </DialogClose>

                    {/*   UPDATE BUTTON   */}
                    <DialogClose asChild>
                        <Button
                            className='bg-light-purple'
                            onClick={handleSubmit}
                            disabled={isLoading || level === currentLevel}
                        >
                            {isLoading ? 'Updating...' : 'Update'}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}