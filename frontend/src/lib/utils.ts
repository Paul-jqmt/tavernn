import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function capitalize<T extends string>(s: T): Capitalize<T> {
    return (s.charAt(0).toUpperCase() + s.slice(1)) as Capitalize<T>;
}

export function formatDate(dateString: string | undefined) {
    const data = dateString.split('-');
    return `${data[2]}.${data[1]}.${data[0]}`
}