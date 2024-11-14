import { useState } from "react";
import StarRatingItem from "@/components/items/review/star-rating-item";
import UploadImagesItem from "@/components/items/review/upload-images-item";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

const AttractionReview = () => {
    const { toast } = useToast();
    const [rating, setRating] = useState(0);
    const [month, setMonth] = useState('');
    const [review, setReview] = useState('');
    const [images, setImages] = useState([]);

    const getCurrentMonth = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        return `${year}-${month}`;
    };
    const maxMonth = getCurrentMonth();

    const handleSubmit = () => {
        if (rating === 0) {
            toast({
                variant: "destructive",
                title: "Uh oh! Có gì đó sai sai.",
                description: "Bạn chưa đánh giá sao cho trải nghiệm của mình",
                action: <ToastAction altText="Try again">Thử lại</ToastAction>,
            });
            return;
        }

        if (review.length === 0) {
            toast({
                variant: "destructive",
                title: "Uh oh! Có gì đó sai sai.",
                description: "Bạn chưa viết đánh giá",
                action: <ToastAction altText="Try again">Thử lại</ToastAction>,
            });
            return;
        }

        if (images.length > 5) {
            toast({
                variant: "destructive",
                title: "Uh oh! Có gì đó sai sai.",
                description: "Bạn đã đăng quá số lượng ảnh giới hạn",
                action: <ToastAction altText="Try again">Thử lại</ToastAction>,
            });
            return;
        }

        const data = {
            rating,
            month,
            review,
            images
        };

        console.log(data);
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
                    type="month" 
                    className="border px-2 py-3 w-1/4 rounded-md dark:bg-[#1D232A]" 
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    max={maxMonth} />
            </div>

            <div className="mb-10">
                <h1 className="text-xl font-semibold pb-3">Viết đánh giá</h1>
                <textarea  
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="textarea textarea-bordered w-full h-28" placeholder="Đánh giá của bạn...">
                </textarea>
            </div>

            <div>
                <h1 className="text-xl font-semibold pb-1">Thêm ảnh vào đánh giá</h1>
                <p className="text-gray-500 mb-3">Bạn chỉ được tải lên tối đa 5 ảnh</p>
                <UploadImagesItem getImages={(images) => setImages(images)} />
            </div>

            <Separator />

            <Button onClick={handleSubmit} className="bg-main hover:bg-main-hover my-4 float-end">Gửi đánh giá</Button>
        </div>
     );
}
 
export default AttractionReview;