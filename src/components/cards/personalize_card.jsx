import { useState } from 'react';
import PropTypes from 'prop-types';

const PersionlizeCard = ({ id, destination, onCheckboxChange }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        const { checked } = e.target;
        setIsChecked(checked);
        onCheckboxChange(destination, checked);
    };

    return ( 
        <div className="h-48 w-40 rounded-xl mx-3 mt-3 mb-8 relative">
            <input type="checkbox" 
                    name={`option-${id}`} 
                    id={`option-${id}`}
                    onChange={handleCheckboxChange} 
                    value={destination} 
                    checked={isChecked}
                    className="appearance-none relative h-full w-full bg-white border rounded-xl shadow-lg cursor-pointer hover:scale-110 hover:transition ease-in-out delay-150 duration-300 checked:ring-4 checked:ring-[#FFAB3E]" />
            <label htmlFor={`option-${id}`} className="absolute top-0 left-0 h-full w-full hover:scale-110 hover:transition ease-in-out delay-150 duration-300 cursor-pointer">
                <img src="https://picsum.photos/200" alt="" className="rounded-t-xl pb-1 w-full h-4/5" />
                <p className="text-center font-medium">{destination}</p>
            </label>
        </div>
     );
}

PersionlizeCard.propTypes = {
    id: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    onCheckboxChange: PropTypes.func.isRequired,
};
 
export default PersionlizeCard;