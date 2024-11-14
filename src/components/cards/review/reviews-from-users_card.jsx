import StarRatingQuantityItem from "@/components/items/review/star-rating-quantity-item";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import ReviewFromEachUserCard from "./review-from-each-user_card";

const ReviewsFromUsersCard = () => {
    return ( 
        <Card>
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
                </article>
            </CardContent>
        </Card>
     );
}
 
export default ReviewsFromUsersCard;