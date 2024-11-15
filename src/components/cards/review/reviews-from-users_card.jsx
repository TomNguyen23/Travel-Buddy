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

const ReviewsFromUsersCard = () => {
    return ( 
        <Card className='mb-5'>
            <CardHeader>
                <CardTitle>Đánh giá</CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-3 gap-x-12">
                <article>
                    <div className="flex items-center w-fit">
                        <div className="flex items-center text-2xl">
                            <span className='font-semibold'>4.6</span>
                            <span className='material-icons text-3xl text-yellow-400 pr-2'>star</span>
                        </div>
                        <div className='pt-1'>200 đánh giá</div>
                    </div>

                    <div className="my-4">
                        <StarRatingQuantityItem star={5} receiveQuantity={150} maxQuantity={200} />
                        <StarRatingQuantityItem star={4} receiveQuantity={30} maxQuantity={200} />
                        <StarRatingQuantityItem star={3} receiveQuantity={5} maxQuantity={200} />
                        <StarRatingQuantityItem star={2} receiveQuantity={15} maxQuantity={200} />
                        <StarRatingQuantityItem star={1} receiveQuantity={0} maxQuantity={200} />
                    </div>
    
                </article>

                <article className='col-span-2'>
                    <ReviewFromEachUserCard />
                    <Separator className='my-8' />
                    <ReviewFromEachUserCard />
                    
                </article>
            </CardContent>

            <CardFooter>
                <div className="w-full my-4 px-4 flex justify-center items-center">
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
            </CardFooter>
        </Card>
     );
}
 
export default ReviewsFromUsersCard;