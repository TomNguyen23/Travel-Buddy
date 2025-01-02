import AddDestinationItem from "@/components/items/team-journey_items/add-destination-item";
import { getSideID } from "@/redux/reducer/site-detail.reducer";

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const ForTeamCard = (props) => {
    const dispatch = useDispatch();

    const navigateTo = useNavigate();
    const getProvince = () => {
        const address = props.site?.resolvedAddress;
        const province = address.split(', ')[address.split(', ').length - 1];

        return province;
    }

    const handleGetSiteDetail = (id) => {
        dispatch(getSideID(id));
        navigateTo("/details/hotel");
    }

    return ( 
        <div className="card card-compact w-full h-80 border rounded-lg dark:bg-gray-900 relative">
            <figure className="h-3/5">
                {props.site?.medias && props.site?.medias[0] ? (
                    <img src={props.site?.medias[0]?.url} className="w-full object-cover bg-center" alt="Sites" />
                ) : (
                    <img
                        src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                        className="w-full object-cover bg-center"
                        alt="Sites" 
                    />
                )}
            </figure>
            <div className="absolute top-2 right-2">
                <AddDestinationItem forTeam_SiteID={props?.site?.siteId} forTeam_SiteName={props?.site?.siteName} />
            </div>
            <div className="card-body">
                <div className="badge badge-accent text-white">{getProvince()}</div>
                <h2 
                    onClick={() => handleGetSiteDetail(props?.site?.siteId)}
                    className="font-medium text-base cursor-pointer hover:underline">
                        {props?.site?.siteName}
                    </h2>
                <p className="flex items-end">
                    <div className="flex items-center">
                        <span className='text-sm pr-0.5'>{props?.site?.averageRating?.toFixed(1)}</span>
                        <span className='material-icons text-sm text-yellow-400'>star</span>
                    </div>
                    
                    <span className="text-sm text-gray-500 pl-2">
                        {props?.site?.totalRating} đánh giá
                    </span>
                </p>
                {props?.site?.siteType.name}
            </div>
        </div>
     );
}

ForTeamCard.propTypes = {
    site: PropTypes.object.isRequired,
}
 
export default ForTeamCard;