import ReactPaginate from 'react-paginate';

import MyNotificationItem from "@/components/items/user_items/my-notification-item";
import { useGetNotificationQuery } from '@/api/featureApi/notificationApiSlice';
import MyNotification_SkeletonItem from '@/components/items/user_items/my-notification-skeleton-item';

const MyNotifications = () => {
    const { data:myNotis, isLoading } = useGetNotificationQuery();
    return ( 
        <>
            <h1 className="text-3xl font-semibold">Thông báo</h1>
            <main className="mt-4">
                {isLoading 
                ? <MyNotification_SkeletonItem /> 
                : (myNotis?.data.map((myNoti, index) => (
                    <MyNotificationItem key={index} myNoti={myNoti} />
                )))
                }

                {/* {myNotis?.data.map((myNoti, index) => (
                    <MyNotificationItem key={index} myNoti={myNoti} />
                ))} */}
                
            </main>

            <div className="w-full my-4 px-4 flex justify-end items-center">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">>"
                    // onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    // pageCount={totalPages}
                    previousLabel="<<"

                    pageClassName="join-item btn"
                    previousClassName="join-item btn"
                    nextClassName="join-item btn"
                    containerClassName="join"
                    activeClassName="btn-active"
                />
            </div>
        </>
     );
}
 
export default MyNotifications;