import Navbar from "@/components/common/Navbar.tsx";
import {Button} from "@/components/ui/button.tsx";
import ProfileSideColumn from "@/components/common/ProfileSideColumn.tsx";
import ProfileGameList from "@/components/common/ProfileGameList.tsx";
import { useState } from "react";
import ProfileSettings from "@/components/common/ProfileSettings.tsx";

export default function ProfilePage(){
    const [ activeTab, setActiveTab ] = useState<'games' | 'settings'>('games');

    return (
      <>
          <Navbar />

          <div className="flex items-stretch max-h-screen gap-8 p-10 text-white pt-32">

              <ProfileSideColumn />

              {/*   MAIN CONTENT AREA   */}
              <div className='flex-1 flex flex-col'>
                  <div id='profile-sub-header' className='flex justify-between items-center mb-5'>
                      <h1 className='text-5xl font-extrabold'>Profile</h1>
                      <div className='flex gap-2'>
                          {/*   GAMES BUTTON   */}
                          <Button
                              variant={activeTab === 'games' ? 'ghost' : 'outline'}
                              onClick={() => setActiveTab('games')}>
                              Games
                          </Button>

                          {/*   SETTINGS BUTTON   */}
                          <Button
                              variant={activeTab === 'settings' ? 'ghost' : 'outline'}
                              onClick={() => setActiveTab('settings')}>
                              Settings
                          </Button>
                      </div>
                  </div>

                  <div id='profile-main-frame' className='bg-deep-purple rounded-2xl w-full p-6 flex-1 overflow-hidden'>
                      {activeTab === 'games' && <ProfileGameList />}
                      {activeTab === 'settings' && <ProfileSettings />}
                  </div>
              </div>
          </div>
      </>
  );
}