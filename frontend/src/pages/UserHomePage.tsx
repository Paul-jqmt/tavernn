import Navbar from "@/components/common/Navbar.tsx";

export default function UserHomePage() {

    return (
        <>
            <Navbar />

            <main className="flex items-stretch min-h-screen gap-4">
                <aside className='bg-muted w-full max-w-xs rounded-2xl px-4 py-6 flex flex-col'>

                </aside>

                <div className='flex-1 flex flex-col'>
                    <h2 className='page-title'>Latest News</h2>
                </div>
            </main>
        </>
    )
}