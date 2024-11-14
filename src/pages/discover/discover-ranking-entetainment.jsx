import SiterankingCard from "@/components/cards/discover_cards/site-ranking_card";
import { Separator } from "@/components/ui/separator";

const DiscoverRankingEntertainment = () => {
    const data = [{
        "id": 1,
        "site_name": "Loikaw",
        "address": "12411 Cherokee Avenue"
      }, {
        "id": 2,
        "site_name": "Bryukhovychi",
        "address": "16734 Anhalt Terrace"
      }, {
        "id": 3,
        "site_name": "Ughelli",
        "address": "9 Vera Terrace"
      }, {
        "id": 4,
        "site_name": "Södertälje",
        "address": "03386 Corscot Pass"
      }, {
        "id": 5,
        "site_name": "Napu",
        "address": "814 Merrick Alley"
      }, {
        "id": 6,
        "site_name": "Karatsu",
        "address": "73782 Beilfuss Avenue"
      }, {
        "id": 7,
        "site_name": "Ergong",
        "address": "4710 Cardinal Road"
      }, {
        "id": 8,
        "site_name": "Lujiao",
        "address": "347 Victoria Road"
      }, {
        "id": 9,
        "site_name": "Dandai",
        "address": "94115 Troy Alley"
      }, {
        "id": 10,
        "site_name": "Semeljci",
        "address": "77 Holy Cross Junction"
      }]
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
              {data.map((item, index) => (
                  <SiterankingCard key={item.id} data={{ ...item, index: index + 1 }} />
              ))}
            </div>
        </div>
     );
}
 
export default DiscoverRankingEntertainment;