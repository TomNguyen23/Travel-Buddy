import { Toaster } from "@/components/ui/toaster";
import PropTypes from "prop-types";

import authImage from "@/assets/images/auth-image.jpg";

const AuthLayout = ({children}) => {
    return ( 
        <div className="flex justify-center items-center min-h-screen">
            <div className="h-[43.75rem] w-[71rem] flex justify-around items-center">
                <img className="w-[30rem] h-full object-cover rounded-3xl" src={authImage} alt="auth image" />
                <div className="w-[25rem]">
                    {children}
                </div>
                <Toaster />
            </div>
        </div>
     );
}

AuthLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };
 
export default AuthLayout;