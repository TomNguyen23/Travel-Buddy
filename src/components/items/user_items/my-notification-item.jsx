import vi from 'date-fns/locale/vi'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import PropTypes from 'prop-types'

import DefaultAvatar from "@/assets/images/default-avt.png";

const MyNotificationItem = (props) => {
    const distanceToNow = formatDistanceToNow(
        new Date(props.myNoti.createdAt),
        { locale: vi,addSuffix: true}
    );
    return ( 
        <div className="flex items-center w-full p-4 mb-1 shadow-md border dark:bg-[#1D232A] hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md">
            {props.myNoti.UserImageUrl 
            ? <img src={props.myNoti.UserImageUrl} className=" size-14 rounded-full" alt="" /> 
            : <img src={DefaultAvatar} className=" size-14 rounded-full" alt="" />
            }

            <div className="pl-3">
                <h1 className="text-lg font-semibold">{props.myNoti.userName}</h1>
                <p className="text-sm">
                    {props.myNoti.fullMessage}
                </p>

                <p className="text-xs text-slate-500">{distanceToNow}</p>
            </div>
        </div>
     );
}
MyNotificationItem.propTypes = {
    myNoti: PropTypes.shape({
        userName: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        UserImageUrl: PropTypes.string.isRequired,
        fullMessage: PropTypes.string.isRequired
    }).isRequired,
};

export default MyNotificationItem;