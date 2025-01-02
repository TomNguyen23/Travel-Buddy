import { useGetRecommentForYouQuery } from "@/api/featureApi/recommendApiSlice";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSideID } from "@/redux/reducer/site-detail.reducer";

const HomePageForYouCard = () => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const {data} = useGetRecommentForYouQuery();

    const handleGetSiteDetail = (id) => {
        dispatch(getSideID(id));
        navigateTo("/details/hotel");
    }
    return ( 
        <div className="my-10">
            <h1 className="text-2xl font-bold my-5">Gợi ý dành cho bạn</h1>

            <Carousel className="w-full">
                <CarouselContent className="-ml-1">
                    {data?.data.map((item, index) => (
                        <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/4">
                            <div className="card card-compact h-80 border rounded-lg">
                                <figure className="h-1/2">
                                    <img
                                    src={item?.medias[0]?.url}
                                    className="w-full object-cover bg-center"
                                    alt="Site" />
                                </figure>
                                <div className="card-body">
                                    <h2 onClick={() => handleGetSiteDetail(item?.siteId)} className="font-medium cursor-pointer hover:underline">{item.siteName}</h2>
                                    <p className="flex items-end">
                                        <div className="flex items-center">
                                            <span className='text-sm pr-0.5'>{item.averageRating?.toFixed(1)}</span>
                                            <span className='material-icons text-sm text-yellow-400'>star</span>
                                        </div>
                                        
                                        <span className="text-sm text-gray-500 pl-2">
                                            {item.totalRating} đánh giá
                                        </span>
                                    </p>

                                    <div className="flex items-center">
                                        <span className='material-icons-outlined text-base text-gray-400'>location_on</span>
                                        <span className='text-sm text-gray-400 pl-1'>{item.resolvedAddress}</span>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
     );
}
 
export default HomePageForYouCard;