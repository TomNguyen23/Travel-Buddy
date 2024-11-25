import PropTypes from 'prop-types';
import { cn } from "@/lib/utils"
import { useLocation } from 'react-router-dom';

const StarRatingItem = (props) => {
    const path = useLocation().pathname;
    const isUpdateReview = path.includes('/review/site/update');

    const handleRatingChange = (e) => {
        props.getRating(e.target.value);
    }

    const sizeClass = {
        sm: 'rating-sm',
        md: 'rating-md',
        lg: 'rating-lg'
    }[props.size] || 'rating-md'; // default to medium if size is not provided

    return ( 
        <div className={cn('rating', sizeClass)}>
            <input type="radio" name="rating-1" className="rating-hidden" defaultChecked />
            {Array.from({length: 5}, (_, i) => (
                <input key={i} 
                        type="radio" 
                        name="rating-1" 
                        value={i + 1} 
                        className={cn("mask mask-star-2", props.className)} 
                        onChange={handleRatingChange}
                        // {...isUpdateReview && {checked: props.rating === i + 1}}
                />
            ))}
        </div>
     );
}

StarRatingItem.propTypes = {
    getRating: PropTypes.func.isRequired,
    className: PropTypes.string,
    size: PropTypes.string,
    rating: PropTypes.number
};

 
export default StarRatingItem;