import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";

import { useGetAmenityDetailQuery } from "@/api/featureApi/siteApiSlice";
import { getAmenityDetail } from '@/redux/reducer/site-detail.reducer';

const paragraphStyle = {
    WebkitLineClamp: 6,
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
    const siteDetail = useSelector((state) => state.siteDetail.amenityDetail);
    const { data } = useGetAmenityDetailQuery(sideID);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [sideID]);

    useEffect(() => {
        if (ref.current.clientHeight < ref.current.scrollHeight) {
            setShowReadMore(true);
        }
    },[]);


    useEffect(() => {
        if (data) {
            dispatch(getAmenityDetail(data))
        }
    }, [data, dispatch])

    return ( 
        <Card className="my-5">
            <CardHeader>
                <CardTitle>Giới thiệu</CardTitle>
            </CardHeader>
            <CardContent className='grid grid-cols-2 gap-x-12'>
                <article>
                    <div className="flex justify-between">
                        <div>
                            <div className="flex items-center text-5xl">
                                <span className='font-semibold'>{siteDetail?.averageRating?.toFixed(1)}</span>
                                <span className='material-icons text-5xl text-yellow-400 pr-2'>star</span>
                            </div>
    
                            <div className='pt-1'>{siteDetail.totalRating} đánh giá</div>
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

                    <Separator className="my-5" />

                    <div>
                        <p 
                            style={isReadMore ? null : paragraphStyle}
                            className="text-gray-600 dark:text-gray-400"
                            ref={ref}
                        >
                            Mang nét văn hóa tinh túy đậm đà Á Đông, Nhật Bản là nơi vẻ đẹp thiên nhiên, 
                            văn hóa và ẩm thực luôn được ca tụng. Với tinh thần lan tỏa tinh hoa văn hóa 
                            Nhật Bản trên đất Việt, Da Nang Mikazuki được lấy cảm hứng là nơi đất trời hội tụ 
                            và nhịp sống bắt đầu. Đến với chúng tôi để sẵn sàng cho một hành trình khám phá 
                            đầy thú vị với những giá trị chuẩn Nhật chưa từng có tại một tổ hợp nghỉ dưỡng 
                            đạt chuẩn 5 sao ngay tại Đà Nẵng. Được tạo hóa ưu đãi với bờ biển trong xanh quyến rũ, 
                            Vịnh Đà Nẵng là nơi tọa lạc của Da Nang Mikazuki Japanese Resorts & Spa, một tổ hợp nghỉ dưỡng 
                            được quản lý bởi Công ty TNHH ODK Mikazuki Việt Nam. Trên diện tích 13 hecta, Da Nang Mikazuki 
                            mang đến cho bạn nhiều loại hình dịch vụ hấp dẫn, mang đậm bản sắc văn hóa Nhật Bản. 
                        </p>

                        {showReadMore && (
                            <span 
                                className='text-blue-500 cursor-pointer'
                                onClick={() => setIsReadMore(!isReadMore)}>
                                {isReadMore ? 'Thu gọn' : 'Xem thêm'}
                            </span>
                        )}
                    </div>

                    <Separator className="my-5" />

                    <div>
                        <h1 className='text-lg font-semibold mb-3'>Địa chỉ & thông tin liên hệ</h1>
                        <div className="bg-[url('https://cdn6.agoda.net/images/MAPS-1214/default/property-map-entry-1.svg?s=375x')] bg-cover bg-center rounded-md mb-4 h-52"></div>

                        {data?.resolvedAddress && 
                            <div className='flex items-start'>
                                <span className='material-icons-outlined text-2xl text-gray-400'>location_on</span>
                                <span className='text-md font-light pl-2'>{data?.resolvedAddress}</span>
                            </div>
                        }

                        {data?.website && 
                            <div className='flex items-center'>
                                <span className='material-icons-outlined text-2xl text-gray-400'>language</span>
                                <a href={data?.website} target='blank' className='text-md text-blue-600 font-light pl-2'>{data?.website}</a>
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
                </article>

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
            </CardContent>
        
        </Card>
     );
}
 
export default AmenityIntoCard;