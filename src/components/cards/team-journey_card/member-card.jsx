import AddJourneyMember from "@/components/items/team-journey_items/add-journey-member-item";
import EditJourneyMember from "@/components/items/team-journey_items/edit-journey-members-item";

const MemberCard = () => {
    const data = [{
        "id": 1,
        "nick_name": "Stephani Simmig",
        "avatar": "https://robohash.org/eumnullarepellendus.png?size=50x50&set=set1",
        "role": "moderator"
      }, {
        "id": 2,
        "nick_name": "Merci Shurmore",
        "avatar": "https://robohash.org/quasiquiet.png?size=50x50&set=set1",
        "role": "member"
      }, {
        "id": 3,
        "nick_name": "Allistir Biaggioli",
        "avatar": "https://robohash.org/estesseeveniet.png?size=50x50&set=set1",
        "role": "member"
      }, {
        "id": 4,
        "nick_name": "Brook McNirlan",
        "avatar": "https://robohash.org/velrecusandaeillo.png?size=50x50&set=set1",
        "role": "member"
      }, {
        "id": 5,
        "nick_name": "Elita O'Crevan",
        "avatar": "https://robohash.org/veroetanimi.png?size=50x50&set=set1",
        "role": "member"
      }, {
        "id": 6,
        "nick_name": "Jesse Borleace",
        "avatar": "https://robohash.org/sequiquidemest.png?size=50x50&set=set1",
        "role": "member"
      }, {
        "id": 7,
        "nick_name": "Odelle Clewley",
        "avatar": "https://robohash.org/eaabplaceat.png?size=50x50&set=set1",
        "role": "member"
      }, {
        "id": 8,
        "nick_name": "Dacia Catteroll",
        "avatar": "https://robohash.org/fugiatexcepturireiciendis.png?size=50x50&set=set1",
        "role": "member"
      }, {
        "id": 9,
        "nick_name": "Megen Yosselevitch",
        "avatar": "https://robohash.org/consequaturvelitlaboriosam.png?size=50x50&set=set1",
        "role": "member"
      }, {
        "id": 10,
        "nick_name": "Morley Gorger",
        "avatar": "https://robohash.org/illodoloribusaspernatur.png?size=50x50&set=set1",
        "role": "member"
      }, {
        "id": 11,
        "nick_name": "Elvira Stainer",
        "avatar": "https://robohash.org/consecteturmaximesapiente.png?size=50x50&set=set1",
        "role": "member"
      }, {
        "id": 12,
        "nick_name": "Zak MacMaster",
        "avatar": "https://robohash.org/excepturiofficiiset.png?size=50x50&set=set1",
        "role": "member"
      }, {
        "id": 13,
        "nick_name": "Warden Bricknell",
        "avatar": "https://robohash.org/utvoluptatemnulla.png?size=50x50&set=set1",
        "role": "member"
      }, {
        "id": 14,
        "nick_name": "Stanley Drysdell",
        "avatar": "https://robohash.org/exercitationemvelvelit.png?size=50x50&set=set1",
        "role": "member"
      }, {
        "id": 15,
        "nick_name": "Nancee Phettiplace",
        "avatar": "https://robohash.org/rationesedest.png?size=50x50&set=set1",
        "role": "member"
      }, {
        "id": 16,
        "nick_name": "Duncan Full",
        "avatar": "https://robohash.org/quamtemporaat.png?size=50x50&set=set1",
        "role": "member"
      }, {
        "id": 17,
        "nick_name": "Rivy Sherville",
        "avatar": "https://robohash.org/siteumut.png?size=50x50&set=set1",
        "role": "member"
      }, {
        "id": 18,
        "nick_name": "Tonia Notti",
        "avatar": "https://robohash.org/estaliasquae.png?size=50x50&set=set1",
        "role": "member"
      }, {
        "id": 19,
        "nick_name": "Lauralee Cuppleditch",
        "avatar": "https://robohash.org/mollitiaillumarchitecto.png?size=50x50&set=set1",
        "role": "member"
      }, {
        "id": 20,
        "nick_name": "Carlina Attrey",
        "avatar": "https://robohash.org/quicorporispraesentium.png?size=50x50&set=set1",
        "role": "member"
      }
    ]
    return ( 
        <div className="px-6 pt-3 pb-4 mt-2 rounded-md border shadow-lg dark:bg-gray-900">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Thành viên</h1>
                <span>
                    <AddJourneyMember />
                    <EditJourneyMember members={data} />
                </span>
            </div>

            <div className="mt-2 max-h-[21.3rem] overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {data.map(member => (
                    <div key={member.id} className="flex items-center justify-between mt-3">
                        <div className="flex items-center">
                            <img src={member.avatar} className="size-12 rounded-full" alt="" />
                            <p className="pl-2 text-lg">{member.nick_name}</p>
                        </div>

                        {member.role === "moderator" ? (
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