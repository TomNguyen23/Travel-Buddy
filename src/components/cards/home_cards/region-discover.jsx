import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const RegionDiscoverCard = () => {
    const data = [{
        "id": 1,
        "region": "Đà Nẵng",
        "siteNum": 2143,
        "image": "https://images.pexels.com/photos/23529021/pexels-photo-23529021/free-photo-of-tay-m-c-xay-d-ng-khach-du-l-ch.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      }, {
        "id": 2,
        "region": "Huế",
        "siteNum": 3404,
        "image": "https://images.pexels.com/photos/27418881/pexels-photo-27418881/free-photo-of-phong-c-nh-thien-nhien-m-c-n-c.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      }, {
        "id": 3,
        "region": "Quảng Nam",
        "siteNum": 1638,
        "image": "https://images.pexels.com/photos/4695913/pexels-photo-4695913.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      }, {
        "id": 4,
        "region": "Hà Nội",
        "siteNum": 2357,
        "image": "https://images.pexels.com/photos/17406698/pexels-photo-17406698/free-photo-of-thanh-ph-m-c-toa-nha-cay.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      }, {
        "id": 5,
        "region": "Hồ Chí Minh",
        "siteNum": 1959,
        "image": "https://images.pexels.com/photos/18883378/pexels-photo-18883378/free-photo-of-thanh-ph-m-c-d-ng-ph-thap.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      }];
    return ( 
        <div className="my-10">
            <h1 className="text-2xl font-bold my-5">Khám phá vùng miền</h1>

            <Carousel className="w-full">
                <CarouselContent className="-ml-1">
                    {data?.map((item) => (
                        <CarouselItem key={item.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                            <div className="bg-cover bg-center rounded-md mb-4 h-60" 
                                style={{ backgroundImage: `url(${item.image})` }}>
                                <div className="bg-blackOverlay hover:bg-slate-900/40 h-full rounded-md text-white">
                                    <h1 className='text-3xl font-bold px-7 pt-40'>{item.region}</h1>
                                    <p className="px-7 font-light">{item.siteNum} điểm đến</p>
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
 
export default RegionDiscoverCard;