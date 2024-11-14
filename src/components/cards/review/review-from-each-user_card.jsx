import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ReviewFromEachUserCard = () => {
    return ( 
        <section>
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-medium pl-1">LupyzZz</h3>
                </div>
            </div>
        </section>
     );
}
 
export default ReviewFromEachUserCard;