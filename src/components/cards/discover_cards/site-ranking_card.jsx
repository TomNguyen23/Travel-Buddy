import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSideID } from "@/redux/reducer/site-detail.reducer";

const paragraphStyle = {
    WebkitLineClamp: 4,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
}

const SiterankingCard = (props) => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const [isReadMore, setIsReadMore] = useState(false);
    const [showReadMore, setShowReadMore] = useState(false);
    const ref = useRef(null);

    const getStarColor = (id) => {
        switch (id) {
            case 1:
                return 'text-[#FFAB3E]'; // Gold
            case 2:
                return 'text-[#C0C0C0]'; // Silver
            case 3:
                return 'text-[#CD7F32]'; // Brown
            default:
                return '';
        }
    };

    useEffect(() => {
        if (ref.current.clientHeight < ref.current.scrollHeight) {
            setShowReadMore(true);
        }
    },[]);

    const handleSiteClick = (id) => {
        dispatch(getSideID(id));
        navigateTo("/details/hotel");
    };

    return ( 
        <div className="flex flex-wrap mb-10">
            {props.data?.medias && props.data?.medias[0] ? (
                <img src={props.data?.medias[0]?.url} className="h-80 w-2/5 object-cover rounded-md" alt="Sites" />
            ) : (
                <img
                    src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                    className="h-80 w-2/5 object-cover rounded-md"
                    alt="Sites" 
                />
            )}
            <div className="ml-16 w-1/2">
                <div className='flex justify-between items-start'>
                    <h1
                        onClick={() => handleSiteClick(props.data.siteId)}
                        className='text-3xl font-bold py-1 pr-8 hover:underline cursor-pointer'>
                            {props.data.siteName}
                    </h1>


                    {[1, 2, 3].includes(props.data.index) 
                        ? <span className={`material-icons ${getStarColor(props.data.index)} text-5xl`}>workspace_premium</span>
                        : null
                    }
                </div>

                
                <div className='flex items-center'>
                    <span className='material-icons-outlined text-2xl text-gray-400'>location_on</span>
                    <span className='text-md font-light pl-2'>{props.data.resolvedAddress}</span>
                </div>

                <div className='flex mt-2'>
                    <span className='font-light'>{props.data.averageRating?.toFixed(1)}</span>
                    <span className='material-icons text-yellow-400'>star</span>

                    <div className="divider divider-horizontal mx-0.5"></div>

                    <span className='font-light'>{props.data.totalRating} đánh giá</span>
                </div>
                
                <div>
                    <p  
                        style={isReadMore ? null : paragraphStyle}
                        className='mt-2 text-gray-600 dark:text-gray-400'
                        ref={ref}
                    >
                        {props.data.description}
                    </p>

                    {showReadMore && (
                        <span 
                            className='text-blue-500 cursor-pointer'
                            onClick={() => setIsReadMore(!isReadMore)}>
                            {isReadMore ? 'Thu gọn' : 'Xem thêm'}
                        </span>
                    )}
                </div>
            </div>
        </div>
     );
}
SiterankingCard.propTypes = {
    data: PropTypes.shape({
        index: PropTypes.number.isRequired,
        siteId: PropTypes.number.isRequired,
        siteName: PropTypes.string.isRequired,
        resolvedAddress: PropTypes.string.isRequired,
        totalRating: PropTypes.number.isRequired,
        averageRating: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        medias: PropTypes.arrayOf(PropTypes.object).isRequired
    }).isRequired
};

 
export default SiterankingCard;