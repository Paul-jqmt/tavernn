import {useState} from "react";
import LoginForm from "@/components/forms/LoginForm.tsx";
import RegisterForm from "@/components/forms/RegisterForm.tsx";
import logo from "@/assets/icons/logo.svg";
import wavy_ligne from "@/assets/icons/wavy-ligne.svg";
import clsx from "clsx";

export default function AuthenticationPage() {
    const [mode, setMode] = useState<"login" | "signup">("login");

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-foreground">
            {/*   WELCOME TEXT   */}
            <div className={clsx("absolute top-0 h-full w-full lg:w-1/2 bg-background text-foreground transition-all duration-700 ease-in-out z-20 px-20 py-16 hidden lg:flex flex-col items-start justify-center",
                    mode === "login" ? "left-0" : "left-1/2")}>
                <img src={logo} alt="Tavernn Logo" className="h-30 w-30 object-contain mb-10" />
                <h1 className="text-6xl font-bold"> Welcome to <br /> Tavernn.</h1>
                <img src={wavy_ligne} alt={"text decoration"}/>
                <p className="text-xl mt-8 font-extralight">
                    Where teams are forged<br />and victories claimed.
                </p>
            </div>

            {/*   FORM WRAPPER   */}
            <div className="relative w-full h-screen overflow-hidden z-10 lg:flex-row">

                {/*   LEFT COLUMN: REGISTER FORM   */}
                <div className={clsx("absolute w-full lg:w-1/2 h-full top-0 left-0 flex items-center justify-center transition-opacity duration-500 px-8",
                    mode === "login" ? "opacity-0 pointer-events-none" : "opacity-100")}>
                    <RegisterForm onSwitch={() => setMode("login")} />
                </div>

                {/*   RIGHT COLUMN: LOGIN FORM   */}
                <div
                    className={clsx("absolute w-full lg:w-1/2 h-full top-0 right-0 flex items-center justify-center transition-opacity duration-500 px-8",
                        mode === "signup" ? "opacity-0 pointer-events-none" : "opacity-100")}>
                    <LoginForm onSwitch={() => setMode("signup")} />
                </div>
            </div>
        </div>
    );
}

