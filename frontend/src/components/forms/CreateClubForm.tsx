import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateClubValues, createClubSchema} from "@/schemas/createClubSchema.ts";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useNavigate } from "react-router-dom";
import ConfirmCancelDialog from "@/components/dialogs/ConfirmCancelDialog.tsx";
import axios from "axios";
import {clubService} from "@/services/clubService.ts";
import {AlertCircleIcon} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import CharacterCounter from "@/components/common/CharacterCounter.tsx";

export default function CreateClubForm() {
    const navigate = useNavigate();
    const [ logoPreview, setLogoPreview ] = useState<string>();
    const [ error, setError ] = useState<{ title: string; message: string } | null>(null);

    const form = useForm<CreateClubValues>({
        resolver: zodResolver(createClubSchema),
        defaultValues: {
            logo: null,
            name: '',
            type: 'open',
            description: '',
        },
    })

    const handleCancel = () => {
        form.reset();
        setLogoPreview(undefined);
        navigate(-1);
    };

    async function onSubmit(data: CreateClubValues) {
        try {
            const requestData = {
                name: data.name,
                description: data.description || null,
                clubType: data.type.toLowerCase(),
                maxMembers: 20,
            };

             clubService.createClub(requestData);
             navigate(`/myclub`, {replace: true});
        } catch (error) {
            console.log('Failed to create club:', error);

            if(axios.isAxiosError(error)) {
                if (error.response?.status === 403) {
                    setError({
                        title: 'Authentication Error',
                        message: 'Your session has expired. Please log in again.'
                    });
                } else {
                    setError( {
                        title: 'Failed to create club',
                        message: error.response?.data?.message || 'Something went wrong',
                    });
                }
            } else {
                setError( {
                    title: 'Failed to create club',
                    message: 'An unexpected error occurred',
                });
            }
        }
    }

    const logoFile = form.watch('logo')
    if (logoFile instanceof File && logoFile.type === "image/png") {
        const url = URL.createObjectURL(logoFile)
        if( url !== logoPreview) setLogoPreview(url)
    }

    return (
        <div className='min-h-screen flex flex-col justify-center max-w-5xl mx-auto space-y-2'>
            <h1 className='text-3xl font-extrabold'>
                Create your <span className='text-accent'>Club</span>
            </h1>

            <div className='bg-muted rounded-2xl py-4 px-6 space-y-6'>
                {error && (
                    <Alert variant='destructive'>
                        <AlertCircleIcon />
                        <AlertTitle>{error.title}</AlertTitle>
                        <AlertDescription>{error.message}</AlertDescription>
                    </Alert>
                )}

                <p className='text-sm font-extralight'>Fields marked with * are mandatory.</p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>

                        {/*   CLUB NAME   */}
                        <FormField
                            name='name'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className='w-2/3'>
                                    <FormLabel>Club Name *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Enter the name of your club'
                                            maxLength={20}
                                            {...field} />
                                    </FormControl>

                                    <CharacterCounter currentNr={field.value.length || 0} maxNr={20} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/*   CLUB ADMISSION TYPE   */}
                        <FormField
                            name='type'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className='flex items-center space-x-2 w-2/3'>
                                    <FormLabel>Admission type *</FormLabel>

                                    <FormControl>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className='w-1/3'>
                                                <SelectValue placeholder='Select' />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value='open'>Open</SelectItem>
                                                <SelectItem value='closed'>Closed</SelectItem>
                                                <SelectItem value='invite_only'>Application</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/*   CLUB LOGO   */}
                        <FormField
                            name='logo'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className='w-2/3'>
                                    <FormLabel className='text-lg font-semibold'>Club Logo</FormLabel>
                                    <p className='text-xs font-extralight'>The ideal image size is 192 × 192 pixels. Max file size 200 KiB.</p>

                                    <div className='flex items-center gap-4'>
                                        <Avatar className='w-24 h-24'>
                                            {logoPreview ? (
                                                <AvatarImage src={logoPreview} alt='Logo preview' />
                                            ) : (
                                                <AvatarFallback />
                                            )}
                                        </Avatar>

                                        <FormControl>
                                            <Input
                                                id='club-logo-input'
                                                type='file'
                                                className='w-1/2'
                                                accept='image/*'
                                                onChange={(e) => field.onChange(e.target.files)}
                                            />
                                        </FormControl>

                                        {/*   REMOVE PICTURE BUTTON   */}
                                        <Button variant='destructive' onClick={() => {
                                            setLogoPreview(undefined)
                                            form.setValue('logo', null)}}>
                                            Remove picture
                                        </Button>
                                    </div>
                                </FormItem>
                            )}
                        />

                        {/*   CLUB DESCRIPTION   */}
                        <FormField
                            name='description'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className='w-2/3'>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className='resize-none h-20 overflow-y-auto'
                                            placeholder='A short description about the club...'
                                            rows={3}
                                            maxLength={200}
                                            {...field}
                                        />
                                    </FormControl>

                                    <CharacterCounter currentNr={field.value?.length || 0} maxNr={200} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/*   FORM BUTTONS   */}
                        <div className='flex justify-center gap-4 mt-10'>

                            {/*   CANCEL BUTTON   */}
                            <ConfirmCancelDialog
                                trigger={
                                    <Button variant='outlineDestructive' className='w-1/4'>Cancel</Button>
                                }
                                onConfirm={() => handleCancel()}
                            />

                            {/*   CREATE CLUB BUTTON   */}
                            <Button type='submit' variant='outline' className='w-1/4'>Create Club</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}