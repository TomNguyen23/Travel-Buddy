import SiterankingCard from "@/components/cards/discover_cards/site-ranking_card";
import { Separator } from "@/components/ui/separator";

const DiscoverRankingNature = () => {
    const data = [{
        "id": 1,
        "site_name": "Poponcol",
        "address": "89 Cardinal Center"
      }, {
        "id": 2,
        "site_name": "Mardakyany",
        "address": "682 Aberg Parkway"
      }, {
        "id": 3,
        "site_name": "Lok",
        "address": "7 Armistice Crossing"
      }, {
        "id": 4,
        "site_name": "Zopilotepe",
        "address": "07 Havey Terrace"
      }, {
        "id": 5,
        "site_name": "Armstrong",
        "address": "02218 Pearson Way"
      }, {
        "id": 6,
        "site_name": "Dalang",
        "address": "84 Waubesa Road"
      }, {
        "id": 7,
        "site_name": "Kolobovo",
        "address": "264 Mcbride Trail"
      }, {
        "id": 8,
        "site_name": "Zumarraga",
        "address": "9 Ronald Regan Street"
      }, {
        "id": 9,
        "site_name": "Järfälla",
        "address": "507 Lawn Road"
      }, {
        "id": 10,
        "site_name": "Ube",
        "address": "357 Prairie Rose Hill"
      }, {
        "id": 11,
        "site_name": "Lagangilang",
        "address": "48 Waxwing Place"
      }, {
        "id": 12,
        "site_name": "Outeiro",
        "address": "9 Springview Terrace"
      }, {
        "id": 13,
        "site_name": "Bato",
        "address": "991 Di Loreto Avenue"
      }, {
        "id": 14,
        "site_name": "Cañazas",
        "address": "2 Eastwood Street"
      }, {
        "id": 15,
        "site_name": "Umeå",
        "address": "555 Gina Road"
      }]

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
              {data.map((item, index) => (
                  <SiterankingCard key={item.id} data={{ ...item, index: index + 1 }} />
              ))}
            </div>
        </div>
     );
}
 
export default DiscoverRankingNature;