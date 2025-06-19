import {JSX} from "react";
import {Button} from "@/components/ui/button.tsx";

interface SubheaderButtonProps {
    buttonText: string;
    buttonIcon: JSX.Element;
    onClick?: () => void;
}

export default function SubheaderButton( { buttonText, buttonIcon, onClick }: SubheaderButtonProps) {
    return (
        <Button
            variant='default'
            className='w-xs bg-foreground text-white hover:bg-secondary active:bg-primary'
            onClick={onClick}
        >
            {buttonText}
            {buttonIcon}
        </Button>
    )
}