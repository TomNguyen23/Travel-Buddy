import vi from 'date-fns/locale/vi'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

// eslint-disable-next-line react/prop-types
const MyNotificationItem = ({date="2024-10-20"}) => {
    const distanceToNow = formatDistanceToNow(
        new Date(date),
        { locale: vi,addSuffix: true}
    );
    return ( 
        <div className="flex items-center w-full p-4 mb-1 shadow-md border dark:bg-[#1D232A] hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md">
            <img src="https://picsum.photos/200" className=" size-14 rounded-full" alt="" />

            <div className="pl-3">
                <h1 className="text-lg font-semibold">Travel Buddy Admin</h1>
                <p className="text-sm">
                    Địa điểm của bạn đăng tải đã được phê duyệt. 
                    Hãy tiếp tục chia sẻ những địa điểm mới lạ cho cộng đồng được biết và khám phá!!
                </p>

                <p className="text-xs text-slate-500">{distanceToNow}</p>
            </div>
        </div>
     );
}
 
export default MyNotificationItem;