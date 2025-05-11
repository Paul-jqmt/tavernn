import {useState, FormEvent, ChangeEvent} from "react";
import {Link} from "react-router-dom";
import logo from "@/assets/logo.svg";
import wavy_ligne from "@/assets/wavy-ligne.svg";

export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEmailError("");
        setPasswordError("");

        let hasError = false;

        if (!email.includes("@")) {
            setEmailError("Please enter a valid email");
            hasError = true;
        }

        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters");
            hasError = true;
        }

        if (!hasError) {
            console.log("Login data:", {email, password});
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-deep-purple">
            {/* LEFT COLUMN : LOGIN FORM */}
            <div
                className="w-full lg:w-1/2 flex items-center justify-center bg-deep-purple py-6 lg:min-h-0 min-h-screen">
                <div className="space-y-10 w-full max-w-md px-10">
                    <h1 className="text-3xl font-bold text-mid-orange text-center">Login</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* EMAIL */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="example@mail.com"
                                value={email}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                            />
                            {emailError && (
                                <p className="text-sm text-red-500 pl-2">{emailError}</p>
                            )}
                        </div>

                        {/* PASSWORD */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                            />
                            {passwordError && (
                                <p className="text-sm text-red-500 pl-2">{passwordError}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={!email || !password}
                            className="w-full bg-mid-orange disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-opacity"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-sm text-white font-light mt-4 text-center">
                        New to Tavernn?{" "}
                        <Link to="/signup" className="text-mid-orange hover:underline font-medium">
                            Sign up to new adventures.
                        </Link>
                    </p>
                </div>
            </div>

            {/* RIGHT COLUMN: WELCOME TEXT FOR LARGE SCREEN */}
            <div className="hidden lg:flex w-1/2 flex-col items-start justify-center px-30 bg-light-purple text-white">
                <img src={logo} alt="Tavernn Logo" className="h-30 w-30 object-contain mb-10"/>
                <h2 className="text-6xl font-bold">
                    Welcome to <br/> Tavernn.
                </h2>
                <img src={wavy_ligne} alt="text decoration"/>
                <p className="text-lg mt-8">
                    Where teams are forged<br/>and victories claimed.
                </p>
            </div>
        </div>
    );
}