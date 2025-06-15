import {useEffect, useState} from "react";
import {Notification} from "@/types/notofication.ts";

export default function ProfileNotifications() {
    const [ notificationsList, setNotificationsList ] = useState<Notification[]>([]);

    const fetchNotifications = () => {
        const list : Notification[] = [
            { id: '1', title: 'Wellcome to Tavernn', content: 'Explore clubs, create your own, and join others.', date: '2021-09-20T12:00:00.000Z' },
            { id: '2', title: 'New tournament announced', content: 'Are your young lings ready? ', date: '2021-09-20T12:00:00.000Z' },
        ]

        setNotificationsList(list);
    }

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <div className='h-full flex flex-col overflow-hidden space-y-6'>

        </div>
    )
}