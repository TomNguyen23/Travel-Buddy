import { getSideID } from "@/redux/reducer/site-detail.reducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const IntroduceCard = () => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const handleChooseSite = (siteID) => {
        dispatch(getSideID(siteID));
        navigateTo("/details/hotel");
    }
    return ( 
        <div className="my-40">
            <h1 className="text-4xl font-bold w-4/5">
                <span>Hơn cả một nền tảng. </span>
                <span  className="text-gray-400">
                    Travel Buddy là một cộng đồng của những người yêu du lịch và trải nghiệm 
                    với mục tiêu chia sẻ những kinh nghiệm, những địa điểm trên không gian mạng.
                </span>
            </h1>

            <div className="grid grid-cols-3 gap-10 my-20">
                <div className="stats shadow bg-base-200">
                    <div className="stat">
                        <span className="material-icons-outlined stat-figure text-5xl">groups</span>
                        <h2 className="stat-title">Travelers</h2>
                        <h3 className="stat-value">5000+</h3>
                        <p className="text-sm">Chia sẻ với hàng ngàn người có cùng tình yêu du lịch giống bạn</p>
                    </div>
                </div>

                <div className="stats shadow bg-base-200">
                    <div className="stat">
                        <span className="material-icons-outlined stat-figure text-5xl">landscape</span>
                        <h2 className="stat-title">Địa điểm du lịch</h2>
                        <h3 className="stat-value">100000+</h3>
                        <p className="text-sm">Hàng trăm ngàn địa điểm du lịch đang chờ các tình yêu của du lịch khám phá</p>
                    </div>
                </div>

                <div className="stats shadow bg-base-200">
                    <div className="stat">
                        <span className="material-icons-outlined stat-figure text-5xl">villa</span>
                        <h2 className="stat-title">Tiện ích</h2>
                        <h3 className="stat-value">100000+</h3>
                        <p className="text-sm">Đa dạng các loại hình tiện ích nhà hàng, resort,...cùng với mức giá rõ ràng</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center my-10">
                <section className="basis-1/2 pr-20">
                    <h1 className="text-3xl font-bold py-5">Bà Nà Hills</h1>
                    <p className="text-gray-500">Thuộc hệ thống thương hiệu giải trí Sun World, cách trung tâm thành phố Đà Nẵng hơn 20 km, 
                        Sun World Ba Na Hills là quần thể du lịch nghỉ dưỡng kết hợp vui chơi giải trí đẳng cấp bậc nhất Việt Nam.
                        Nằm ở độ cao 1.487m so với mực nước biển, Sun World Ba Na Hills được mênh danh là “chốn bồng lai tiên cảnh”,
                        sở hữu khí hậu tuyệt vời cùng cảnh quan thiên nhiên kỳ thú. Đến với Sun World Ba Na Hills để trải nghiệm
                        khí hậu 4 mùa trong một ngày cùng nhiều hoạt động lễ hội, vui chơi giải trí, ẩm thực hấp dẫn đa dạng.
                    </p>
                    <p onClick={() => handleChooseSite(724)} className="py-5 font-medium flex items-center cursor-pointer">
                        Tìm hiểu thêm 
                        <span className="material-icons-outlined">chevron_right</span>
                    </p>
                </section>

                <section className="flex basis-1/2 items-baseline max-w-full">
                    <div className="pt-8 pb-12 w-1/2 pr-2">
                        <img src="https://banahills.sunworld.vn/wp-content/uploads/2024/04/005-1536x768.jpg" className="h-96 object-cover bg-bottom rounded-lg" alt="site1" />
                    </div>

                    <div className="pt-12 pb-4 w-1/2">
                        <img src="https://banahills.sunworld.vn/wp-content/uploads/2024/04/DJI_0004-1536x879.jpg" className="h-96 object-cover rounded-lg" alt="site2" />
                    </div>
                </section>
            </div>

            <div className="flex items-center my-10">
                <section className="flex basis-1/2 items-baseline max-w-full pr-20">
                    <div className="pt-12 pb-4 w-1/2 pr-2">
                        <img src="https://travel-museum.s3.ap-southeast-1.amazonaws.com/ff05e09b-23f7-4fd6-a0b0-107d07e55fe8-nh5-tham-quan-hoang-thanh-cung-dinh-mot-thoi-xa-hoajpg.jpg" className="h-96 object-cover bg-bottom rounded-lg" alt="site1" />
                    </div>

                    <div className="pt-8 pb-12 w-1/2">
                        <img src="https://dulichkhampha24.com/wp-content/uploads/2021/03/dai-noi-hue-5.jpg" className="h-96 object-cover rounded-lg" alt="site2" />
                    </div>
                </section>

                <section className="basis-1/2">
                    <h1 className="text-3xl font-bold py-5">Đại nội Huế</h1>
                    <p className="text-gray-500">
                        Đại Nội Huế là một phần trong quần thể di tích Cố đô Huế, mang đậm dấu ấn văn hóa, lịch sử, 
                        kiến trúc của triều đại nhà Nguyễn, được UNESCO công nhận là di sản văn hóa thế giới vào năm 1993. 
                        Toàn cảnh Đại Nội Huế còn lưu giữ nhiều dấu ấn đặc sắc của phong kiến triều đình nhà Nguyễn 
                        hàng trăm năm để lại. Đại Nội Huế có hai khu vực chính là Hoàng Thành và Tử Cấm Thành. 
                        Hoàng Thành là nơi vua thiết triều và làm việc, bao gồm Cổng Ngọ Môn và Điện Thái Hòa.
                        Tử Cấm Thành là khu vực dành riêng cho vua và hoàng tộc, gồm Đại Cung Môn, Tả Vu và Hữu Vu, 
                        Điện Cần Chánh, Thái Bình Lâu, Cung Diên Thọ... Đến với Đại Nội Huế, du khách sẽ được trải nghiệm đa dạng 
                        các dịch vụ như: Không gian trình diễn nghề truyền thống Huế: Tôn tạo, phục dựng và giới thiệu các 
                        ngành nghề thủ công truyền thống từng có dưới thời nhà Nguyễn, các nghề truyền thống Huế, 
                        trong không gian phủ Nội Vụ - Đại Nội Huế.
                    </p>
                    <p onClick={() => handleChooseSite(724)} className="py-5 font-medium flex items-center cursor-pointer">
                        Tìm hiểu thêm 
                        <span className="material-icons-outlined">chevron_right</span>
                    </p>
                </section>
            </div>
        </div>
     );
}
 
export default IntroduceCard;