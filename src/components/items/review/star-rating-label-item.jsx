import PropTypes from 'prop-types';
import { cn } from "@/lib/utils"

const StarRatingLabelItem = (props) => {
    const sizeClass = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg'
    }[props.size];

    return ( 
        <div>
            {Array.from({ length: props.star }, (_, index) => (
                <span key={index} className={cn('material-icons text-yellow-400', sizeClass)}>star</span>
            ))}
        </div>
     );
}

StarRatingLabelItem.propTypes = {
    star: PropTypes.array.isRequired,
    size: PropTypes.string,
};

export default StarRatingLabelItem;