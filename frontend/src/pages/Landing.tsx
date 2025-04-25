import Navbar from '../components/Navbar'

export default function Landing() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-900 to-purple-600 text-white">
            <Navbar />

            {/* Hero */}
            <section className="px-10 py-20 max-w-4xl mx-auto">
                <h1 className="text-5xl font-extrabold leading-tight mb-6">
                    Meet up at Tavernn.<br/>
                    Win together.
                </h1>
                <p className="text-lg max-w-2xl mb-16">
                    Join or create clubs with multiple teams across the games you love. Connect with gamers like you. Train and compete together in tournaments.
                </p>
            </section>

            {/* How it works */}
            <section className="px-10 pb-20 max-w-4xl mx-auto">
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
    )
}
