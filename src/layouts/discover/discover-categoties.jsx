import MainHeader from "@/components/headers/main-header";
import DiscoverImg from "@/assets/images/discover-categories.jpeg"
import PropTypes from 'prop-types';
import MainFooter from "@/components/cards/footer/main-footer";

const DiscoverCategoriesLayout = ({ children }) => {
    return ( 
        <div className="min-h-screen">
            <MainHeader />

            <div className="pt-[5rem] px-44">
                <img src={DiscoverImg} className="h-[35rem] w-full object-cover" alt="" />
                <div className="px-48">
                    <h1 className="text-4xl font-bold py-9 pr-12">Khám phá những địa điểm tuyệt vời nhất của cộng đồng Travelers</h1>
                    <p className="font-medium mb-8">
                     Khám phá các điểm đến hàng đầu và những trải nghiệm độc đáo. Từ những điểm đến chưa một ai biết tới đến các
                     tiện ích tuyệt vời xung quanh ta, danh sách điểm đến tuyệt vời nhất của chúng tôi được xếp hạng dựa vào
                     tương tác và đánh giá của cộng đồng Travelers sẽ khơi nguồn cảm hứng cho cuộc phiêu lưu của bạn.
                    </p>
                    {children}
                </div>
            </div>

            <MainFooter />
        </div>
     );
}
DiscoverCategoriesLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DiscoverCategoriesLayout;