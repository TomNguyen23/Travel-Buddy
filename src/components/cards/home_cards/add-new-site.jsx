import { Link } from "react-router-dom";

const AddNewSiteCard = () => {
    return ( 
        <div className="flex flex-col items-center my-20">
            <h1 className="font-bold text-4xl h-4/5">Travel Buddy bị thiếu một địa điểm?</h1>

            <Link to="/new-site/site-type"
                 className="flex items-center px-10 py-5 my-8 text-xl font-medium border outline outline-offset-4 outline-cyan-500 rounded-full"
            >
                <span className="material-icons-outlined pr-3">add_location</span>
                <span>Thêm địa điểm mới</span>
            </Link>
        </div>
     );
}
 
export default AddNewSiteCard;