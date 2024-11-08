import DiscoverCategoriesCarousel from "@/components/cards/discover_cards/discover-categories-carousel_card";
import DiscoverRankingPanel from "@/components/cards/discover_cards/discover-ranking-panel_card";
import MainHeader from "@/components/headers/main-header";
import PropTypes from 'prop-types';

const DiscoverRankingListLayout = ({ children }) => {
    return ( 
        <div className="min-h-screen">
            <MainHeader />

            <div className="py-[5rem]">
                <DiscoverRankingPanel />

                {children}

                <div className="divider divider-start px-44 pb-10 text-2xl font-semibold">Các hạng mục khám phá khác</div>
                <div className="flex justify-center">
                    <DiscoverCategoriesCarousel />
                </div>
            </div>
        </div>
     );
}
DiscoverRankingListLayout.propTypes = {
    children: PropTypes.node,
};

export default DiscoverRankingListLayout;