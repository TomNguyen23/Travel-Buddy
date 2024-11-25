import { useEffect, useState } from "react";
import StarRatingItem from "@/components/items/review/star-rating-item";
import UploadImagesItem from "@/components/items/review/upload-images-item";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetSiteDetailReviewQuery, useUpdateReviewMutation } from "@/api/featureApi/reviewApiSlice";

const SiteReviewUpdate = () => {
    const { toast } = useToast();
    const navigateTo = useNavigate();
    const [media, setMedia] = useState([]); 
    const [rating, setRating] = useState(0);
    const [date, setDate] = useState('');
    const [writeReview, setWriteReview] = useState('');
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);

    const reviewID = useSelector((state) => state.siteDetail.reviewID);

    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const maxDate = getCurrentDate();

    const {data} = useGetSiteDetailReviewQuery(reviewID);

    useEffect(() => {
        if (data) {
            setRating(data.generalRating);
            setDate(data.arrivalDate);
            setWriteReview(data.comment);
            setMedia(data.medias);
        }
    }, [data]);



    const handleRemoveMedia = (index) => {
        const updatedMedia = media.filter((_, i) => i !== index);
        setMedia(updatedMedia);
    };

    const [updateRivew, {isLoading}] = useUpdateReviewMutation();
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

        if ((images.length + videos.length) > 5) {
            toast({
                variant: "destructive",
                title: "Uh oh! Có gì đó sai sai.",
                description: "Bạn đã đăng quá số lượng ảnh giới hạn",
                action: <ToastAction altText="Try again">Thử lại</ToastAction>,
            });
            return;
        }

        const review = {
            generalRating: rating,
            comment: writeReview,
            arrivalDate: date,
            mediaIds: media.map((media) => media.id),
        };

        const formData = new FormData();
        formData.append('review', JSON.stringify(review));
        
        images.forEach((image) => {
            formData.append('images', image);
        });

        videos.forEach((video) => {
            formData.append('videos', video);
        });
        
        await updateRivew({reviewId: reviewID, formData}).unwrap()
            .then(() => {
                toast({
                    title: "Cập nhật đánh giá thành công",
                    description: "Cảm ơn bạn đã chia sẻ trải nghiệm của mình",
                });
                navigateTo('/details/hotel');
            })
            .catch((error) => {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Có gì đó sai sai.",
                    description: error.data.message,
                    action: <ToastAction altText="Try again">Thử lại</ToastAction>,
                });
            });
    }
    return ( 
        <div>
            <div className="mb-10">
                <h1 className="text-xl font-semibold pb-3">Bạn đánh giá trải nghiệm của mình bao nhiêu sao?</h1>
                <StarRatingItem
                    size="lg" 
                    className="text-5xl bg-orange-400"
                    getRating={(rating) => setRating(rating)} 
                    rating={rating}
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

            {media.length > 0 && (
                <div className="mb-10">
                    <h1 className="text-xl font-semibold pb-3">Ảnh/video đã đăng tải từ trước</h1>
                    <div className="grid grid-cols-3 gap-1 mt-3">
                        {media.map((media, index) => (
                            <div key={index} className="relative">
                                {media.mediaType === 'IMAGE' ? (
                                    <img 
                                        src={media.url} 
                                        className="w-full h-36 object-cover rounded-md" 
                                        alt="Review Media" 
                                    />
                                ) : media.mediaType === 'VIDEO' ? (
                                    <video 
                                        className="w-full h-36 object-cover rounded-md" 
                                        controls 
                                        autoPlay 
                                        loop 
                                        muted
                                    >
                                        <source src={media.url} type="video/mp4"/>
                                        Your browser does not support the video tag.
                                    </video>
                                ) : null}
                                
                                <span className="material-icons-outlined cursor-pointer absolute top-0 right-0 p-2 text-gray-500"
                                    onClick={() => handleRemoveMedia(index)}
                                >
                                    cancel
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div>
                <h1 className="text-xl font-semibold pb-1">Thêm ảnh/video vào đánh giá</h1>
                <p className="text-gray-500 mb-3">Bạn chỉ được tải lên tối đa 5 ảnh & video</p>
                <UploadImagesItem 
                    getImages={(images) => setImages(images)} 
                    getVideos={(videos) => setVideos(videos)}
                />
            </div>

            <Separator />

            {isLoading 
                ? <Button className="bg-main hover:bg-main-hover my-4 float-end" disabled>
                    Cập nhật đánh giá
                    <span className="loading loading-dots loading-md ml-2"></span>
                </Button>
                : <Button onClick={handleSubmit} className="bg-main hover:bg-main-hover my-4 float-end">Cập nhật đánh giá</Button>
            }

        </div>
     );
}
 
export default SiteReviewUpdate;