import Navbar from "@/components/Navbar.tsx";
import defaultIcon from "@/assets/default-icon.svg";

export default function ProfilePage(){
  return (
      <>
          <Navbar />

          <div className="max-w-4xl mx-auto p-8 space-y-8 mt-30">
              <div className="flex flex-col items-center gap-4">
                  <img src={defaultIcon} className="w-32 h-32 rounded-full object-cover" />

                  <div className="text-center">
                      <h1 className="text-3xl font-bold text-white">scuzedederanj</h1>
                      <p className="text-sm text-brand-light_orange">@scuzedederanj</p>
                  </div>
              </div>

              {/* User Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
                  <div>
                      <p className="text-sm text-brand-grey">Email</p>
                      <p className="text-lg">carameeapele@gmail.com</p>
                  </div>

                  <div>
                      <p className="text-sm text-brand-grey">Joined</p>
                      <p className="text-lg">12.05.2025</p>
                  </div>

                  <div>
                      <p className="text-sm text-brand-grey">Open at Invite</p>
                      <p className="text-lg">"Open"</p>
                  </div>
              </div>

              {/* Actions */}
              <div className="flex justify-center mt-6">
                  <button className="px-6 py-2 rounded-md bg-mid-orange text-white hover:bg-light-orange transition">
                      Edit Profile
                  </button>
              </div>
          </div>
      </>
  );
}