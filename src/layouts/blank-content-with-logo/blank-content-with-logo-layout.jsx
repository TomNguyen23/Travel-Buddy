import { Toaster } from "@/components/ui/toaster";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PersonalizeLayout = ({ children }) => {
    return ( 
        <div className="min-h-screen">
            <header className="flex items-center px-16 py-4">
                <Link to="/" className="flex items-center">
                    {/* <img className="h-11 w-11 rounded-full" src="https://picsum.photos/200" alt="" /> */}
                    <h1 className="text-2xl font-bold ml-3">Travel Buddy</h1>
                </Link>
            </header>

            <div>
                {children}
            </div>
            <Toaster />
        </div>
     );
}

PersonalizeLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
 
export default PersonalizeLayout;