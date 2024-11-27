import StarRatingQuantityItem from "@/components/items/review/star-rating-quantity-item";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ReviewFromEachUserCard from "./review-from-each-user_card";

import ReactPaginate from 'react-paginate';
import { useSelector } from "react-redux";
import { useGetSiteReviewsQuery } from "@/api/featureApi/reviewApiSlice";


const ReviewsFromUsersCard = () => {
    // const sideID = useSelector((state) => state.siteDetail.siteID);
    const siteDetail = useSelector((state) => state.siteDetail.amenityDetail);
    const { data: siteReviews } = useGetSiteReviewsQuery(siteDetail.siteId);

    return ( 
        <Card className='mb-5'>
            <CardHeader>
                <CardTitle>Đánh giá</CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-3 gap-x-12">
                <article>
                    <div className="flex items-center w-fit">
                        <div className="flex items-center text-2xl">
                            <span className='font-semibold'>{siteDetail?.averageRating?.toFixed(1)}</span>
                            <span className='material-icons text-3xl text-yellow-400 pr-2'>star</span>
                        </div>
                        <div className='pt-1'>{siteDetail.totalRating} đánh giá</div>
                    </div>

                    <div className="my-4">
                        <StarRatingQuantityItem star={5} receiveQuantity={siteDetail.fiveStarRating} maxQuantity={siteDetail.totalRating} />
                        <StarRatingQuantityItem star={4} receiveQuantity={siteDetail.fourStarRating} maxQuantity={siteDetail.totalRating} />
                        <StarRatingQuantityItem star={3} receiveQuantity={siteDetail.threeStarRating} maxQuantity={siteDetail.totalRating} />
                        <StarRatingQuantityItem star={2} receiveQuantity={siteDetail.twoStarRating} maxQuantity={siteDetail.totalRating} />
                        <StarRatingQuantityItem star={1} receiveQuantity={siteDetail.oneStarRating} maxQuantity={siteDetail.totalRating} />
                    </div>
    
                </article>

                <article className='col-span-2'>
                    {siteReviews?.data.length === 0 && (
                        <div className="flex flex-col items-center">
                            <span className='material-icons-outlined text-8xl text-gray-500'>rate_review</span>
                            <p className='text-center text-gray-500'>Chưa có đánh giá nào về địa điểm này</p>
                        </div>
                    )}
                    {siteReviews?.data.map((review) => (
                        <div key={review.id}>
                            <ReviewFromEachUserCard review={review} />
                            <Separator className='my-8' />
                        </div>
                    ))}

                </article>
            </CardContent>

            <CardFooter>
                <div className="w-full my-4 px-4 flex justify-center items-center">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">>"
                        // onPageChange={handlePageClick}
                        pageRangeDisplayed={4}
                        pageCount={siteReviews?.pagination?.totalPages}
                        previousLabel="<<"

                        pageClassName="join-item btn"
                        previousClassName="join-item btn"
                        nextClassName="join-item btn"
                        containerClassName="join"
                        activeClassName="btn-active"
                    />
                </div>
            </CardFooter>
        </Card>
     );
}
 
export default ReviewsFromUsersCard;