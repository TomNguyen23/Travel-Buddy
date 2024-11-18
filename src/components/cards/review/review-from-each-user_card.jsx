import LikeItem from "@/components/items/review/like-item";
import ReportItem from "@/components/items/review/report-item";
import StarRatingLabelItem from "@/components/items/review/star-rating-label-item";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import DefaultAvatar from "@/assets/images/default-avt.png";

import PropTypes from 'prop-types';
import format from 'date-fns/format'

const ReviewFromEachUserCard = (props) => {
    return ( 
        <section>
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Avatar>
                        {props.review.user.avatar ? 
                            <AvatarImage src={props.review.user.avatar} /> :
                            <AvatarImage src={DefaultAvatar} />
                        }
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="pl-2">
                        <h3 className="text-lg font-medium">{props.review.user.nickname}</h3>
                        <p className="text-sm text-gray-500">Đã đánh giá vào {format(props.review.date, "dd/MM/yyyy")}</p>
                    </div>
                </div>

                <div>
                    <LikeItem />
                    <ReportItem />
                </div>
            </div>

            <div className="my-3">
                <StarRatingLabelItem star={props.review.generalRating} size="md" />

                <p className="text-gray-500">
                    {props.review.comment}
                </p>

                <span className="flex items-center">
                    <span className="text-sm font-medium pr-1">Đã ở đây: </span>
                    <span className="text-sm text-gray-500">{props.review.arrivalDate}</span>
                </span>

                <div className="grid grid-cols-3 gap-1 mt-3">
                {props.review.medias.map((media, index) => {
                    if (media.mediaType === 'IMAGE') {
                        return <img key={index} 
                                    src={media.url} 
                                    className="w-full h-36 object-cover rounded-md" 
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
        date: PropTypes.string.isRequired,
        arrivalDate: PropTypes.string.isRequired,
        user: PropTypes.shape({
            avatar: PropTypes.string,
            nickname: PropTypes.string.isRequired,
        }).isRequired,
        generalRating: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
        medias: PropTypes.arrayOf(PropTypes.shape({
            mediaType: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })).isRequired,
    }).isRequired,
};

export default ReviewFromEachUserCard;