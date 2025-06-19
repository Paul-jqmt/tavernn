import {Button} from "@/components/ui/button.tsx";
import {JSX} from "react";

interface UserHomePageCardProps {
    title: String;
    description: String;
    buttonText: String;
    buttonIcon: JSX.Element;
    onClick?: () => void;
}

export default function UserHomePageCard({ title, description, buttonText, buttonIcon, onClick }: UserHomePageCardProps) {
    return (
        <div className='w-1/3 bg-primary text-primary-foreground p-4 space-y-2 rounded-xl flex flex-col'>
            <h3 className='text-base font-semibold'>{title}</h3>
            <p className='text-sm font-light mb-6'>{description}</p>

            <Button
                variant='default'
                className='bg-foreground text-white hover:bg-secondary active:bg-primary'
                onClick={onClick}
            >
                {buttonText}
                {buttonIcon}
            </Button>
        </div>
    )
}