import { useGetRecommendDiscoverQuery } from "@/api/featureApi/recommendApiSlice";
import SiterankingCard from "@/components/cards/discover_cards/site-ranking_card";
import { Separator } from "@/components/ui/separator";

const DiscoverRankingHotel = () => {
    const {data} = useGetRecommendDiscoverQuery({typeIds: [34, 36, 27, 28, 33, 40]});
    return ( 
        <div className="px-44">
            <div className="py-10">
                <h1 className="text-xl font-bold">Khám phá những khách sạn & resort hàng đầu</h1>
                <p className="text-md font-light mt-3 pr-52">Khám phá và trải nghiệm những thiên đường nghỉ dưỡng hàng đầu cùng Travel Buddy! 
                    Chúng tôi tự hào mang đến cho bạn danh sách các khách sạn và resort được đánh giá cao nhất, 
                    dựa trên những trải nghiệm thực tế và những đánh giá chân thật từ chính cộng đồng Travelers. 
                    Hãy để những người đã từng đến đó chia sẻ kinh nghiệm và giúp bạn lựa chọn nơi nghỉ dưỡng hoàn hảo cho chuyến đi của mình.
                </p>
            </div>

            <Separator />

            <div className="py-12">
              {data?.data.map((item, index) => (
                  <SiterankingCard key={item.id} data={{ ...item, index: index + 1 }} />
              ))}
            </div>
        </div>
     );
}
 
export default DiscoverRankingHotel;