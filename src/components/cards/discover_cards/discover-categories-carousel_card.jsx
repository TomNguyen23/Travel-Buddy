import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import DiscoverCategoryCard from "./discover-categoty_card";

import { useSelector } from "react-redux";

const DiscoverCategoriesCarousel = () => {
    const categories = useSelector((state) => state.discover.categories);

    return ( 
        <Carousel className="w-full max-w-6xl">
            <CarouselContent className="-ml-1">
                {categories.map((category) => (
                    <CarouselItem key={category.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <DiscoverCategoryCard 
                                key={category.id} 
                                navigateTo={`/discover/${category.to}`} 
                                props={category} 
                                className="w-full h-72"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
     );
}
 
export default DiscoverCategoriesCarousel;