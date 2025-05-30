import Navbar from "@/components/common/Navbar.tsx";
import ProfileSideColumn from "@/components/common/ProfileSideColumn.tsx";

export default function ClubViewPage() {

    return (
        <>
            <Navbar />

            <div className="flex items-stretch min-h-screen gap-8 p-10 text-white pt-32">

                <ProfileSideColumn />

            </div>
        </>
    )
}
