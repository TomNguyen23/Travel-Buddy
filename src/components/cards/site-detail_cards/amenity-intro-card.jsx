import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
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
    const { data } = useGetAmenityDetailQuery(1)

    useEffect(() => {
        if (ref.current.clientHeight < ref.current.scrollHeight) {
            setShowReadMore(true);
        }
    },[]);


    useEffect(() => {
        if (data) {
            dispatch(getAmenityDetail(data))
            console.log(data.groupedServices)
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
                                <span className='font-semibold'>4.6</span>
                                <span className='material-icons text-5xl text-yellow-400 pr-2'>star</span>
                            </div>
    
                            <div className='pt-1'>200 đánh giá</div>
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
                            Khách sạn xanh đầu tiên trong Tập đoàn Little Hoian theo đuổi một cuộc sống xanh,
                            cam kết mạnh mẽ giảm thiểu tác động đến môi trường và tiêu thụ năng lượng đồng thời
                            cung cấp tính bền vững trong tất cả các dịch vụ và sản phẩm của mình cung cấp cho những
                            du khách có ý thức về môi trường. Little Gem với 48 phòng & suites được thiết kế theo 
                            xu hướng thân thiện với môi trường cung cấp các tiện nghi hiện đại mang đậm nét văn hóa
                            phương Đông. Cây xanh trải rộng khắp các khu vực trong nhà và ngoài trời, tạo ra một 
                            cảm giác thanh bình gần gủi với thiên nhiên theo lối sống truyền thống của người Việt. 
                            Nhà hàng trong khuôn viên khách sạn, Herb, là một điểm ăn uống Healthy nổi tiếng tại phố Cổ. 
                            Du khách có thể tận hưởng cảm giác thư thái trong khu vườn, trải nghiệm ẩm thực nhiệt đới với 
                            nhiều thực đơn truyền thống bao gồm các món ăn Việt Nam phổ biến, đồ uống bổ dưỡng lạ miệng 
                            và các lựa chọn ăn chay lý tưởng.
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

                        <div className='flex items-start'>
                            <span className='material-icons-outlined text-2xl text-gray-400'>location_on</span>
                            <span className='text-md font-light pl-2'>{data?.resolvedAddress}</span>
                        </div>

                        <div className='flex items-center'>
                            <span className='material-icons-outlined text-2xl text-gray-400'>language</span>
                            <a href={data?.website} target='blank' className='text-md text-blue-600 font-light pl-2'>{data?.website}</a>
                        </div>

                        <div className='flex items-center'>
                            <span className='material-icons-outlined text-2xl text-gray-400'>call</span>
                            {data?.phoneNumbers.map((phone, index) => (
                                <span key={index} className='text-md font-light pl-2'>{phone}</span>
                            ))}
                        </div>
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