import { useState } from "react";
import StarRatingItem from "@/components/items/review/star-rating-item";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import UploadImage_v2Item from "@/components/items/review/upload-images-v2-item";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usePostReviewMutation } from "@/api/featureApi/reviewApiSlice";

const AttractionReview = () => {
    const { toast } = useToast();
    const navigateTo = useNavigate();
    const [rating, setRating] = useState(0);
    const [date, setDate] = useState('');
    const [writeReview, setWriteReview] = useState('');
    const [medias, setMedias] = useState([]);
    const siteID = useSelector((state) => state.siteDetail.siteID);

    const [postReview, { isLoading }] = usePostReviewMutation();

    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const maxDate = getCurrentDate();

    const handleRemoveMedia = (url) => {
        setMedias((prev) => prev.filter((media) => media.url !== url));
    };
    

    const handleSubmit = async () => {
        if (rating === 0) {
            toast({
                variant: "destructive",
                title: "Uh oh! Có gì đó sai sai.",
                description: "Bạn chưa đánh giá sao cho trải nghiệm của mình",
                action: <ToastAction altText="Try again">Thử lại</ToastAction>,
            });
            return;
        }

        if (writeReview.length === 0) {
            toast({
                variant: "destructive",
                title: "Uh oh! Có gì đó sai sai.",
                description: "Bạn chưa viết đánh giá",
                action: <ToastAction altText="Try again">Thử lại</ToastAction>,
            });
            return;
        }

        const review = {
            siteId: siteID,
            generalRating: rating,
            comment: writeReview,
            arrivalDate: date,
            medias: medias,
        };

        await postReview(review).unwrap()
        .then(() => {
            toast({
                title: "Cảm ơn bạn đã đánh giá",
                description: "Đánh giá của bạn đã được gửi thành công",
            });
            navigateTo('/details/hotel');
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
        <div>
            <div className="mb-10">
                <h1 className="text-xl font-semibold pb-3">Bạn đánh giá trải nghiệm của mình bao nhiêu sao?</h1>
                <StarRatingItem
                    size="lg" 
                    className="text-5xl bg-orange-400"
                    getRating={(rating) => setRating(rating)} 
                />
            </div>

            <div className="mb-10">
                <h1 className="text-xl font-semibold pb-3">Bạn đến đây vào khoảng thời gian nào?</h1>
                <input 
                    type="date" 
                    className="border px-2 py-3 w-1/4 rounded-md dark:bg-[#1D232A]" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    max={maxDate} />
            </div>

            <div className="mb-10">
                <h1 className="text-xl font-semibold pb-3">Viết đánh giá</h1>
                <textarea  
                    value={writeReview}
                    onChange={(e) => setWriteReview(e.target.value)}
                    className="textarea textarea-bordered w-full h-28" placeholder="Đánh giá của bạn...">
                </textarea>
            </div>

            <div>
                <h1 className="text-xl font-semibold pb-1">Thêm ảnh/video vào đánh giá</h1>
                {/* <p className="text-gray-500 mb-3">Bạn chỉ được tải lên tối đa 5 ảnh & video</p> */}

                <UploadImage_v2Item 
                    getMediaInParent={(media) => setMedias([...medias, media])} 
                    removeMediaInParent={handleRemoveMedia}
                />
            </div>

            <Separator />

            {isLoading 
                ? <Button className="bg-main hover:bg-main-hover my-4 float-end" disabled>
                    Gửi đánh giá
                    <span className="loading loading-dots loading-md ml-2"></span>
                </Button>
                : <Button onClick={handleSubmit} className="bg-main hover:bg-main-hover my-4 float-end">Gửi đánh giá</Button>
            }

            
        </div>
     );
}
 
export default AttractionReview;