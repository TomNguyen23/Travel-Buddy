import PropTypes from 'prop-types';

const StarRatingQuantityItem = (props) => {
    return ( 
        <div className="flex items-center">
            <div className="flex items-center">
                <span>{props.star}</span>
                <span className='material-icons text-yellow-400 pr-2'>star</span>
            </div>

            <progress className="progress w-44" value={props.receiveQuantity} max={props.maxQuantity}></progress>
            <span className='pl-2 text-sm'>{props.receiveQuantity}</span>
        </div>
     );
}

StarRatingQuantityItem.propTypes = {
    star: PropTypes.number.isRequired,
    receiveQuantity: PropTypes.number.isRequired,
    maxQuantity: PropTypes.number.isRequired
}
 
export default StarRatingQuantityItem;