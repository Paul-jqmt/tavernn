import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import profileAvatar from '@/assets/icons/profile-pic-1.svg';
import {Label} from "@/components/ui/label.tsx";

export default function ProfileSettings() {
    const [ openToInvite, setOpenToInvite ] = useState<boolean>(true);
    const [ profilePicture, setProfilePicture ] = useState<string>(profileAvatar);

    return (
        <div className='space-y-8 h-full hide-scrollbar overflow-y-auto'>
            {/*   GENERAL   */}
            <section className='space-y-4'>
                <h2 className='font-semibold text-2xl'>General</h2>
                <div className='flex items-center justify-between'>
                    <div>
                        <p className='font-semibold text-base mb-2'>Open at receiving invites</p>
                        <p className='text-sm font-extralight'>Other club admins will be able to send you invites to join their club</p>
                    </div>
                    <Checkbox checked={openToInvite} />
                </div>
            </section>

            <Separator />

            {/*   PROFILE PICTURE   */}
            <section className='space-y-4'>
                <h2 className='font-semibold text-2xl'>Profile picture</h2>
                <p className='text-xs font-extralight'>The ideal image size is 192 × 192 pixels. The maximum file size allowed is 200 KiB.</p>

                <div className='flex items-center gap-6'>
                    <Avatar className='w-24 h-24'>
                        <AvatarImage src={profilePicture} alt='@picture' />
                        <AvatarFallback>AA</AvatarFallback>
                    </Avatar>
                    <div className='space-y-2'>
                        <p className='text-sm font-normalr'>Upload new picture</p>
                        <div className='flex gap-3'>
                            <Input type='file' onChange={(e) => console.log(e.target.files)} />
                            <Button variant='destructive'>Remove picture</Button>
                        </div>
                    </div>
                </div>
            </section>

            <Separator />

            {/*   ACCOUNT   */}
            <section className='space-y-4'>
                <h2 className='font-semibold text-2xl'>Account</h2>

                {['Email', 'Username', 'Discord'].map((label, i) => (
                    <div key={i} className="space-y-1">
                        <Label className="mx-3">{label}</Label>
                        <div className="flex gap-4">
                            <Input className='w-1/2' disabled onChange={(e) => console.log(e.target.value)} placeholder={label} />
                            <Button variant="outline">Edit</Button>
                        </div>
                        <p className='text-xs font-extralight mx-3'>
                            {label === "Email" ? 'Your email address will remain private.' : label === 'Usernamr' ? 'Choose a username to be identified with. People will be able to look you up using this username.' : "This will be displayed on your profile. Leave empty if you don't want people to see your Discord username."}
                        </p>
                    </div>
                ))}

                <div className='flex gap-4'>
                    <Button>Change password</Button>
                    <Button variant='destructive'>Log out</Button>
                </div>
            </section>

            <Separator />

            {/*   DELETE ACCOUNT   */}
            <section className='space-y-4'>
                <h2 className='font-semibold text-2xl'>Delete account</h2>
                <p className='text-sm font-extralight'>When deleting your account, certain content will be displayed under the label of "Ghost User".
                    All personal user data will be deleted. This action is irreversible.</p>

                <Button variant='destructive'>Delete Account</Button>
            </section>
        </div>
    );
}