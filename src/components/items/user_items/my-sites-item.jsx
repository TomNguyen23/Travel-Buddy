import { getSideID, getSiteState } from '@/redux/reducer/site-detail.reducer';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MySiteItem = (props) => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const handleChooseSite = (siteId) => {
        dispatch(getSideID(siteId));
        dispatch(getSiteState(props.site.state));
        navigateTo('/my-sites/detail');
    }
    return ( 
        <div 
            className="flex items-start w-full p-3 mb-1 shadow-md border dark:bg-[#1D232A] hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md cursor-pointer"
            onClick={() => handleChooseSite(props.site.siteVersionId)}
        >

            <img src={props.site.pictureUrl} className="w-44 h-32 object-cover bg-center rounded-md" alt="" />
            <div className="pl-5">
                {props.site.state ==='APPROVED' ? <span className="badge badge-success text-white">Đã duyệt</span>
                : props.site.state === 'REJECTED' ? <span className="badge badge-error text-white">Bị từ chối</span>
                : <span className="badge badge-warning text-white">Đang chờ</span>}
                {props.site.typeOfModification === 'MODIFIED' && <span className="badge ml-1">Đã chỉnh sửa</span>}
                <h1 className="text-lg font-semibold">{props.site.siteName}</h1>
                <div className='flex items-center'>
                    <span className='material-icons-outlined text-2xl text-gray-400'>location_on</span>
                    <span className='text-sm text-gray-400 pl-1'>{props.site.address}</span>
                </div>
                <span className='text-sm text-gray-400 font-light pl-1'>Đăng ngày {format(new Date(props.site.createdAt),'dd/MM/yyyy')}</span>
            </div>
        </div>
     );
    };
MySiteItem.propTypes = {
    site: PropTypes.shape({
        siteVersionId: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        siteName: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        pictureUrl: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        typeOfModification: PropTypes.string.isRequired,
    }).isRequired,
};
 
export default MySiteItem;