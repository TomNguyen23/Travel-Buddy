import ReviewSummaryCard from "@/components/cards/review/review-summary_card";
import MainHeader from "@/components/headers/main-header";
import { Toaster } from "@/components/ui/toaster";
import PropTypes from 'prop-types';

const ReviewLayout = ({ children }) => {
    return ( 
        <div className="min-h-screen">
            <MainHeader />

            <div className="pt-[7.5rem] px-52">
                <div className="grid grid-cols-5 gap-14">
                    <div className="col-span-2">
                        <ReviewSummaryCard />
                    </div>

                    <div className="col-span-3">
                        {children}
                    </div>
                </div>
                <Toaster />
            </div>
        </div>
     );
}
ReviewLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ReviewLayout;