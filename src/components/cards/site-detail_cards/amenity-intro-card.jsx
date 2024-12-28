import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";

import { useGetAmenityDetailQuery } from "@/api/featureApi/siteApiSlice";
import { getAmenityDetail } from '@/redux/reducer/site-detail.reducer';
import SiteMapCard from '../map_cards/site-map';

const paragraphStyle = {
    WebkitLineClamp: 8,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
}

const AmenityIntoCard = () => {
    const [isReadMore, setIsReadMore] = useState(false);
    const [showReadMore, setShowReadMore] = useState(false);
    const ref = useRef(null);
    const dispatch = useDispatch();

    const sideID = useSelector((state) => state.siteDetail.siteID);
    // const siteDetail = useSelector((state) => state.siteDetail.amenityDetail);
    const { data } = useGetAmenityDetailQuery(sideID);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [sideID]);

    useEffect(() => {
        if (ref.current.clientHeight < ref.current.scrollHeight) {
            setShowReadMore(true);
        }
    },[data]);


    useEffect(() => {
        if (data) {
            dispatch(getAmenityDetail(data))
        }
    }, [data, dispatch])

    const dayMapping = {
        MO: "Thứ 2",
        TU: "Thứ 3",
        WE: "Thứ 4",
        TH: "Thứ 5",
        FR: "Thứ 6",
        SA: "Thứ 7",
        SU: "Chủ nhật"
    };

    return ( 
        <Card className="my-5">
            <CardHeader>
                <CardTitle>Giới thiệu</CardTitle>
            </CardHeader>
            <CardContent className='grid grid-cols-2 gap-x-12'>
                <article>
                    {/* <div className="flex justify-between">
                        <div>
                            <div className="flex items-center text-5xl">
                                <span className='font-semibold'>{data?.averageRating?.toFixed(1)}</span>
                                <span className='material-icons text-5xl text-yellow-400 pr-2'>star</span>
                            </div>
    
                            <div className='pt-1'>{data?.totalRating} đánh giá</div>
                        </div>

                        <div className="grid grid-cols-2 gap-x-10 gap-y-3">
                            <label className="form-control w-full max-w-xs">
                                <progress className="progress w-44" value="4.6" max="5"></progress>
                                <div className="label">
                                    <span className="label-text-alt text-sm">Phòng</span>
                                    <span className="label-text-alt text-base font-medium">4.5</span>
                                </div>
                            </label>

                            <label className="form-control w-full max-w-xs">
                                <progress className="progress w-44" value="4.2" max="5"></progress>
                                <div className="label">
                                    <span className="label-text-alt text-sm">Độ sạch sẽ</span>
                                    <span className="label-text-alt text-base font-medium">4.2</span>
                                </div>
                            </label>

                            <label className="form-control w-full max-w-xs">
                                <progress className="progress w-44" value="4.8" max="5"></progress>
                                <div className="label">
                                    <span className="label-text-alt text-sm">Tiện nghi</span>
                                    <span className="label-text-alt text-base font-medium">4.8</span>
                                </div>
                            </label>

                            <label className="form-control w-full max-w-xs">
                                <progress className="progress w-44" value="4.0" max="5"></progress>
                                <div className="label">
                                    <span className="label-text-alt text-sm">Đáng giá tiền</span>
                                    <span className="label-text-alt text-base font-medium">4.0</span>
                                </div>
                            </label>

                            <label className="form-control w-full max-w-xs">
                                <progress className="progress w-44" value="4.6" max="5"></progress>
                                <div className="label">
                                    <span className="label-text-alt text-sm">Vị trí</span>
                                    <span className="label-text-alt text-base font-medium">4.6</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <Separator className="my-5" /> */}

                    <div>
                        <p 
                            style={isReadMore ? null : paragraphStyle}
                            className="text-gray-600 dark:text-gray-400"
                            ref={ref}
                        >
                            {data?.description}
                        </p>

                        {showReadMore && data?.description && (
                            <span 
                                className='text-blue-500 cursor-pointer'
                                onClick={() => setIsReadMore(!isReadMore)}>
                                {isReadMore ? 'Thu gọn' : 'Xem thêm'}
                            </span>
                        )}
                    </div>

                    {data?.groupedServices.length > 0 && (
                    <div>
                        {data?.description && <Separator className="my-5" />}

                        <div>
                            <h1 className='text-lg font-semibold mb-3'>Địa chỉ & thông tin liên hệ</h1>
                            <Link to="/details/map">
                                <div className="rounded-md mb-4 h-56 relative">
                                    {data && <SiteMapCard />}
                                </div>
                            </Link>


                            {data?.resolvedAddress && 
                                <div className='flex items-start'>
                                    <span className='material-icons-outlined text-2xl text-gray-400'>location_on</span>
                                    <span className='text-md font-light pl-2'>{data?.resolvedAddress}</span>
                                </div>
                            }

                            {data?.website && 
                                <div className='flex items-center'>
                                    <span className='material-icons-outlined text-2xl text-gray-400'>language</span>
                                    <a href={data?.website} target='blank' className='text-md text-blue-600 font-light pl-2'>Truy cập trang web</a>
                                </div>
                            }

                            {data?.phoneNumbers && data?.phoneNumbers.length > 0 &&
                                <div className='flex items-center'>
                                    <span className='material-icons-outlined text-2xl text-gray-400'>call</span>
                                    {data?.phoneNumbers.map((phone, index) => (
                                        <span key={index} className='text-md font-light pl-2'>{phone}</span>
                                    ))}
                                </div>
                            }
                        </div>
                    </div>
                    )}

                    {data?.description || data?.groupedServices && <Separator className="my-5" />}

                    <div>
                        <h1 className='text-lg font-semibold mb-3'>Thông tin cần biết</h1>

                        <div className='flex flex-wrap justify-between'>
                            <table className='w-2/5'>
                                <tbody>
                                    <tr>
                                        <td className='w-0 pr-2'><span className='material-icons-outlined text-2xl text-gray-400'>account_circle</span></td>
                                        <td className='text-md font-light'>Người đăng tải</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td className='text-sm font-medium'>{data?.ownerUsername}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className='w-2/5'>
                                <tbody>
                                    <tr>
                                        <td className='w-0 pr-2'><span className='material-icons-outlined text-2xl text-gray-400'>bookmark</span></td>
                                        <td className='text-md font-light'>Loại hình</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td className='text-sm font-medium'>{data?.siteType.name}</td>
                                    </tr>
                                </tbody>
                            </table>
                            
                            {data?.openingTimes && data?.openingTimes.length > 0 &&
                                <div className="collapse collapse-arrow w-2/5">
                                    <input type="checkbox" />
                                    <div className="collapse-title p-0 h-0 text-md font-light flex items-center">
                                        <span className='material-icons-outlined text-2xl text-gray-400 '>schedule</span>
                                        <p className='pl-2'>Giờ mở cửa</p>
                                    </div>
                                    <div className="collapse-content">
                                        {data?.openingTimes.map((openingTime, index) => (
                                            <p key={index} className='grid grid-cols-2 gap-x-2 items-center'>
                                                <span className='text-sm font-medium'>{dayMapping[openingTime.dayOfWeek]}</span>
                                                <span className='text-sm font-light'>{openingTime.openTime} - {openingTime.closeTime}</span>
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            }
    
                            {data?.fees && data?.fees.length > 0 &&
                                <div className="collapse collapse-arrow w-2/5">
                                    <input type="checkbox" />
                                    <div className="collapse-title p-0 h-0 text-md font-light flex items-center">
                                        <span className='material-icons-outlined text-2xl text-gray-400 '>payments</span>
                                        <p className='pl-2'>Loại chi phí</p>
                                    </div>
                                    <div className="collapse-content">
                                        
                                        {data?.fees.map((fee, index) => (
                                            <p key={index} className='grid grid-cols-1 gap-x-2 items-center'>
                                                <span className='text-sm font-medium'>{fee.aspect.aspectName}</span>
                                                <span className='text-sm font-light'>{fee.feeLow.toLocaleString('vi-VN')}đ - {fee.feeHigh.toLocaleString('vi-VN')}đ</span>
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </article>

                {data?.groupedServices.length > 0 ? (
                    <article>
                        {data?.groupedServices.map((service, index) => (
                            <div key={index} className='mb-8'>
                                <h1 className='font-semibold'>{service.serviceGroup.serviceGroupName}</h1>
                                

                                <div className='grid grid-cols-2 gap-y-3 my-2'>
                                    {service.services.map((item, index) => (
                                        <span key={index} className='text-sm font-light'>{item.serviceName}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </article>
                ) : (
                    <div>
                        <h1 className='text-lg font-semibold mb-3'>Địa chỉ & thông tin liên hệ</h1>
                        <Link to="/details/map">
                            <div className="rounded-md mb-4 h-56 relative">
                                {data && <SiteMapCard />}
                            </div>
                        </Link>


                        {data?.resolvedAddress && 
                            <div className='flex items-start'>
                                <span className='material-icons-outlined text-2xl text-gray-400'>location_on</span>
                                <span className='text-md font-light pl-2'>{data?.resolvedAddress}</span>
                            </div>
                        }

                        {data?.website && 
                            <div className='flex items-center'>
                                <span className='material-icons-outlined text-2xl text-gray-400'>language</span>
                                <a href={data?.website} target='blank' className='text-md text-blue-600 font-light pl-2'>Truy cập trang web</a>
                            </div>
                        }

                        {data?.phoneNumbers && data?.phoneNumbers.length > 0 &&
                            <div className='flex items-center'>
                                <span className='material-icons-outlined text-2xl text-gray-400'>call</span>
                                {data?.phoneNumbers.map((phone, index) => (
                                    <span key={index} className='text-md font-light pl-2'>{phone}</span>
                                ))}
                            </div>
                        }
                    </div>
                )}
            </CardContent>
        
        </Card>
     );
}
 
export default AmenityIntoCard;