import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import profileAvatar from '@/assets/icons/profile-pic-1.svg';
import {Label} from "@/components/ui/label.tsx";
import {User} from "@/types/user.ts";
import EditEmailDialog from "@/components/dialogs/EditEmailDialog.tsx";
import EditUsernameDialog from "@/components/dialogs/EditUsernameDialog.tsx";
import EditDiscordDialog from "@/components/dialogs/EditDiscordDialog.tsx";
import {useNavigate} from "react-router-dom";
import {useUser} from "@/contexts/UserContext.tsx";
import DeleteAccountDialog from "@/components/dialogs/DeleteAccountDialog.tsx";

interface ProfileSettingProps {
    userData: User;
    onUserDataUpdate: () => void;
}

export default function ProfileSettings({ userData, onUserDataUpdate }: ProfileSettingProps) {
    const [ profilePicture ] = useState<string>(profileAvatar);

    const navigate = useNavigate();
    const { clearUser } = useUser();

    const uploadPicture = () => {
        // TODO: IMPLEMENT UPLOAD NEW PICTURE
    }

    const removePicture = () => {
        // TODO: IMPLEMENT REMOVE PROFILE PICTURE
    }

    const handleLogout = () => {
        try {
            localStorage.removeItem('token');
            clearUser();
        } catch (error) {
            console.log('Error logging out:', error);
        } finally {
            navigate('/auth', { replace: true });
        }
    };

    return (
        <div className='space-y-4 h-full hide-scrollbar overflow-y-auto'>

            {/*   PROFILE PICTURE   */}
            <section className='space-y-2'>
                <p className='settings-title'>Profile picture</p>
                <p className='text-xs font-extralight'>The ideal image size is 192 × 192 pixels. The maximum file size allowed is 200 KiB.</p>

                <div className='flex items-center gap-6'>

                    {/*   PICTURE PREVIEW   */}
                    <Avatar className='w-24 h-24'>
                        <AvatarImage
                            src={userData.profilePicture || profilePicture}
                            alt={userData.username} />
                        <AvatarFallback>{userData.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>

                    <div className='space-y-2'>
                        <p className='text-sm font-normalr'>Upload new picture</p>
                        <div className='flex gap-3'>

                            {/*   UPLOAD FILE BUTTON   */}
                            <Input
                                type='file'
                                onChange={uploadPicture}
                            />

                            {/*   REMOVE PICTURE BUTTON   */}
                            <Button
                                variant='destructive'
                                onClick={removePicture}
                            >
                                Remove picture
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <Separator />

            {/*   ACCOUNT   */}
            <section className='space-y-4'>
                <p className='settings-title'>Account</p>

                {/*   USER EMAIL EDIT   */}
                <div className='space-y-1'>
                    <Label>Email</Label>
                    <div className='flex gap-4'>
                        <Input
                            className='w-1/2'
                            disabled
                            value={userData.email}
                        />

                        <EditEmailDialog currentEmail={userData.email} userData={userData} onEmailUpdate={onUserDataUpdate} />
                    </div>
                    <p className='text-xs font-extralight'>Your email address will remain private.</p>
                </div>

                {/*   USER USERNAME EDIT   */}
                <div className='space-y-1'>
                    <Label>Username</Label>
                    <div className='flex gap-4'>
                        <Input
                            className='w-1/2'
                            disabled
                            value={userData.username}
                        />

                        <EditUsernameDialog currentUsername={userData.username} userData={userData} onUsernameUpdate={onUserDataUpdate} />
                    </div>
                    <p className='text-xs font-extralight'>Choose a username to be identified with. People will be able to look you up using this username.</p>
                </div>

                {/*   USER DISCORD EDIT   */}
                <div className='space-y-1'>
                    <Label>Discord</Label>
                    <div className='flex gap-4'>
                        <Input
                            className='w-1/2'
                            disabled
                            value={userData.discord}
                        />

                        <EditDiscordDialog currentDiscord={userData.discord} userData={userData} onDiscordUpdate={onUserDataUpdate} />
                    </div>
                    <p className='text-xs font-extralight'>This will be displayed on your profile. Leave empty if you don't want people to see your Discord username.</p>
                </div>

                {/*   CHANGE PASSWORD AND LOG OUT BUTTON   */}
                <div className='flex gap-4 mt-10'>

                    {/*   CHANGE PASSWORD BUTTON  */}
                    {/*TODO: IMPLEMENT CHANGE PASSWORD*/}
                    <Button className='bg-foreground text-white'>Change password</Button>

                    {/*   LOG OUT BUTTON  */}
                    <Button
                        variant='destructive'
                        onClick={handleLogout}
                    >
                        Log out
                    </Button>
                </div>
            </section>

            <Separator />

            {/*   DELETE ACCOUNT   */}
            <section className='space-y-2'>
                <p className='settings-title'>Delete account</p>
                <p className='text-sm font-extralight pb-4'>
                    When deleting your account, certain content will be displayed under the label of "Ghost User".<br/>
                    All personal user data will be deleted. This action is irreversible.
                </p>

                <DeleteAccountDialog
                    userId={userData.id}
                    username={userData.username}
                    onAccountDeleted={clearUser}
                />
            </section>
        </div>
    );
}