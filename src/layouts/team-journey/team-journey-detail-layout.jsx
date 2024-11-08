import MemberCard from "@/components/cards/team-journey_card/member-card";
import TeamJourneySummaryCard from "@/components/cards/team-journey_card/team-Journey-Summary_card";
import MainHeader from "@/components/headers/main-header";
import { Toaster } from "@/components/ui/toaster";

import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const TeamJourneyLayout = ({ children }) => {
    return ( 
        <div className="min-h-screen">
            <MainHeader />
            <div className="pt-[6.8rem] px-40">
                <div className="grid grid-cols-5 gap-14">

                    <div className="col-span-3">
                        <div className="flex">
                            <Link to="/team-journey-schedule" 
                                className={(window.location.href.indexOf("/team-journey-schedule") !== -1) 
                                    ? "border-b-4 border-b-black dark:border-b-white px-2 py-1 mr-2 text-lg font-semibold" 
                                    : "p1 mr-2 text-lg font-semibold"}>
                                Hành trình
                            </Link>

                            <Link to="/team-journey-foryourteam" 
                                className={(window.location.href.indexOf("/team-journey-foryourteam") !== -1) 
                                    ? "border-b-4 border-b-black dark:border-b-white px-2 py-1 text-lg font-semibold" 
                                    : "p-1 text-lg font-semibold"}>
                                Gợi ý cho đội
                            </Link>
                        </div>

                        <div className="my-5">
                            {children}
                        </div>
                    </div>

                    <div className="col-span-2">
                        <TeamJourneySummaryCard />
                        <MemberCard />
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
     );
}


 
TeamJourneyLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default TeamJourneyLayout;