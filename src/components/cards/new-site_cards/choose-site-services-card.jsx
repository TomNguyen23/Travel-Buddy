import { useGetSiteServicesQuery } from "@/api/featureApi/siteApiSlice";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const ChooseSiteServiceCard = ({ onServicesChange, selectedServices }) => {
    const newSiteTypeID = useSelector(state => state.newSite.newSiteInfo.typeId);
    const { data: services } = useGetSiteServicesQuery(newSiteTypeID);

    const [checkedServices, setCheckedServices] = useState({});

    useEffect(() => {
        if (selectedServices) {
            const initialCheckedServices = selectedServices.reduce((acc, serviceId) => {
                acc[serviceId] = true;
                return acc;
            }, {});
            setCheckedServices(initialCheckedServices);
            // console.log(initialCheckedServices);
        }
    }, [selectedServices]);

    const handleServicesChange = (e) => {
        const { value, checked } = e.target;
        setCheckedServices(prevState => ({
            ...prevState,
            [value]: checked
        }));
        onServicesChange(value, checked);
    };

    return (
        <div>
            {services?.groupedSiteServices && services?.groupedSiteServices.map(service => (
                <div key={service.id}>
                    <h1 className="font-semibold my-4">{service.serviceGroup.serviceGroupName}</h1>
                    <div className="flex flex-wrap">
                        {service.services && service.services.map(service => (
                            <div key={service.id} className="h-16 w-32 rounded-xl mx-3 mt-3 relative">
                                <input 
                                    id={`service-${service.id}`}
                                    name={`service-${service.id}`}
                                    type="checkbox"  
                                    value={service.id}
                                    onChange={handleServicesChange}
                                    checked={checkedServices[service.id] || false}
                                    className="appearance-none relative h-full w-full bg-white dark:bg-gray-900 border rounded-xl shadow-lg cursor-pointer hover:scale-110 hover:transition ease-in-out delay-150 duration-300 checked:ring-4 checked:ring-main" 
                                />
                                <label htmlFor={`service-${service.id}`} className="absolute top-0 left-0 h-full w-full hover:scale-110 hover:transition ease-in-out delay-150 duration-300 cursor-pointer flex items-center justify-center">
                                    <p className="text-center text-xs font-medium">{service.serviceName}</p>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

ChooseSiteServiceCard.propTypes = {
    onServicesChange: PropTypes.func.isRequired,
    selectedServices: PropTypes.array.isRequired
};

export default ChooseSiteServiceCard;