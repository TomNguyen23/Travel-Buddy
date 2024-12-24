import { useGetSiteTypeAspectsFeeQuery } from '@/api/featureApi/siteApiSlice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const NewSiteFeeItem = ({ getFees, initialFees }) => {
    const newSiteTypeID = useSelector(state => state.newSite.newSiteInfo.typeId);

    const [aspects, setAspects] = useState([]);
    const { data: aspectOptions } = useGetSiteTypeAspectsFeeQuery(newSiteTypeID);

    const addAspect = () => {
        setAspects([...aspects, { aspectName: '', feeLow: '', feeHigh: '' }]);
    };

    // const handleAspectChange = (index, field, value) => {
    //     const newAspects = [...aspects];
    //     newAspects[index][field] = value;
    //     setAspects(newAspects);
    // };

    const handleAspectChange = (index, field, value) => {
        setAspects((prevAspects) => {
            const newAspects = [...prevAspects];
            if (newAspects[index][field] !== value) {
                newAspects[index][field] = value;
            }
            return newAspects;
        });
    };

    const removeAspect = (index) => {
        const newAspects = aspects.filter((_, i) => i !== index);
        setAspects(newAspects);
    };

    useEffect(() => {
        if (initialFees && Array.isArray(initialFees)) {
            console.log("Initial Fees: ", initialFees); // Debug dữ liệu
            setAspects(initialFees.map(fee => ({
                aspectName: fee.aspect?.aspectName || '', // Kiểm tra null hoặc undefined
                feeLow: fee.feeLow ? fee.feeLow.toString() : '',
                feeHigh: fee.feeHigh ? fee.feeHigh.toString() : '',
            })));
        }
    }, [initialFees]);

    useEffect(() => {
        const fees = aspects.map(aspect => {
            const aspectOption = aspectOptions?.find(option => option.aspectName === aspect.aspectName);
            return {
                aspectId: aspectOption ? aspectOption.aspectId : null,
                feeLow: parseFloat(aspect.feeLow),
                feeHigh: parseFloat(aspect.feeHigh)
            };
        });

        if (fees.length > 0) {
            getFees(fees);
        }

    }, [aspectOptions, getFees, aspects]);

    return (
        <div>
            {aspects.map((aspect, index) => (
                <div key={index} className="flex justify-between items-center mb-3">
                    <section className='space-x-3'>
                        <select
                            value={aspect.aspectName}
                            onChange={(e) => handleAspectChange(index, 'aspectName', e.target.value)}
                            className="select select-bordered rounded-md"
                        >
                            <option value="" disabled>Loại chi phí</option>
                            {aspectOptions?.map((option) => (
                                <option key={option.aspectId} value={option.aspectName}>{option.aspectName}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            value={aspect.feeLow}
                            onChange={(e) => handleAspectChange(index, 'feeLow', e.target.value)}
                            placeholder="Chi phí thấp nhất (VND)"
                            className="input input-bordered rounded-md"
                        />
                        <input
                            type="text"
                            value={aspect.feeHigh}
                            onChange={(e) => handleAspectChange(index, 'feeHigh', e.target.value)}
                            placeholder="Chi phí cao nhất (VND)"
                            className="input input-bordered rounded-md"
                        />
                    </section>
                    <span className="material-icons-outlined text-4xl text-red-500 hover:text-red-300 cursor-pointer" 
                        onClick={() => removeAspect(index)}
                    >
                        do_not_disturb_on
                    </span>
                </div>
            ))}
            <button onClick={addAspect} className="btn w-full">+ Thêm chi phí</button>
        </div>
    );
}

NewSiteFeeItem.propTypes = {
    getFees: PropTypes.func.isRequired,
    initialFees: PropTypes.array,
};
 
export default NewSiteFeeItem;