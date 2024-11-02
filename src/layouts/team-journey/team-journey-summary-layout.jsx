import MainHeader from "@/components/headers/main-header";
import { Toaster } from "@/components/ui/toaster";

import PropTypes from 'prop-types';

const TeamJourneySummaryLayout = ({ children }) => {
    return ( 
        <div className="min-h-screen">
            <MainHeader />
            <div className="pt-[6.8rem] px-40">
                <div className="flex flex-wrap justify-between">
                    {children}
                </div>
            </div>
            <Toaster />
        </div>
     );
}

TeamJourneySummaryLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
 
export default TeamJourneySummaryLayout;