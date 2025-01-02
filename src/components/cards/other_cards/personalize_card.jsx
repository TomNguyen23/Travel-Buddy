import { useState } from 'react';
import PropTypes from 'prop-types';

const PersionlizeCard = ({ id, destinationName, media, onCheckboxChange }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        const { checked } = e.target;
        setIsChecked(checked);
        onCheckboxChange(id, checked);
    };

    return ( 
        <div className="h-56 w-40 rounded-xl mx-3 mt-3 mb-8 relative">
            <input type="checkbox" 
                    name={`option-${id}`} 
                    id={`option-${id}`}
                    onChange={handleCheckboxChange} 
                    value={id} 
                    checked={isChecked}
                    className="appearance-none relative h-full w-full bg-white border rounded-xl shadow-lg cursor-pointer hover:scale-110 hover:transition ease-in-out delay-150 duration-300 checked:ring-4 checked:ring-main" />
            <label htmlFor={`option-${id}`} className="absolute top-0 left-0 h-full w-full hover:scale-110 hover:transition ease-in-out delay-150 duration-300 cursor-pointer">
                <img src={media} alt="" className="rounded-t-xl object-cover pb-1 w-full h-3/5" />
                <p className="text-center font-medium">{destinationName}</p>
            </label>
        </div>
     );
}

PersionlizeCard.propTypes = {
    id: PropTypes.string.isRequired,
    destinationName: PropTypes.string.isRequired,
    onCheckboxChange: PropTypes.func.isRequired,
    media: PropTypes.string.isRequired
};
 
export default PersionlizeCard;