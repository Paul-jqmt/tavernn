import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select.tsx";
import { useState } from "react";
import * as React from "react";

type EditGameDialogProps = {
    trigger: React.ReactNode;
    gameName: string;
    currentLevel: string;
    onSubmit: (newLevel: string) => void;
};

export default function EditGameDialog({ trigger, gameName, currentLevel, onSubmit }: EditGameDialogProps) {
    const [ level, setLevel ] = useState(currentLevel);

    const handleSubmit = () => {
        onSubmit(level);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className='bg-deep-purple text-white rounded-xl max-w-mld'>
                <DialogHeader>
                    <DialogTitle>Edit game</DialogTitle>
                    <DialogDescription className='text-white font-extralight'>Edit the level of your game</DialogDescription>
                </DialogHeader>

                <div className='space-y-4 mt-4'>
                    <div>
                        <Label className='m-2'>Game</Label>
                        <Input placeholder={gameName} disabled />
                    </div>

                    <div>
                        <Label className='m-2'>Choose level:</Label>
                        <Select onValueChange={setLevel}>
                            <SelectTrigger className='w-[180px] bg-white text-deep-purple'>
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
                    <DialogClose asChild>
                        <Button variant='destructive'>Cancel</Button>
                    </DialogClose>

                    <DialogClose asChild>
                        <Button className='bg-light-purple' onClick={handleSubmit}>Update</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}