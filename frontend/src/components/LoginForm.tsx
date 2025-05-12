import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Form, FormField, FormLabel, FormMessage, FormItem, FormControl} from "@/components/ui/form";
import { z } from "zod";
import {useForm} from "react-hook-form";
import { zodResolver} from "@hookform/resolvers/zod";

type AuthFormProps = {
    onSwitch: () => void;
};

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export default function LoginForm({ onSwitch }: AuthFormProps) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: any) => {
        console.log("Login data:", data);
    };

    return (
        <div className="space-y-10 w-full max-w-md px-10">
            <h1 className="text-5xl font-extrabold text-mid-orange text-center">Login</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder='Enter password' {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type='submit'
                        className="w-full bg-mid-orange disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold">
                        Login
                    </Button>
                </form>
            </Form>
            <p className="text-sm text-white font-light mt-4 text-center">
                New to Tavernn?{" "}
                <button onClick={onSwitch} className="font-semibold text-mid-orange hover:underline hover:cursor-pointer">
                    Sign up to new adventures.
                </button>
            </p>
        </div>
    );
}