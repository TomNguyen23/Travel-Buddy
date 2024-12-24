import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const OpeningDayItem = ({ openingTimes, dayMappingInVietnamese, onOpeningTimesChange }) => {
    const [days, setDays] = useState({
        monday: { checked: false, open: '', close: '' },
        tuesday: { checked: false, open: '', close: '' },
        wednesday: { checked: false, open: '', close: '' },
        thursday: { checked: false, open: '', close: '' },
        friday: { checked: false, open: '', close: '' },
        saturday: { checked: false, open: '', close: '' },
        sunday: { checked: false, open: '', close: '' },
    });

    const dayMappingReverse = {
        MO: 'monday',
        TU: 'tuesday',
        WE: 'wednesday',
        TH: 'thursday',
        FR: 'friday',
        SA: 'saturday',
        SU: 'sunday',
    };

    // Hàm chuyển đổi days thành định dạng openingTimes
    const transformDaysToApiFormat = (currentDays) => {
        const dayMapping = {
            monday: 'MO',
            tuesday: 'TU',
            wednesday: 'WE',
            thursday: 'TH',
            friday: 'FR',
            saturday: 'SA',
            sunday: 'SU',
        };

        return Object.keys(currentDays)
            .filter((dayKey) => currentDays[dayKey].checked)
            .map((dayKey) => ({
                dayOfWeek: dayMapping[dayKey],
                openTime: currentDays[dayKey].open,
                closeTime: currentDays[dayKey].close,
            }));
    };

    // Xử lý dữ liệu từ openingTimes API (nếu có)
    useEffect(() => {
        if (openingTimes && openingTimes.length > 0) {
            const updatedDays = { ...days };
            openingTimes.forEach(({ dayOfWeek, openTime, closeTime }) => {
                const dayKey = dayMappingReverse[dayOfWeek];
                if (dayKey) {
                    updatedDays[dayKey] = {
                        checked: true,
                        open: openTime,
                        close: closeTime,
                    };
                }
            });
            setDays(updatedDays);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openingTimes]);

    // Tự động gửi openingTimes khi days thay đổi
    useEffect(() => {
        const formattedOpeningTimes = transformDaysToApiFormat(days);
        onOpeningTimesChange(formattedOpeningTimes);
    }, [days, onOpeningTimesChange]);

    const handleCheckboxChange = (dayKey) => {
        const updatedDays = {
            ...days,
            [dayKey]: { ...days[dayKey], checked: !days[dayKey].checked },
        };
        setDays(updatedDays);
    };

    const handleTimeChange = (dayKey, type, value) => {
        const updatedDays = {
            ...days,
            [dayKey]: { ...days[dayKey], [type]: value },
        };
        setDays(updatedDays);
    };

    return (
        <div className="flex flex-col space-y-3">
            {Object.keys(days).map((dayKey) => (
                <div key={dayKey} className="flex flex-col space-y-3">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text flex items-center">
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={days[dayKey].checked}
                                    onChange={() => handleCheckboxChange(dayKey)}
                                />
                                <p className="pl-2">{dayMappingInVietnamese[dayKey]}</p>
                            </span>
                        </div>
                        {days[dayKey].checked && (
                            <div className="flex space-x-3">
                                <input
                                    type="time"
                                    value={days[dayKey].open}
                                    onChange={(e) => handleTimeChange(dayKey, 'open', e.target.value)}
                                    className="input input-bordered w-full rounded-sm"
                                />
                                <input
                                    type="time"
                                    value={days[dayKey].close}
                                    onChange={(e) => handleTimeChange(dayKey, 'close', e.target.value)}
                                    className="input input-bordered w-full rounded-sm"
                                />
                            </div>
                        )}
                    </label>
                </div>
            ))}
        </div>
    );
};
OpeningDayItem.propTypes = {
    openingTimes: PropTypes.arrayOf(
        PropTypes.shape({
            dayOfWeek: PropTypes.string.isRequired,
            openTime: PropTypes.string.isRequired,
            closeTime: PropTypes.string.isRequired,
        })
    ),
    dayMappingInVietnamese: PropTypes.object.isRequired,
    onOpeningTimesChange: PropTypes.func.isRequired,
};

export default OpeningDayItem;
