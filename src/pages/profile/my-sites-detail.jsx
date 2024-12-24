import { useGetMyOwnedSitesQuery } from "@/api/featureApi/siteApiSlice";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";

const MySitesDetail = () => {
    const siteID = useSelector((state) => state.siteDetail.siteID);
    const { data: mySite } = useGetMyOwnedSitesQuery(siteID);

    const dayMapping = {
        'MO': 'T2',
        'TU': 'T3',
        'WE': 'T4',
        'TH': 'T5',
        'FR': 'T6',
        'SA': 'T7',
        'SU': 'CN',
    }

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    return ( 
        <>
            <h1 className="text-3xl font-semibold">Địa điểm đã đăng tải</h1>

            <Card className="my-4">
                <CardHeader>
                    <CardTitle>
                        {mySite?.siteName}
                        {/* <span className="badge badge-warning text-white ml-2">Đang chờ</span> */}
                    </CardTitle>
                    
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1">
                        <div className='flex items-center'>
                            <span className='font-semibold'>Ngày đăng:</span>
                            <span className='text-sm pl-2'>{formatDateTime(mySite?.createdAt)}</span>
                        </div>
                        <div className='flex items-center'>
                            <span className='font-semibold'>Địa chỉ:</span>
                            <span className='text-sm  pl-2'>{mySite?.resolvedAddress}</span>
                        </div>
                        <div className='flex items-center'>
                            <span className='font-semibold'>Loại hình:</span>
                            <span className='text-sm  pl-2'>{mySite?.siteType?.name}</span>
                        </div>
                        <div className='flex items-center'>
                            <span className='font-semibold'>Website:</span>
                            <a href={mySite?.website} className='text-sm  pl-2' target="_blank">
                                {mySite?.website}
                            </a>
                        </div>
                        <div className='flex items-center'>
                            <span className='font-semibold'>Số điện thoại:</span>
                            {mySite?.phoneNumbers.map((phone) => (
                                <span key={phone} className='text-sm  pl-2'>{phone}</span>
                            ))}
                        </div>
                        <div className='flex items-stretch'>
                            <span className='font-semibold'>Thời gian mở cửa:</span>
                            <span className='text-sm pl-2'>
                                {mySite?.openingTimes.map((time) => (
                                    <div key={time.dayOfWeek} className="flex items-center mb-1">
                                        <span className='font-semibold bg-sky-300 dark:bg-sky-600 px-2 py-0.5 rounded-lg'>{dayMapping[time.dayOfWeek]}</span>
                                        <span className='text-sm pl-2'>{time.openTime} - {time.closeTime}</span>
                                    </div>
                                ))}
                            </span>
                        </div>

                        <div>
                            <span className='font-semibold'>Giới thiệu:</span>
                            <p className='text-sm'>
                            Nằm yên bình giữa làng quê Quảng Nam, quán ăn Cô Vân là điểm đến lý tưởng cho những ai yêu thích 
                            hương vị đặc sản quê nhà. Với không gian mộc mạc, ấm cúng và sự hiếu khách chân tình, quán mang đến 
                            trải nghiệm ẩm thực đậm chất miền Trung.Thực đơn tại quán Cô Vân đa dạng với các món đặc sản 
                            nổi tiếng của Quảng Nam như mì Quảng, cao lầu, bánh tráng cuốn thịt heo, bún mắm nêm, và nhiều món 
                            dân dã khác. Từng món ăn đều được chế biến từ nguyên liệu tươi ngon, giữ trọn hương vị truyền thống, 
                            mang đến cảm giác như đang thưởng thức bữa cơm nhà.Hãy đến với quán Cô Vân để khám phá tinh hoa 
                            ẩm thực Quảng Nam, tận hưởng những phút giây thư giãn giữa khung cảnh làng quê yên bình và lưu giữ 
                            những kỷ niệm đẹp khó quên!
                            </p>
                        </div>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                        <div className='flex items-stretch'>
                            <span className='font-semibold'>Các loại chi phí:</span>
                            <span className='text-sm pl-2'>
                                {mySite?.fees.map((fee) => (
                                    <div key={fee.id} className="flex items-center mb-1">
                                        <span className='font-semibold bg-zinc-300 dark:bg-zinc-600 px-2 py-0.5 rounded-lg'>{fee.aspect.aspectName}</span>
                                        <span className='text-sm pl-2'>{fee.feeLow}đ - {fee.feeHigh}đ</span>
                                    </div>
                                ))}
                            </span>
                        </div>

                        {mySite?.groupedServices && mySite.groupedServices.length > 0 && (
                            <div className=''>
                                    <span className='font-semibold'>Các dịch vụ:</span>

                                    <article className="pl-2">
                                        {mySite?.groupedServices.map((service, index) => (
                                            <div key={index} className='mb-3'>
                                                <h1 className='font-semibold'>{service.serviceGroup.serviceGroupName}</h1>
                                                
                                                <div className='grid grid-cols-5 gap-y-1 my-1'>
                                                    {service.services.map((item, index) => (
                                                        <span key={index} className='text-sm font-light'>{item.serviceName}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </article> 
                            </div>
                        )}

                        <div>
                            <span className='font-semibold'>Hình ảnh</span>

                            <div className='grid grid-cols-3 gap-2'>
                                {mySite?.medias?.map((item, index) => {
                                    if (item.mediaType === 'IMAGE') {
                                        return <img key={index} 
                                                    src={item.url} 
                                                    className="w-full h-44 object-cover bg-center rounded-md" 
                                                    alt="Review Media" 
                                                />;
                                    } else if (item.mediaType === 'VIDEO') {
                                        return <video key={index} 
                                                    className="w-full h-44 object-cover bg-center rounded-md" 
                                                    controls 
                                                    autoPlay 
                                                    loop
                                                    muted
                                                >
                                                <source src={item.url} type="video/mp4"/>
                                                Your browser does not support the video tag.
                                            </video>;
                                    } else {
                                        return null;
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    {/* <Button>Save password</Button> */}
                </CardFooter>
            </Card>
        </>
     );
}
 
export default MySitesDetail;