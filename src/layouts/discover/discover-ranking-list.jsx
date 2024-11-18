import DiscoverCategoriesCarousel from "@/components/cards/discover_cards/discover-categories-carousel_card";
import DiscoverRankingPanel from "@/components/cards/discover_cards/discover-ranking-panel_card";
import MainFooter from "@/components/cards/footer/main-footer";
import MainHeader from "@/components/headers/main-header";
import PropTypes from 'prop-types';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DiscoverRankingListLayout = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    
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

            <MainFooter />
        </div>
     );
}
DiscoverRankingListLayout.propTypes = {
    children: PropTypes.node,
};

export default DiscoverRankingListLayout;