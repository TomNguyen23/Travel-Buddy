import SiteDetailSummaryCard from "@/components/cards/site-detail_cards/site-detail-summary_card";
import MainHeader from "@/components/headers/main-header";
import { Toaster } from "@/components/ui/toaster";

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SiteDetailsLayout = ({ children }) => {
    return ( 
        <div className="min-h-screen">
            <MainHeader />

            <div className="pt-[7.5rem] px-44">
                <div>
                    <SiteDetailSummaryCard />
                    {children}
                </div>
                <Toaster />
            </div>

            <div className="fixed right-2 bottom-4">
                <Link  
                    to="/review/attraction"
                    className="relative group flex items-center justify-center gap-2 p-4 mx-2 bg-gray-200 dark:bg-gray-700 rounded-full transition-all duration-1000 ease-out"
                >
                    <span className="material-icons">edit</span>
                    <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 max-w-0 text-base group-hover:max-w-xs transition-all duration-500 ease-out overflow-hidden">
                        Viết đánh giá
                    </span>
                </Link>
            </div>
        </div>
     );
}

SiteDetailsLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
 
export default SiteDetailsLayout;