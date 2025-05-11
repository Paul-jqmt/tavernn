// src/pages/LoginPage.tsx
import {ChangeEvent, FormEvent, useState} from "react";
import {Link} from "react-router-dom";
import {Button} from "@/components/common/ui/button";
import {FormField} from "@/components/common/ui/form-field";
import {WelcomeSection} from "@/components/common/layout/WelcomeSection";

export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (emailError) setEmailError("");
    };


    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (passwordError) setPasswordError("");
    };

    const validateForm = () => {
        let isValid = true;
        setEmailError("");
        setPasswordError("");

        if (!email) {
            setEmailError("Email is required");
            isValid = false;
        } else if (!email.includes("@")) {
            setEmailError("Please enter a valid email");
            isValid = false;
        }

        if (!password) {
            setPasswordError("Password is required");
            isValid = false;
        } else if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters");
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isFormValid = validateForm();

        if (isFormValid) {
            // TODO: Add actual login logic here
            console.log("Login data:", {email, password});
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-deep-purple">
            {/* LEFT COLUMN: LOGIN FORM */}
            <div
                className="w-full lg:w-1/2 flex items-center justify-center bg-deep-purple py-6 lg:min-h-0 min-h-screen">
                <div className="space-y-10 w-full max-w-md px-10">
                    {/* Login Title */}
                    <h1 className="text-3xl font-bold text-mid-orange text-center">
                        Login
                    </h1>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <FormField
                            id="email"
                            label="Email"
                            type="email"
                            placeholder="example@mail.com"
                            value={email}
                            onChange={handleEmailChange}
                            error={emailError}
                        />

                        <FormField
                            id="password"
                            label="Password"
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={handlePasswordChange}
                            error={passwordError}
                        />

                        <Button
                            type="submit"
                            disabled={!email || !password}
                            className="w-full bg-mid-orange disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Login
                        </Button>
                    </form>

                    {/* Sign up link */}
                    <p className="text-sm text-white font-light mt-4 text-center">
                        New to Tavernn?{" "}
                        <Link to="/signup" className="text-mid-orange hover:underline font-medium">
                            Sign up to new adventures.
                        </Link>
                    </p>
                </div>
            </div>

            {/* RIGHT COLUMN: WELCOME TEXT (Desktop only) */}
            <WelcomeSection/>
        </div>
    );
}