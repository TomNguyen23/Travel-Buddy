import SiterankingCard from "@/components/cards/discover_cards/site-ranking_card";
import { Separator } from "@/components/ui/separator";
import { useGetRecommendDiscoverQuery } from "@/api/featureApi/recommendApiSlice";

const DiscoverRankingEntertainment = () => {
    const {data} = useGetRecommendDiscoverQuery({typeIds: [44, 51, 30, 3]});
    return ( 
        <div className="px-44">
            <div className="py-10">
                <h1 className="text-xl font-bold"></h1>
                <p className="text-md font-light mt-3 pr-52">Khám phá thế giới giải trí ngay tại tầm tay! 
                    Muốn tìm một công viên giải trí sôi động, một rạp chiếu phim hiện đại hay đơn giản là 
                    một quán cà phê chill để thư giãn sau một ngày dài? Cộng đồng của chúng tôi sẽ giúp bạn 
                    tìm thấy những địa điểm vui chơi giải trí hấp dẫn nhất. Với hàng ngàn đánh giá và xếp hạng 
                    từ những người đã trải nghiệm, bạn sẽ không còn phải lo lắng về việc lựa chọn nữa. 
                    Cùng chia sẻ những khoảnh khắc thú vị của bạn và giúp những người khác có những trải nghiệm tuyệt vời hơn!
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
 
export default DiscoverRankingEntertainment;