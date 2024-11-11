import PropTypes from 'prop-types';
import { cn } from "@/lib/utils"

const StarRatingItem = (props) => {
    const handleRatingChange = (e) => {
        props.getRating(e.target.value);
    }

    return ( 
        <div className={`rating rating-${props.size}`}>
            <input type="radio" name="rating-1" className="rating-hidden" defaultChecked />
            {Array.from({length: 5}, (_, i) => (
                <input key={i} 
                        type="radio" 
                        name="rating-1" 
                        value={i + 1} 
                        className={cn("mask mask-star-2", props.className)} 
                        onChange={handleRatingChange} 
                />
            ))}
        </div>
     );
}

StarRatingItem.propTypes = {
    getRating: PropTypes.func.isRequired,
    className: PropTypes.string,
    size: PropTypes.string,
};
 
export default StarRatingItem;