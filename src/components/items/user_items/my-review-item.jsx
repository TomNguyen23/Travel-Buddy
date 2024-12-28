import vi from 'date-fns/locale/vi'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import StarRatingLabelItem from '../review/star-rating-label-item';
import { getSideID } from '@/redux/reducer/site-detail.reducer';

const paragraphStyle = {
    WebkitLineClamp: 4,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
}

const MyReviewItem = (props) => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const distanceToNow = formatDistanceToNow(
        new Date(props.review.date),
        { locale: vi,addSuffix: true}
    );

    const handleChooseReview = (id) => {
        dispatch(getSideID(id));
        navigateTo('/details/hotel');
    }

    return ( 
        <div 
            className="flex items-stretch w-full p-4 mb-1 shadow-md border dark:bg-[#1D232A] hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md cursor-pointer"
            onClick={() => handleChooseReview(props.review.site.siteId)}
        >
            {props.review.site.medias && props.review.site.medias.length > 0 ?
                <img src={props.review.site.medias[0].url} className="w-52 object-cover bg-center rounded-md" alt="" style={{ height: 'auto' }} />
                :
                <div className='w-64 bg-center bg-cover rounded-md flex items-center justify-center' style={{ height: 'auto' }}>
                    <span className='material-icons-outlined text-9xl text-gray-400'>hide_image</span>
                </div>
            }

            <div className="pl-5 flex flex-col justify-between">
                <div>
                    <p className="text-xs text-slate-500">{distanceToNow}</p>
                    <h1 className="text-lg font-semibold">{props.review.site.siteName}</h1>
                    <div className='flex items-center'>
                        <span className='material-icons-outlined text-2xl text-gray-400'>location_on</span>
                        <span className='text-sm text-gray-400 pl-1'>{props.review.site.resolvedAddress}</span>
                    </div>
                </div>

                <div className='pt-3'>
                    <StarRatingLabelItem star={props.review.generalRating} size='sm' />
                    <p style={paragraphStyle} className="text-sm">
                        {props.review.comment} 
                    </p>

                    {props.review.medias && props.review.medias.length > 0 &&
                        <p className='text-xs text-slate-500 py-0.5'>Cùng với {props.review.medias.length} ảnh/video</p>
                    }
                </div>
            </div>
        </div>
     );
}


MyReviewItem.propTypes = {
    review: PropTypes.shape({
        generalRating: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired,
        medias: PropTypes.arrayOf(PropTypes.shape({
            url: PropTypes.string.isRequired
        })),

        site: PropTypes.shape({
            siteName: PropTypes.string.isRequired,
            resolvedAddress: PropTypes.string.isRequired,
            siteId: PropTypes.number.isRequired,
            medias: PropTypes.arrayOf(PropTypes.shape({
                url: PropTypes.string.isRequired
            })).isRequired
        }).isRequired
    }).isRequired,
};

export default MyReviewItem;