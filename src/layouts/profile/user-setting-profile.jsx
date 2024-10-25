import MainHeader from "@/components/headers/main-header";
import ProfileSidebar from "@/components/sidebar/profile-sidebar";
import { Toaster } from "@/components/ui/toaster";
import PropTypes from "prop-types";

const UserSettingProfileLayout = ({ children }) => {
    return ( 
        <div className="min-h-screen">
            <MainHeader />
            <div className="pt-[6.8rem] px-40">
                <div className="grid grid-cols-3 gap-5">
                    <ProfileSidebar />

                    <div className="col-span-2">
                        {children}
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
     );
}


UserSettingProfileLayout.propTypes = {
    children: PropTypes.node.isRequired
}
export default UserSettingProfileLayout;