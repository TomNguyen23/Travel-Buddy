import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";

import NewSiteMapCard from "../map_cards/new-site-map";

import { useState, useCallback } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { getNewSitebasicInfo } from "@/redux/reducer/new-site.reducer";
import { useNavigate } from "react-router-dom";
import useDebound from "@/hooks/use-debound";
import OpeningDayItem from "@/components/items/new-site_items/opening-day-item";

const NewSiteInfoCard = () => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    // const [openingTimes, setOpeningTimes] = useState([]); // Mặc định trống
    const [formattedOpeningTimes, setFormattedOpeningTimes] = useState([]);

    const handleOpeningTimesChange = useCallback((updatedOpeningTimes) => {
        setFormattedOpeningTimes(updatedOpeningTimes);
    }, []);

    const [resolvedAddress, setResolvedAddress] = useState('');
    const deboundResolvedAddress = useDebound(resolvedAddress);

    const formik = useFormik({
        initialValues: {
            siteName: '',
            // resolvedAddress: '',
            website: '',
            phoneNumbers: [],
            description: '',
        },
        validationSchema: Yup.object({
            siteName: Yup.string().required('Băt buộc nhập'),
            // resolvedAddress: Yup.string().required('Bắt buộc nhập'),
            description: Yup.string().required('Bắt buộc nhập'),
        }),
        onSubmit: (values) => {
            const phoneNumbers = Array.isArray(values.phoneNumbers) ? values.phoneNumbers : [values.phoneNumbers];
            const data = {
                ...values,
                openingTimes: formattedOpeningTimes,
                phoneNumbers,
                resolvedAddress,
            };
            console.log(data);

            dispatch(getNewSitebasicInfo(data));
            navigateTo('/new-site/site-business-info');
        }
            
    });


    return ( 
        <Card className='mb-20'>
            <CardHeader>
                <CardTitle>Thông tin địa điểm</CardTitle>
                <CardDescription>Hãy bắt đầu với một vài thông tin về địa điểm của bạn</CardDescription>
            </CardHeader>
            <form onSubmit={formik.handleSubmit}>
                <CardContent className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-3">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Tên địa điểm</span>
                            </div>
                            <input type="text" 
                                    id="siteName"
                                    name="siteName"
                                    value={formik.values.siteName} 
                                    onChange={formik.handleChange} 
                                    className="input input-bordered w-full rounded-sm" />
                        </label>
                        {formik.errors.siteName && <div className='text-red-500 text-sm'>{formik.errors.siteName}</div>}
                    </div>
    
                    <div className="flex flex-col space-y-3">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Website truy cập</span>
                            </div>
                            <input type="text" 
                                    id="website"
                                    name="website"
                                    value={formik.values.website} 
                                    onChange={formik.handleChange} 
                                    className="input input-bordered w-full rounded-sm" />
                            
                        </label>
                    </div>
    
                    <div className="flex flex-col space-y-3">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Số điện thoại liên hệ</span>
                            </div>
                            <input type="text" 
                                    id="phoneNumbers"
                                    name="phoneNumbers"
                                    value={formik.values.phoneNumbers}
                                    onChange={formik.handleChange}
                                    className="input input-bordered w-full rounded-sm" />
                        </label>
                    </div>
    
                    <div className="flex flex-col space-y-3">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Địa chỉ</span>
                            </div>
                            <input type="text" 
                                    id="resolvedAddress"
                                    name="resolvedAddress"
                                    value={resolvedAddress}
                                    onChange={(e) => setResolvedAddress(e.target.value)}
                                    className="input input-bordered w-full rounded-sm" />
                        </label>
                    </div>
    
                    <div className="flex flex-col space-y-3 h-[30rem]">
                        <NewSiteMapCard canMove 
                                        address={deboundResolvedAddress} 
                        />
                    </div>

                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Giới thiệu về địa điểm</span>
                        </div>
                        <textarea 
                            className="textarea textarea-bordered textarea-lg h-28 rounded-md text-sm" placeholder="..."
                            id="description"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        >
                        </textarea>
                        {formik.errors.description && <div className='text-red-500 text-sm'>{formik.errors.description}</div>}

                    </label>
    
                    <div className="flex flex-col space-y-3">
                        <div className="label">
                            <span className="label-text font-medium">Giờ mở cửa (không bắt buộc)</span>
                        </div>

                        <OpeningDayItem 
                            // openingTimes={openingTimes}
                            onOpeningTimesChange={handleOpeningTimesChange}
                            dayMappingInVietnamese={{
                                monday: 'Thứ Hai',
                                tuesday: 'Thứ Ba',
                                wednesday: 'Thứ Tư',
                                thursday: 'Thứ Năm',
                                friday: 'Thứ Sáu',
                                saturday: 'Thứ Bảy',
                                sunday: 'Chủ Nhật',
                            }}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type='submit' className='bg-main hover:bg-main-hover'>Tiếp theo</Button>
                </CardFooter>
            </form>
        </Card>
     );
}
 
export default NewSiteInfoCard;