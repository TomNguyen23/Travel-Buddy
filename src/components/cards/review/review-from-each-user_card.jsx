import LikeItem from "@/components/items/review/like-item";
import ReportReviewItem from "@/components/items/report/report-review-item";
import ReportUserItem from "@/components/items/report/report-user-item";
import StarRatingLabelItem from "@/components/items/review/star-rating-label-item";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import DefaultAvatar from "@/assets/images/default-avt.png";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

import PropTypes from 'prop-types';
import format from 'date-fns/format'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getReviewID } from "@/redux/reducer/site-detail.reducer";
import { useRemoveReviewMutation } from "@/api/featureApi/reviewApiSlice";

const ReviewFromEachUserCard = (props) => {
    const { toast } = useToast();
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const myID = useSelector((state) => state.auth.login.user.id);

    const handleGetReviewID = (id) => {
        dispatch(getReviewID(id));
        navigateTo('/review/site/update');
    }

    const [removeReview] = useRemoveReviewMutation();
    const handleDeleteReview = (reviewId) => {
        removeReview(reviewId)
            .unwrap()
            .then(() => {
                toast({
                    title: "Xóa đánh giá thành công",
                    description: "Đánh giá của bạn đã được xóa thành công",
                })
            })
            .catch((error) => {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Có gì đó sai sai.",
                    description: error.data.message,
                    action: <ToastAction altText="Try again">Thử lại</ToastAction>,
                })
            })
    }

    return ( 
        <section>
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Avatar>
                        {props.review.user.avatar ? 
                            <AvatarImage src={props.review.user.avatar} className='object-cover' /> :
                            <AvatarImage src={DefaultAvatar} />
                        }
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="pl-2">
                        <h3 className="text-lg font-medium">{props.review.user.nickname}</h3>
                        <p className="text-sm text-gray-500">Đã đánh giá vào {format(props.review.date, "dd/MM/yyyy")}</p>
                    </div>
                </div>

                <div className="flex items-center">
                    {myID === props.review.user.id &&
                        <DropdownMenu>
                            <DropdownMenuTrigger className="mr-4">
                                <span className="material-icons text-xl">more_horiz</span>
                            </DropdownMenuTrigger>
        
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleGetReviewID(props.review.id)} >
                                    Chỉnh sửa
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteReview(props.review.id)} className="text-red-700">
                                    Xóa đánh giá
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }
                    <div className="flex items-center">
                        <LikeItem reviewID={props.review.id} likeStatus={props.review.userReaction} />
                        <span className="pl-1">{props?.review?.likeCount}</span>
                    </div>

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="m-1">
                            <span className="material-icons-outlined">flag</span>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-md border z-[1] w-52 p-1 shadow">
                            <li><ReportReviewItem reviewID={props.review.id} /></li>
                            <li><ReportUserItem userID={props.review.user.id} /></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="my-3">
                <StarRatingLabelItem star={props.review.generalRating} size="md" />

                <p className="text-gray-500">
                    {props.review.comment}
                </p>

                <span className="flex items-center">
                    <span className="text-sm font-medium pr-1">Đã ở đây: </span>
                    <span className="text-sm text-gray-500">{format(props.review.arrivalDate, "dd/MM/yyy")}</span>
                </span>

                <div className="grid grid-cols-3 gap-1 mt-3">
                {props.review.medias.map((media, index) => {
                    if (media.mediaType === 'IMAGE') {
                        return <img key={index} 
                                    src={media.url} 
                                    className="w-full h-40 object-cover bg-center rounded-md" 
                                    alt="Review Media" 
                                />;
                    } else if (media.mediaType === 'VIDEO') {
                        return <video key={index} 
                                    className="w-full h-36 object-cover rounded-md" 
                                    controls 
                                    autoPlay 
                                    loop
                                    muted
                                >
                                <source src={media.url} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>;
                    } else {
                        return null;
                    }
                })}
                
                </div>

            </div>
        </section>
     );
}
ReviewFromEachUserCard.propTypes = {
    review: PropTypes.shape({
        id: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        arrivalDate: PropTypes.string.isRequired,
        user: PropTypes.shape({
            id: PropTypes.number.isRequired,
            avatar: PropTypes.string,
            nickname: PropTypes.string.isRequired,
        }).isRequired,
        likeCount: PropTypes.number.isRequired,
        generalRating: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
        medias: PropTypes.arrayOf(PropTypes.shape({
            mediaType: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })).isRequired,
        userReaction: PropTypes.string.isRequired,
    }).isRequired,
};

export default ReviewFromEachUserCard;