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

export default function ConfirmCancelDialog({ trigger, onConfirm } : {
    trigger: React.ReactNode;
    onConfirm: () => void;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className='rounded-xl max-w-md'>
                <DialogHeader>
                    <DialogTitle>Cancel club creation ?</DialogTitle>
                    <DialogDescription className='font-extralight'>
                        If you cancel now, all unsaved information will be lost.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className='flex justify-center gap-4 mt-4'>

                    {/*   KEEP CREATING BUTTON   */}
                    <DialogClose asChild>
                        <Button variant='default'>Continue Creating</Button>
                    </DialogClose>

                    {/*   CANCEL CREATING   */}
                    <Button onClick={onConfirm} variant='destructive'>
                        Yes, Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}