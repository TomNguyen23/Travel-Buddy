import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

const paragraphStyle = {
    WebkitLineClamp: 4,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
}

const SiterankingCard = (props) => {
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
        console.log('Clicked: ', id);
    };

    return ( 
        <div className="flex flex-wrap mb-10">
            <img src="https://picsum.photos/300" className="h-80 w-2/5 object-cover rounded-md" alt="" />
            <div className="ml-16 w-1/2">
                <div className='flex justify-between items-start'>
                    <h1
                        onClick={() => handleSiteClick(props.data.id)}
                        className='text-3xl font-bold py-1 pr-8 hover:underline cursor-pointer'>
                            {props.data.site_name}
                    </h1>


                    {[1, 2, 3].includes(props.data.index) 
                        ? <span className={`material-icons ${getStarColor(props.data.id)} text-5xl`}>workspace_premium</span>
                        : null
                    }
                </div>

                
                <div className='flex items-center'>
                    <span className='material-icons-outlined text-2xl text-gray-400'>location_on</span>
                    <span className='text-md font-light pl-2'>{props.data.address}</span>
                </div>

                <div className='flex mt-2'>
                    <span className='font-light'>4.6</span>
                    <span className='material-icons text-yellow-400'>star</span>

                    <div className="divider divider-horizontal mx-0.5"></div>

                    <span className='font-light'>200 đánh giá</span>
                </div>
                
                <div>
                    <p  
                        style={isReadMore ? null : paragraphStyle}
                        className='mt-2 text-gray-600 dark:text-gray-400'
                        ref={ref}
                    >
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                        Ab eos illum incidunt et, aliquam, atque possimus, doloribus 
                        ratione inventore alias eligendi! Voluptatibus, sit? Dolores 
                        unde deleniti suscipit sit laborum reiciendis, inventore consequuntur 
                        aut, eaque, velit sunt repudiandae illo obcaecati magni natus. 
                        Nostrum quidem, libero molestias tenetur doloremque soluta itaque 
                        ab aperiam delectus asperiores vero pariatur, corrupti ut possimus 
                        nisi sint expedita nihil, dolore praesentium at. Expedita quisquam 
                        voluptatem itaque. Temporibus nemo, vitae eos nam iusto dicta beatae 
                        quas molestiae quis quam? Nulla nesciunt hic illo facere, perferendis 
                        aliquam mollitia nihil veniam iste dicta iusto veritatis quia dolore 
                        corporis. Consectetur, nulla?
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
        id: PropTypes.number.isRequired,
        site_name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
    }).isRequired
};

 
export default SiterankingCard;