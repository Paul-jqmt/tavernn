import { Info } from 'lucide-react';

interface InformationBannerProps {
    message: string;
}

export default function InformationBanner({ message }: InformationBannerProps) {
    return (
        <div className='flex bg-card text-card-foreground rounded-xl px-6 py-4 gap-2 items-center'>
            <Info className='h-5 w-5' />
            <p className='text-sm'>{message}</p>
        </div>
    )
}