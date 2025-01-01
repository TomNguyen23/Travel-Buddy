import { useState } from "react";
import PropTypes from "prop-types";

const RadioCategoryItem = ({ options, onSelectionChange }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [details, setDetails] = useState("");

    const handleRadioChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        setDetails(""); // Reset text box khi chọn lý do mới
        onSelectionChange(value, ""); // Truyền giá trị mới ra ngoài
    };

    const handleDetailsChange = (event) => {
        const value = event.target.value;
        setDetails(value);
        onSelectionChange(selectedOption, value); // Truyền nội dung chi tiết ra ngoài
    };

    return (
        <div>
            {options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2 mb-4">
                    <input
                        type="radio"
                        id={`radio-${option.id}`}
                        className="radio"
                        value={option.id}
                        checked={selectedOption === option.id.toString()}
                        onChange={handleRadioChange}
                    />
                    <label
                        htmlFor={`radio-${option.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {option.name}
                    </label>
                </div>
            ))}
            {selectedOption && (
                <div className="my-4">
                    <label htmlFor="details" className="block text-sm font-medium">
                        Vui lòng cung cấp chi tiết:
                    </label>
                    <textarea
                        id="details"
                        className="block w-full mt-2 p-2 border rounded-md text-sm"
                        value={details}
                        onChange={handleDetailsChange}
                        rows="3"
                    />
                </div>
            )}
        </div>
    );
};

RadioCategoryItem.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    onSelectionChange: PropTypes.func.isRequired, // Callback truyền giá trị ra ngoài
};

export default RadioCategoryItem;
