import SiterankingCard from "@/components/cards/discover_cards/site-ranking_card";
import { Separator } from "@/components/ui/separator";

const DiscoverRankingDestination = () => {
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
                <h1 className="text-xl font-bold">Ghé thăm những địa điểm tham quan được yêu thích nhất</h1>
                <p className="text-md font-light mt-3 pr-52">
                    Chúng tôi không chỉ đơn thuần là một nền tảng du lịch. Chúng tôi là nơi kết nối những tâm hồn yêu xê dịch,
                    nơi bạn có thể tìm thấy những điểm đến phù hợp nhất với sở thích của mình. Mỗi ngày, hàng ngàn du khách 
                    chia sẻ những trải nghiệm thực tế, đánh giá chân thật và hình ảnh sống động về các địa điểm họ đã ghé thăm. 
                    Từ đó, chúng tôi xây dựng nên một bảng xếp hạng khách quan, giúp bạn dễ dàng lựa chọn những điểm đến đang 
                    được yêu thích nhất hiện nay. Với chúng tôi, thông tin luôn được cập nhật liên tục để bạn không bỏ lỡ bất 
                    kỳ địa điểm mới nổi nào.
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
 
export default DiscoverRankingDestination;