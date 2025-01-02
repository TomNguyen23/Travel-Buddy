import SiterankingCard from "@/components/cards/discover_cards/site-ranking_card";
import { Separator } from "@/components/ui/separator";
import { useGetRecommendDiscoverQuery } from "@/api/featureApi/recommendApiSlice";

const DiscoverRankingCuisine = () => {
    const {data} = useGetRecommendDiscoverQuery({typeIds: [5, 53, 25, 7]});

    return ( 
        <div className="px-44">
            <div className="py-10">
                <h1 className="text-xl font-bold">Hành trình ẩm thực, đi tìm di sản</h1>
                <p className="text-md font-light mt-3 pr-52">Khám phá ẩm thực qua con mắt của những người sành ăn! 
                    Với tính năng đánh giá và xếp hạng mới, chúng tôi giúp bạn dễ dàng tìm kiếm và lựa chọn những nhà hàng,
                    quán ăn ngon nhất Đà Nẵng. Từ những món ăn địa phương đặc sắc đến các nhà hàng sang trọng, 
                    tất cả đều được đánh giá bởi chính cộng đồng người dùng của chúng tôi. 
                    Hãy chia sẻ trải nghiệm ẩm thực của bạn và cùng nhau xây dựng một bản đồ ẩm thực sống động nhất!
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
 
export default DiscoverRankingCuisine;