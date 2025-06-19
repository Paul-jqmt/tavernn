
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ClubMember } from "@/types/clubMember"

interface CaptainComboboxProps {
    members: ClubMember[]
    value: string | undefined
    onChange: (value: string) => void
}

export function CaptainCombobox({ members, value, onChange }: CaptainComboboxProps) {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value
                        ? members.find((member) => member.userId === value)?.username
                        : "Select team captain..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search members..." />
                    <CommandEmpty>No member found.</CommandEmpty>
                    <CommandGroup>
                        {members.map((member) => (
                            <CommandItem
                                key={member.userId}
                                value={member.username}
                                onSelect={() => {
                                    onChange(member.userId)
                                    setOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === member.userId ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {member.username}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}