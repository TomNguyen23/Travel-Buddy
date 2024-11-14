import SiterankingCard from "@/components/cards/discover_cards/site-ranking_card";
import { Separator } from "@/components/ui/separator";

const DiscoverRankingCuisine = () => {
    const data = [{
        "id": 1,
        "site_name": "Kafir Qala",
        "address": "00 Pine View Center"
      }, {
        "id": 2,
        "site_name": "Moglicë",
        "address": "3840 Sachs Terrace"
      }, {
        "id": 3,
        "site_name": "Horokhiv",
        "address": "3 Calypso Park"
      }, {
        "id": 4,
        "site_name": "Kuala Lumpur",
        "address": "22 Doe Crossing Road"
      }, {
        "id": 5,
        "site_name": "Sumberkrajan",
        "address": "1291 Petterle Pass"
      }, {
        "id": 6,
        "site_name": "Tours",
        "address": "0391 Vidon Point"
      }, {
        "id": 7,
        "site_name": "Shun’ga",
        "address": "94708 Messerschmidt Plaza"
      }, {
        "id": 8,
        "site_name": "Yläne",
        "address": "52 Debra Place"
      }]

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
              {data.map((item, index) => (
                  <SiterankingCard key={item.id} data={{ ...item, index: index + 1 }} />
              ))}
            </div>
        </div>
     );
}
 
export default DiscoverRankingCuisine;