import {UserNotification} from "@/types/userNotification.ts";
import {Button} from "@/components/ui/button.tsx";
import {X} from "lucide-react";

interface NotificationCardProps {
    notification: UserNotification;
    onDelete: (id: string) => void;
}

export default function NotificationCard( { notification, onDelete }: NotificationCardProps) {
    return (
        <div className='bg-primary text-primary-foreground p-4 space-y-2 rounded-xl flex flex-col relative'>
            <Button
                variant="secondary"
                size="icon"
                className="absolute right-2 top-2 h-6 w-6 hover:bg-primary-foreground/20"
                onClick={() => onDelete(notification.id)}
            >
                <X className="h-4 w-4" />
            </Button>
            <h3 className='text-base font-semibold'>{notification.title}</h3>
            <p className='text-sm font-light mb-6'>{notification.content}</p>
            <p className='flex justify-end text-xs text-muted'>{notification.date}</p>
        </div>

    )
}