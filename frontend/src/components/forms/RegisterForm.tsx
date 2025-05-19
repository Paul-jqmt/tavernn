import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Checkbox} from "@/components/ui/checkbox.tsx";
import { Loader2 } from "lucide-react"
import {Form, FormField, FormLabel, FormMessage, FormItem, FormControl} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import { zodResolver} from "@hookform/resolvers/zod";
import {RegisterFormValues, registerSchema} from "@/schemas/registerSchema.ts";
import api from "@/services/api.ts";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircle} from "lucide-react";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

type AuthFormProps = {
    onSwitch: () => void;
};

export default function RegisterForm({ onSwitch }: AuthFormProps) {
    const [error, setError] = useState<{ title: string; message: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
        },
    });

    const termsChecked = form.watch("terms");

    const onSubmit = async (data: RegisterFormValues) => {
        setLoading(true);
        const { email, password } = data;

        const payload = {
          email, password,
          username: 'username',
          discord: '',
          openAtInvite: true,
        };

        try {
            const response = await api.post("/api/auth/register", payload);
            const { accessToken } = response.data;
            localStorage.setItem('token', accessToken);

            navigate('/profile');
        } catch (error: any) {
            let errorTitle = 'Error';
            let errorMessage = 'Something went wrong';

            if (error.response && error.response.data?.message) {
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
            <h1 className="text-5xl font-extrabold text-mid-orange text-center">Signup</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="example@mail.com" {...field} />
                                </FormControl>
                                <FormMessage className='text-white' />
                            </FormItem>
                        )}
                    />

                    {/*   PASSWORD   */}
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder='Enter password' {...field}/>
                                </FormControl>
                                <FormMessage className='text-white' />
                            </FormItem>
                        )}
                    />

                    {/*   CONFIRM PASSWORD   */}
                    <FormField
                        control={form.control}
                        name='confirmPassword'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder='Enter password again' {...field}/>
                                </FormControl>
                                <FormMessage className='text-white'/>
                            </FormItem>
                        )}
                    />

                    {/*   TERMS   */}
                    <FormField
                        control={form.control}
                        name='terms'
                        render={({field}) => (
                            <FormItem className="px-10">
                                <div className="flex items-center space-x-0">
                                    <FormControl>
                                        <Checkbox className="border-2" checked={field.value} onCheckedChange={field.onChange}/>
                                    </FormControl>
                                    <FormLabel className="font-extralight text-xs data-[error=true]:text-white">
                                        I have read and agreed to Tavernn's Terms of Service and Privacy Policy.
                                    </FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />

                    <Button
                        type='submit'
                        className="w-full bg-mid-orange disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                        disabled={!termsChecked || loading}
                    >
                        {loading && <Loader2 className="animate-spin"/>}
                        {loading ? 'Registering' : 'Signup'}
                    </Button>
                </form>
            </Form>
            <p className="text-sm mt-6 text-white text-center font-light">
                Already have an account?{" "}
                <button onClick={onSwitch} className="font-semibold text-mid-orange hover:underline hover:cursor-pointer">
                    Sign in to join your team.
                </button>
            </p>
        </div>
    );
}