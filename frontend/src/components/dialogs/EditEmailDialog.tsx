import api from "@/services/api.ts";
import {User} from "@/types/user.ts";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";

interface EditEmailDialogProps {
    currentEmail: string;
    userData: User;
    onEmailUpdate: () => void;
}

export default function EditEmailDialog({ currentEmail, userData, onEmailUpdate } : EditEmailDialogProps) {
    const [ newEmail, setNewEmail ] = useState<string>(currentEmail);
    const [ error, setError ] = useState<string | null>(null);
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            setError(null);

            await api.put(`/api/users/${userData.id}`, {
                ...userData,
                email: newEmail,
            });

            onEmailUpdate();
            setIsOpen(false);
            //setPassword('');
        } catch (error) {
            console.log('Error updating email:', error);
            setError('Error updating email');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setNewEmail(currentEmail);
        setError(null);
    };


    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant='outline' disabled>Edit</Button>
            </DialogTrigger>

            <DialogContent className='text-white'>
                <DialogHeader>
                    <DialogTitle>Update your email address</DialogTitle>
                    <DialogDescription className='text-white font-extralight'>Your email address will not be visible on your profile.</DialogDescription>
                </DialogHeader>

                <div className='space-y-4 mt-4'>

                    {/*   EMAIL INPUT   */}
                    <div className='space-y-2'>
                        <Label>Email</Label>
                        <Input
                            className='text-deep-purple'
                            type='email'
                            value={newEmail}
                            placeholder='New email'
                            onChange={(e) => {
                                setNewEmail(e.target.value);
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
                        disabled={ isLoading || newEmail === currentEmail || !validateEmail(newEmail) }
                    >
                        {isLoading ? "Updating..." : "Update"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}