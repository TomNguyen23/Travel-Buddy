import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { getSideID } from "@/redux/reducer/site-detail.reducer";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";

const NearbySitesCarouselCard = (props) => {
    const dispatch = useDispatch();
    const handleGetNearbySiteID = (id) => {
        dispatch(getSideID(id));
    }      
    
    
    return ( 
        <section className="flex justify-center">
            <Carousel className="w-11/12">
                <CarouselContent className="-ml-1">
                    {props?.data?.map((item) => (
                        <CarouselItem key={item.siteId} className="pl-1 md:basis-1/2 lg:basis-1/4">
                            <div className="card card-compact h-64 border rounded-lg">
                                <figure className="h-1/2">
                                    <img
                                    src={item?.medias[0]?.url}
                                    className="w-full object-cover bg-center"
                                    alt="Sites" />
                                </figure>
                                <div className="card-body">
                                    <h2 onClick={() => handleGetNearbySiteID(item.siteId)} className="font-medium cursor-pointer hover:underline">{item.name}</h2>
                                    <p className="flex items-end">
                                        <div className="flex items-center">
                                            <span className='text-sm pr-0.5'>{item.averageRating.toFixed(1)}</span>
                                            <span className='material-icons text-sm text-yellow-400'>star</span>
                                        </div>
                                        
                                        <span className="text-sm text-gray-500 pl-2">
                                            {item.totalRating} đánh giá
                                        </span>
                                    </p>
                                    {item.siteType.name}
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
     );
}


NearbySitesCarouselCard.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            amenity_name: PropTypes.string.isRequired,
            star: PropTypes.number.isRequired,
            "review quantity": PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default NearbySitesCarouselCard;