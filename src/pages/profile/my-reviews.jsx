import { useGetMyReviewsQuery } from '@/api/featureApi/reviewApiSlice';
import MyReviewItem from '@/components/items/user_items/my-review-item';
import ReactPaginate from 'react-paginate';

const MyReviews = () => {
    const {data: myReviews} = useGetMyReviewsQuery();
    return ( 
        <>
            <h1 className="text-3xl font-semibold">Đánh giá của tôi về các địa điểm</h1>
            <main className="mt-4">
                {myReviews?.data.map(review => (
                    <MyReviewItem key={review.id} review={review} />
                ))}
            </main>

            <div className="w-full my-4 px-4 flex justify-end items-center">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">>"
                    // onPageChange={handlePageClick}
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
        </>
     );
}
 
export default MyReviews;