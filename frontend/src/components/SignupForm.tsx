import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox} from "@/components/ui/checkbox";
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
    confirmPassword: z.string().min(8),
    terms: z.boolean().refine(val => val, {
        message: "You must agree to the terms.",
    }),
})

export default function SignupForm({ onSwitch }: AuthFormProps) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
        },
    });

    const termsChecked = form.watch("terms");

    const onSubmit = (data: any) => {
        console.log("Signup data:", data);
    };

    return (
        <div className="space-y-10 w-full max-w-md px-10">
            <h1 className="text-3xl font-bold text-mid-orange text-center">Signup</h1>

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

                    {/*   CONFIRM PASSWORD   */}
                    <FormField
                        control={form.control}
                        name='confirmPassword'
                        render={(field) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder='Enter password again' {...field}/>
                                </FormControl>
                                <FormMessage />
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
                        className="w-full bg-mid-orange disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!termsChecked}
                    >
                        Signup
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