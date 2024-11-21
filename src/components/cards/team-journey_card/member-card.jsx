import AddJourneyMember from "@/components/items/team-journey_items/add-journey-member-item";
import EditJourneyMember from "@/components/items/team-journey_items/edit-journey-members-item";
import DefaultAvatar from "@/assets/images/default-avt.png";

import { useSelector } from "react-redux";

const MemberCard = () => {
    const members = useSelector((state) => state.teamJourney.travelPlanDetail.members);
    const myID = useSelector((state) => state.auth.login.user.id);

    const myMember = members?.find(member => member.userId === myID);
    const myRole = myMember ? myMember.role : null;

    return ( 
        <div className="px-6 pt-3 pb-4 mt-2 rounded-md border shadow-lg dark:bg-gray-900">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Thành viên</h1>

                {myRole !== 'MEMBER' ? (
                    <span>
                        <AddJourneyMember />
                        <EditJourneyMember />
                    </span>
                    ) : <AddJourneyMember />
                }
            </div>

            <div className="mt-2 max-h-[21.3rem] overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {members?.map(member => (
                    <div key={member.userId} className="flex items-center justify-between mt-3">
                        <div className="flex items-center">
                            {member.avatarUrl
                            ? <img src={member.avatarUrl} className="size-12 rounded-full object-cover" alt="" />
                            : <img src={DefaultAvatar} className="size-12 rounded-full object-cover" alt="" />
                            }
                            
                            <p className="pl-2 text-lg">{member.nickname}</p>
                        </div>

                        {member.role === "OWNER" ? (
                            <span className="text-sm">Người lập nhóm</span>
                        ) : member.role === "ADMIN" ? (
                            <span className="text-sm">Quản trị viên</span>
                        ) : (
                            <span></span>
                        )}
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default MemberCard;