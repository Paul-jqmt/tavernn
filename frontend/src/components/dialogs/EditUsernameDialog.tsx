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

interface EditUsernameDialogProps {
    currentUsername: string;
    userData: User;
    onUsernameUpdate: () => void;
}

export default function EditUsernameDialog({ currentUsername, userData, onUsernameUpdate, }: EditUsernameDialogProps) {
    const [ newUsername, setNewUsername ] = useState<string>(currentUsername);
    const [ error, setError ] = useState<string | null>(null);
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            setError(null);

            await api.put(`/api/users/${userData.id}`, {
                username: newUsername,
            });

            onUsernameUpdate();
            setIsOpen(false);
        } catch (error) {
            console.log('Error updating username:', error);
            setError('Error updating username');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setNewUsername(currentUsername);
        setError(null);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant='outline'>Edit</Button>
            </DialogTrigger>

            <DialogContent className='text-foreground'>
                <DialogHeader>
                    <DialogTitle>Update your display name</DialogTitle>
                    <DialogDescription className='text-foreground font-extralight'>Usernames must be unique and can include letters, numbers, and underscores.</DialogDescription>
                </DialogHeader>

                <div className='space-y-4 mt-4'>

                    {/*   USERNAME INPUT   */}
                    <div className='space-y-2'>
                        <Label>New username</Label>
                        <Input
                            type='text'
                            value={newUsername}
                            placeholder='Enter your new username'
                            onChange={(e) => {
                                setNewUsername(e.target.value);
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
                        disabled={ isLoading || newUsername === currentUsername }
                    >
                        {isLoading ? "Updating..." : "Update"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}