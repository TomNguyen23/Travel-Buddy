import { useLikeReviewMutation, useUnlikeReviewMutation } from "@/api/featureApi/reviewApiSlice";
import { useState } from "react";
import PropTypes from 'prop-types';

import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

const LikeItem = ({ reviewID, likeStatus }) => {
    const { toast } = useToast();
    const [liked, setLiked] = useState(likeStatus === null || likeStatus === 'DISLIKE' ? false : true);
    const [isFetching, setIsFetching] = useState(false);

    const [likeReviewAction] = useLikeReviewMutation();
    const [unlikeReviewAction] = useUnlikeReviewMutation();

    const handleLikeUnlike = async () => {
        setIsFetching(true);
        if (liked === false) {
            await likeReviewAction({reviewId: reviewID})
                .unwrap()
                .then(() => {
                    setLiked(!liked);
                    setIsFetching(false);
                })
                .catch((error) => {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Có gì đó sai sai.",
                        description: error.data.message,
                        action: <ToastAction altText="Try again">Thử lại</ToastAction>,
                    })
                })
        } else {
            await unlikeReviewAction({reviewId: reviewID})
                .unwrap()
                .then(() => {
                    setLiked(!liked);
                    setIsFetching(false);
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

    };
    return ( 
        <button onClick={handleLikeUnlike}>
            {isFetching 
            ? <span className="loading loading-spinner loading-sm"></span> 
            : <span className={`${liked ? 'material-icons' : 'material-icons-outlined'}`}>thumb_up</span>
            }
        </button>
     );
}
LikeItem.propTypes = {
    reviewID: PropTypes.string.isRequired,
    likeStatus: PropTypes.string.isRequired,
};

export default LikeItem;