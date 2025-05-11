import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import logo from "@/assets/logo.svg";
import wavy_ligne from "@/assets/wavy-ligne.svg";
import {Link} from "react-router-dom";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    terms: z.boolean().refine(val => val, {
        message: "You must agree to the terms.",
    }),
})

export default function SignupPage() {
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
        <div className="min-h-screen flex flex-col lg:flex-row bg-deep-purple">
            {/*   LEFT COLUMN : SIGNUP FORM   */}
            <div
                className="w-full lg:w-1/2 flex items-center justify-center bg-deep-purple py-6 lg:min-h-0 min-h-screen">
                <div className="space-y-10 w-full max-w-md px-10">
                    <h1 className="text-3xl font-bold text-mid-orange text-center">Signup</h1>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/*   USERNAME   */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="example@mail.com" {...field} />
                                        </FormControl>
                                        <FormMessage className="pl-2"/>
                                    </FormItem>
                                )}
                            />

                            {/*   PASSWORD   */}
                            <FormField
                                control={form.control}
                                name='password'
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type='password' placeholder='Enter password' {...field}/>
                                        </FormControl>
                                        <FormMessage className="pl-2"/>
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
                                        <FormMessage className="pl-3"/>
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
                                                <Checkbox className="border-2" checked={field.value}
                                                          onCheckedChange={field.onChange}/>
                                            </FormControl>
                                            <FormLabel className="font-extralight text-xs data-[error=true]:text-white">
                                                I have read and agreed to Tavernn's Terms of Service and Privacy Policy.
                                            </FormLabel>
                                        </div>
                                        {!termsChecked && (
                                            <p className="text-xs text-destructive text-center mt-2">
                                                Please agree to the terms to continue.
                                            </p>
                                        )}
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
                    <p className="text-sm text-white font-light mt-4 text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="text-mid-orange hover:underline font-medium">
                            Sign in to join your team.
                        </Link>
                    </p>
                </div>
            </div>

            {/*   RIGHT COLUMN: WELCOME TEXT FOR LARGE SCREEN   */}
            <div
                className="hidden lg:flex w-1/2 flex-col items-start justify-center px-30 bg-light-purple text-white bg-light-purple">
                <img src={logo} alt="Tavernn Logo" className="h-30 w-30 object-contain mb-10"/>
                <h2 className="text-6xl font-bold"> Welcome to <br/> Tavernn.</h2>
                <img src={wavy_ligne} alt={"text decoration"}/>
                <p className="text-lg mt-8">
                    Where teams are forged<br/>and victories claimed.
                </p>
            </div>
        </div>
    );
}