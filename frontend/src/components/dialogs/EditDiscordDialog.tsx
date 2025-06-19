import {User} from "@/types/user.ts";
import {useState} from "react";
import api from "@/services/api.ts";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";

interface EditDiscordDialogProps {
    currentDiscord: string;
    userData: User;
    onDiscordUpdate: () => void;
}

export default function EditDiscordDialog({ currentDiscord, userData, onDiscordUpdate, }: EditDiscordDialogProps) {
    const [ newDiscord, setNewDiscord ] = useState<string>(currentDiscord);
    const [ error, setError ] = useState<string | null>(null);
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            setError(null);

            await api.put(`/api/users/${userData.id}`, {
                discord: newDiscord,
            });

            onDiscordUpdate();
            setIsOpen(false);
        } catch (error) {
            console.log('Error updating discord:', error);
            setError('Error updating discord');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setNewDiscord(currentDiscord);
        setError(null);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant='outline'>Edit</Button>
            </DialogTrigger>

            <DialogContent className='text-foreground'>
                <DialogHeader>
                    <DialogTitle>Update your Discord tag</DialogTitle>
                    <DialogDescription className='text-foreground font-extralight'>This will be visible on your profile so others can find you on Discord.</DialogDescription>
                </DialogHeader>

                <div className='space-y-4 mt-4'>

                    {/*   DISCORD INPUT   */}
                    <div className='space-y-2'>
                        <Label>Discord username</Label>
                        <Input
                            type='text'
                            value={newDiscord}
                            placeholder='Enter a valid Discord tag'
                            onChange={(e) => {
                                setNewDiscord(e.target.value);
                                setError(null);
                            }}
                        />
                    </div>

                    {/*   TODO: IMPLEMENT PASSWORD CONFIRMATION   */}
                    {/*   PASSWORD CONFIRMATION INPUT   */}
                    {/*<div className='space-y-2'>*/}
                    {/*    <Label>Confirm with your password</Label>*/}
                    {/*    <Input*/}
                    {/*        className='text-deep-purple'*/}
                    {/*        type='password'*/}
                    {/*        value={password}*/}
                    {/*        placeholder='Enter your password'*/}
                    {/*        onChange={(e) => {*/}
                    {/*            setPassword(e.target.value);*/}
                    {/*            setError(null);*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*</div>*/}

                    {error && (
                        <p className='text-xs font-extralight bg-destructive py-2 px-4 rounded-md'>{error}</p>
                    )}
                </div>

                <DialogFooter className='flex justify-center gap-4 my-6'>

                    {/*   CANCEL BUTTON   */}
                    <Button
                        variant="destructive"
                        onClick={handleClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>

                    {/*   SAVE EDIT BUTTON   */}
                    <Button
                        onClick={handleSubmit}
                        disabled={ isLoading || newDiscord === currentDiscord }
                    >
                        {isLoading ? "Updating..." : "Update"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}