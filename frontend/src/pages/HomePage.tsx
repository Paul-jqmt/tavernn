import LandingNavbar from "../components/HomeNavbar.tsx";

export default function HomePage() {
    return (
        <>
            <LandingNavbar />
            <div className="min-h-screen px-10 pt-20 text-white">
                <div className="max-w-4xl mx-auto mt-20 text-left">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Meet up at Tavernn.<br/>Win together.
                    </h1>
                    <p className="mt-6 text-base text-white/90 max-w-xl">
                        Join or create clubs with multiple teams across the games you love.
                        Connect with gamers like you. Train and compete together in tournaments.
                    </p>
                </div>

                <section className="pb-20 pt-20 max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold mb-8">How it works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white/10 p-6 rounded-xl">
                            <h3 className="text-2xl font-semibold mb-2">1. Discover Clubs</h3>
                            <p>Browse existing clubs by game, level and type. Find your next team.</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-xl">
                            <h3 className="text-2xl font-semibold mb-2">2. Join or Create</h3>
                            <p>Join open recruitment or create your own club and invite friends.</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-xl">
                            <h3 className="text-2xl font-semibold mb-2">3. Compete & Win</h3>
                            <p>Train with teammates, enter tournaments, and climb the leaderboards.</p>
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
}