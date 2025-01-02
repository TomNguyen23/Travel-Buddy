import SiterankingCard from "@/components/cards/discover_cards/site-ranking_card";
import { Separator } from "@/components/ui/separator";
import { useGetRecommendDiscoverQuery } from "@/api/featureApi/recommendApiSlice";

const DiscoverRankingNature = () => {
    const {data} = useGetRecommendDiscoverQuery({typeIds: [50, 37, 52, 42]});
    
    return ( 
        <div className="px-44">
            <div className="py-10">
                <h1 className="text-xl font-bold"></h1>
                <p className="text-md font-light mt-3 pr-52">Tìm kiếm thiên đường xanh của riêng bạn! ️ 
                    Nền tảng của chúng tôi là nơi bạn có thể khám phá và chia sẻ những địa điểm du lịch 
                    sinh thái tuyệt đẹp, được bình chọn bởi hàng ngàn người yêu thiên nhiên. 
                    Từ những khu rừng nguyên sinh đến những bãi biển hoang sơ, chúng tôi giúp bạn dễ dàng 
                    tìm thấy những điểm đến phù hợp với sở thích và ngân sách của mình. Cùng trải nghiệm 
                    những hoạt động thú vị, khám phá văn hóa bản địa và đóng góp vào việc bảo vệ môi trường. 
                    Hãy để chúng tôi đồng hành cùng bạn trên những chuyến phiêu lưu khám phá thiên nhiên!
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
 
export default DiscoverRankingNature;