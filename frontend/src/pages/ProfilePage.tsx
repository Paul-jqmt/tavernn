import Navbar from "@/components/common/Navbar.tsx";
import {Button} from "@/components/ui/button.tsx";
import ProfileSideColumn from "@/components/common/ProfileSideColumn.tsx";
import ProfileGameList from "@/components/common/ProfileGameList.tsx";

export default function ProfilePage(){
    return (
      <>
          <Navbar />

          <div className="min-h-screen px-10 pt-30 pb-10 text-white flex gap-8">

              <ProfileSideColumn />

              {/*   MAIN CONTENT AREA   */}
              <main className='h-full flex-1 flex flex-col'>
                  <div id='profile-sub-header' className='flex justify-between items-center mb-5'>
                      <h1 className='text-5xl font-extrabold'>Profile</h1>
                      <div className='flex gap-2'>
                          <Button variant='outline'>Games</Button>
                          <Button variant='outline'>Settings</Button>
                      </div>
                  </div>

                  <div id='profile-main-frame' className='bg-deep-purple rounded-2xl w-full p-6'>
                      <ProfileGameList />
                  </div>
              </main>
          </div>
      </>
  );
}