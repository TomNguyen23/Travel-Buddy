import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const ProfileSideBarItem = ({ navigateTo, children }) => {
    return ( 
        <div className="px-4 pt-4 pb-2">
            <Link
                className={(window.location.href.indexOf(navigateTo) !== -1) 
                    ? "text-blue-500 hover:text-blue-600" 
                    : "text-gray-500 hover:text-gray-600"}
                to={navigateTo}>

            <div className="text-sm font-bold">
                {children}
            </div>
            </Link>
        </div>
     );
}
ProfileSideBarItem.propTypes = {
    navigateTo: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default ProfileSideBarItem;