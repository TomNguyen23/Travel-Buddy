import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const HomePageForYouCard = () => {
    const data = [{
        "id": 1,
        "site_name": "Diré",
        "rating": 4.6,
        "reviews": 153,
        "resolvedAddress": "19 Maple Lane"
      }, {
        "id": 2,
        "site_name": "Buffalo",
        "rating": 3.6,
        "reviews": 339,
        "resolvedAddress": "43 Colorado Alley"
      }, {
        "id": 3,
        "site_name": "Lixu",
        "rating": 4.0,
        "reviews": 392,
        "resolvedAddress": "145 Beilfuss Center"
      }, {
        "id": 4,
        "site_name": "Doksy",
        "rating": 4.4,
        "reviews": 221,
        "resolvedAddress": "0076 Sutherland Plaza"
      }, {
        "id": 5,
        "site_name": "Hengli",
        "rating": 4.9,
        "reviews": 148,
        "resolvedAddress": "12541 Maple Wood Alley"
      }];

    return ( 
        <div className="my-10">
            <h1 className="text-2xl font-bold my-5">Gợi ý dành cho bạn</h1>

            <Carousel className="w-full">
                <CarouselContent className="-ml-1">
                    {data?.map((item) => (
                        <CarouselItem key={item.id} className="pl-1 md:basis-1/2 lg:basis-1/4">
                            <div className="card card-compact h-full border rounded-lg">
                                <figure className="h-1/2">
                                    <img
                                    src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                                    className="w-full object-cover bg-center"
                                    alt="Movie" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="font-medium cursor-pointer hover:underline">{item.site_name}</h2>
                                    <p className="flex items-end">
                                        <div className="flex items-center">
                                            <span className='text-sm pr-0.5'>{item.rating}</span>
                                            <span className='material-icons text-sm text-yellow-400'>star</span>
                                        </div>
                                        
                                        <span className="text-sm text-gray-500 pl-2">
                                            {item.reviews} đánh giá
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