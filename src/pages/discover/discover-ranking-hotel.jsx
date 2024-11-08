import SiterankingCard from "@/components/cards/discover_cards/site-ranking_card";
import { Separator } from "@/components/ui/separator";

const DiscoverRankingHotel = () => {
    const data = [{
        "id": 1,
        "site_name": "Dalongdong",
        "address": "65290 Boyd Pass"
      }, {
        "id": 2,
        "site_name": "Nahariya",
        "address": "959 Crowley Center"
      }, {
        "id": 3,
        "site_name": "Khong Chai",
        "address": "0792 Lyons Court"
      }, {
        "id": 4,
        "site_name": "Pećigrad",
        "address": "6588 Bunting Terrace"
      }, {
        "id": 5,
        "site_name": "Sinmak",
        "address": "64 Memorial Center"
      }];
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
              {data.map((item, index) => (
                  <SiterankingCard key={item.id} data={{ ...item, index: index + 1 }} />
              ))}
            </div>
        </div>
     );
}
 
export default DiscoverRankingHotel;