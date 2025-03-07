import { useGetMyReviewsQuery } from '@/api/featureApi/reviewApiSlice';
import MyReviewItem from '@/components/items/user_items/my-review-item';
import ReactPaginate from 'react-paginate';

import { useState } from 'react';

const MyReviews = () => {
    const [page, setPage] = useState(1);
    const {data: myReviews} = useGetMyReviewsQuery(page, {refetchOnMountOrArgChange: true});

    const handleChangePage = (e) => {
        setPage(e.selected + 1);
    }

    return ( 
        <>
            <h1 className="text-3xl font-semibold">Đánh giá của tôi về các địa điểm</h1>
            <main className="mt-4">
                {myReviews && myReviews.data && myReviews.data.length > 0 ? (
                    myReviews?.data.map((review) => (
                        <MyReviewItem key={review.id} review={review} />
                    ))
                ) : (
                    <div className='flex flex-col items-center gap-4 mt-20'>
                        <span className='material-icons-outlined text-9xl text-gray-500'>thumbs_up_down</span>
                        <div className="text-center text-lg text-gray-500">Bạn chưa có đánh giá nào</div>
                    </div>
                )}
            </main>

            {myReviews && myReviews.data && myReviews.data.length > 0 && (
                <div className="w-full my-4 px-4 flex justify-end items-center">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">>"
                        onPageChange={handleChangePage}
                        pageRangeDisplayed={5}
                        pageCount={myReviews?.pagination?.totalPages}
                        previousLabel="<<"

                        pageClassName="join-item btn"
                        previousClassName="join-item btn"
                        nextClassName="join-item btn"
                        containerClassName="join"
                        activeClassName="btn-active"
                    />
                </div>
            )}

        </>
     );
}
 
export default MyReviews;