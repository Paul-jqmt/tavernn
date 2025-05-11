import logo from "@/assets/logo.svg";
import wavy_ligne from "@/assets/wavy-ligne.svg";
import {WelcomeSectionProps} from "@/types/ui/welcome.section.ts"

export function WelcomeSection(props: WelcomeSectionProps) {
    return (
        <div className="hidden lg:flex w-1/2 flex-col items-start justify-center px-30 bg-light-purple text-white">
            <img
                src={logo}
                alt="Tavernn Logo"
                className="h-30 w-30 object-contain mb-10"
            />
            <h2 className="text-6xl font-bold">
                Welcome to <br/> Tavernn.
            </h2>
            <img
                src={wavy_ligne}
                alt="Decorative wavy line"
            />
            <p className="text-lg mt-8">
                Where teams are forged<br/>and victories claimed.
            </p>
        </div>
    );
}