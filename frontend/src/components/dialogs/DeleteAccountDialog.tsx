import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {userService} from "@/services/userService.ts";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Alert, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircleIcon} from "lucide-react";
import {Label} from "@radix-ui/react-label";
import {Input} from "@/components/ui/input.tsx";

interface DeleteAccountDialogProps {
    userId: string;
    username: string;
    onAccountDeleted: () => void;
}

export default function DeleteAccountDialog({ userId, username, onAccountDeleted }: DeleteAccountDialogProps) {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ confirmation, setConfirmation ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (confirmation !== username) {
            setError('Username does not match.');
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            await userService.deleteUser(userId);

            onAccountDeleted();
            setIsOpen(false);
            navigate('/auth', {replace: true});
        } catch (error) {
            console.log('Error deleting account:', error);
            setError('Error deleting account');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant='destructive'>Delete Account</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete your account</DialogTitle>
                    <DialogDescription className='font-extralight'>
                        This action is permanent and cannot be undone.
                        All your data, including your profile and settings will be deleted.
                    </DialogDescription>
                </DialogHeader>

                <div className='space-y-4'>
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircleIcon />
                            <AlertTitle>{error}</AlertTitle>
                        </Alert>
                    )}

                    <Label className='text-sm'>Type your username to confirm</Label>

                    <Input
                        className='mt-2'
                        value={confirmation}
                        placeholder='Enter your username'
                        onChange={(e) => {
                            setConfirmation(e.target.value);
                            setError(null);
                        }}
                    />
                </div>

                <DialogFooter className='flex justify-center gap-4 sm:justify-center'>
                    <DialogClose asChild>
                        <Button
                            variant='outline'
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button
                        variant='destructive'
                        onClick={handleDelete}
                        disabled={confirmation !== username || isLoading}
                    >
                        {isLoading ? 'Deleting...' : 'Delete Account'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}