import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import * as React from "react";

export default function ConfirmGameDeleteDialog({ trigger, gameName, onConfirm, } : {
    trigger: React.ReactNode;
    gameName: string;
    onConfirm: () => void;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className='bg-deep-purple text-white rounded-xl max-w-md'>
                <DialogHeader>
                    <DialogTitle>Delete {gameName}?</DialogTitle>
                    <DialogDescription className='text-white font-extralight'>
                        You will be able to add it later if you want
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className='flex justify-center gap-4 mt-4'>

                    {/*   KEEP GAME BUTTON   */}
                    <DialogClose asChild>
                        <Button variant='outline'>No, Keep it</Button>
                    </DialogClose>

                    {/*    CONFIRM DELETE GAME    */}
                    <Button onClick={onConfirm} variant='destructive'>
                        Yes, Delete it
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
