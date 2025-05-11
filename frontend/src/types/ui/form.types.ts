import {ChangeEvent} from "react";

export interface FormFieldProps {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}