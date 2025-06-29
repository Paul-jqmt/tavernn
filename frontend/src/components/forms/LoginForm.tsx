import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import {AlertCircle, Loader2} from "lucide-react"
import { Form, FormField, FormLabel, FormMessage, FormItem, FormControl } from "@/components/ui/form.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {LoginFormValues, loginSchema} from "@/schemas/loginSchema.ts";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import authService from "@/services/authService.ts";
import {useUser} from "@/contexts/UserContext.tsx";

type AuthFormProps = {
    onSwitch: () => void;
};

export default function LoginForm({ onSwitch }: AuthFormProps) {
    const [error, setError] = useState<{ title: string; message: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { refreshUser } = useUser();

    const handleSwitch = () => {
        setError(null);
        form.reset();
        onSwitch();
    };

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleSubmit = async (data: LoginFormValues) => {
        setError(null);

        try {
            setLoading(true);
            await authService.login(data);

            await refreshUser();
            navigate('/profile', {replace: true});

        } catch (error: any) {
            let errorTitle = 'Error';
            let errorMessage = 'Something went wrong';

            console.log('response: ', error);
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message === 'Network Error') {
                errorTitle = 'Network Error';
                errorMessage = 'Unable to connect to server. Please check your internet or try again later.';
            } else if (error.message) {
                errorTitle = 'Login Error';
            }

            setError({ title: errorTitle, message: errorMessage });
            console.error('Login failed:', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-10 w-full max-w-md px-10">
            <h1 className="text-5xl font-extrabold text-white text-center">Login</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>{error.title}</AlertTitle>
                            <AlertDescription>{error.message}</AlertDescription>
                        </Alert>
                    )}

                    {/*   USERNAME   */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-white'>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="example@mail.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/*   PASSWORD   */}
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-white'>Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder='Enter your password' {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/*   LOGIN BUTTON  */}
                    <Button
                        type='submit'
                        disabled={loading}
                        className="w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
                    >
                        {loading && <Loader2 className="animate-spin"/>}
                        {loading ? 'Logging in' : 'Login'}
                    </Button>
                </form>
            </Form>

            {/*   REDIRECT TO REGISTER BUTTON   */}
            <p className="text-sm text-white font-light mt-4 text-center">
                New to Tavernn? {' '}
                <Button onClick={handleSwitch} variant='link' className="p-0 font-semibold text-primary hover:cursor-pointer">
                    Sign up to new adventures.
                </Button>
            </p>
        </div>
    );
}