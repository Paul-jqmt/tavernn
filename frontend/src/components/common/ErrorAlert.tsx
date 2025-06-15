import {Alert, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircleIcon, ArrowLeft} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";

interface ErrorAlertProps {
    message: string;
}

export function ErrorAlert({ message }: ErrorAlertProps & { message: string}) {
    const navigate = useNavigate();

    return <div className="w-full flex flex-col items-center gap-4">
        <Alert variant="destructive" className="max-w-md">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle>{message}</AlertTitle>
        </Alert>
        <Button
            variant="default"
            onClick={() => navigate(-1)}
            className="mt-4"
        >
            <ArrowLeft className="h-5 w-5 mr-2" /> Go Back
        </Button>
    </div>

}