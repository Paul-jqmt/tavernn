import {Input} from "./input";
import {Label} from "./label";
import {FormFieldProps} from "@/types/ui/form.types.ts"

export function FormField({id, label, type = "text", placeholder, value, onChange, error}:
                          FormFieldProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id} className="text-white">
                {label}
            </Label>
            <Input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="bg-white"
            />
            {error && (
                <p className="text-sm text-red-500 pl-2">
                    {error}
                </p>
            )}
        </div>
    );
}