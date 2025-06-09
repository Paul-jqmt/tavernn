import {useState} from "react";
import {Notification} from "@/types/notofication.ts";

export default function ProfileNotifications() {
    const [ notificationsList, setNotificationsList ] = useState<Notification[]>([]);

    return (
        <div className='h-full flex flex-col overflow-hidden space-y-6'>

        </div>
    )
}