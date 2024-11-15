import LikeItem from "@/components/items/review/like-item";
import ReportItem from "@/components/items/review/report-item";
import StarRatingLabelItem from "@/components/items/review/star-rating-label-item";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ReviewFromEachUserCard = () => {
    const images = [
        {
            imgelink:
            "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        },
        {
            imgelink:
            "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        },
        {
            imgelink:
            "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
        },
        {
            imgelink:
            "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
        },
        {
            imgelink:
            "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
        },
        
    ];
    return ( 
        <section>
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="pl-2">
                        <h3 className="text-lg font-medium">LupyzZz</h3>
                        <p className="text-sm text-gray-500">Đã đánh giá vào 12/11/2024</p>
                    </div>
                </div>

                <div>
                    <LikeItem />
                    <ReportItem />
                </div>
            </div>

            <div className="my-3">
                <StarRatingLabelItem star='4' size="md" />

                <p className="text-gray-500">
                    It can be said that this is our wonderful staycation trip. 
                    The check-in was very fast, our room was upgraded to executive class 
                    on the 27th floor. The room is very spacious, the view is far and beautiful. 
                    Rooms are equipped with modern furniture, clean.
                </p>

                <span className="flex items-center">
                    <span className="text-sm font-medium pr-1">Đã ở đây: </span>
                    <span className="text-sm text-gray-500">11/2024</span>
                </span>

                <div className="grid grid-cols-3 gap-1 mt-3">
                    {images.map((image, index) => (
                        <img key={index} src={image.imgelink} alt="" className="w-full h-28 object-cover rounded-md" />
                    ))}
                
                </div>

            </div>
        </section>
     );
}
 
export default ReviewFromEachUserCard;