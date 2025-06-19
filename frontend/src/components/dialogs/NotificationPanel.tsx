import * as Dialog from "@radix-ui/react-dialog";
import {Button} from "@/components/ui/button.tsx";
import {Bell, X} from "lucide-react";
import {UserNotification} from "@/types/userNotification.ts";
import {useEffect, useState} from "react";
import NotificationCard from "@/components/common/NotificationCard.tsx";

interface NotificationPanelProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function NotificationPanel({ isOpen, onOpenChange }: NotificationPanelProps ) {
    const [ notificationsList, setNotificationsList ] = useState<UserNotification[]>([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = () => {
        const list : UserNotification[] = [
            { id: '1', title: 'Welcome to Tavernn', content: 'Explore clubs, create your own, and join others.', date: '2021-09-20T12:00:00.000Z', seen: false },
            { id: '2', title: 'New tournament announced', content: 'Are your young lings ready?', date: '2021-09-20T12:00:00.000Z', seen: false },
            { id: '3', title: 'Have something to announce?', content: 'Are your young lings ready?', date: '2021-09-20T12:00:00.000Z', seen: false },
            { id: '4', title: 'New faces in Tavernn', content: 'Are your young lings ready?', date: '2021-09-20T12:00:00.000Z', seen: false },
        ]

        setNotificationsList(list);
    }

    const handleDeleteNotification = (id: string) => {
        setNotificationsList(prev => prev.filter(notification => notification.id !== id));
    };


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

                        {/*   LIST OF NOTIFICATIONS  */}
                        <div className="space-y-4">
                            {notificationsList.length > 0 ? (
                                notificationsList.map(notification => (
                                    <NotificationCard
                                        key={notification.id}
                                        notification={notification}
                                        onDelete={handleDeleteNotification}
                                    />
                                ))
                            ) : (
                                <p className='text-sm'>Your notifications will appear here</p>
                            )}
                        </div>

                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}