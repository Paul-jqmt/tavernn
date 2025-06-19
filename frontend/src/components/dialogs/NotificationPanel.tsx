import * as Dialog from "@radix-ui/react-dialog";
import {Button} from "@/components/ui/button.tsx";
import {Bell, X} from "lucide-react";

interface NotificationPanelProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function NotificationPanel({ isOpen, onOpenChange }: NotificationPanelProps ) {
    return (
        <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>

            {/*   NOTIFICATION BUTTON   */}
            <Dialog.Trigger asChild>
                <Button variant='secondary' size='icon'>
                    <Bell className="h-5 w-5" />
                </Button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/30 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <Dialog.Content
                    className="fixed right-0 top-0 h-full w-1/4 bg-background shadow-lg z-50
                                data-[state=open]:animate-in data-[state=closed]:animate-out
                                data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right
                                duration-300"
                >
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Notifications</h2>

                            {/*   CLOSE BUTTON   */}
                            <Dialog.Close asChild>
                                <Button variant="secondary">
                                    <X className='h-5 w-5'/>
                                </Button>
                            </Dialog.Close>
                        </div>

                        <div className="space-y-4">
                            <p className='text-sm'>Your notifications will appear here</p>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}