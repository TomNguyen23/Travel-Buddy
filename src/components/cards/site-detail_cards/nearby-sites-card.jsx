import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button"
import NearbySitesCarouselCard from "./nearby-sites-carousel_card";
import { useGetNearbySitesQuery } from "@/api/featureApi/siteApiSlice";
import { useSelector } from "react-redux";

const NearbySitesCard = () => {
    const [radius, setRadius] = useState(1);

    const coordinates = useSelector((state) => state.siteDetail.amenityDetail);
    const { data } = useGetNearbySitesQuery(
      {lat: coordinates.lat, lng: coordinates.lng, degRadius: radius/111},
      {refetchOnMountOrArgChange: true}
    );
    const restaurants = data?.filter(site => site.siteType.amenity === true && site.siteType.attraction === false);
    const attractions = data?.filter(site => site.siteType.attraction === true);
    

    return ( 
        <Card className='my-5'>
            <CardHeader>
                <h2 className='text-xl font-semibold'>Đi đâu gần đây</h2>
                <CardDescription>
                    Những địa điểm dưới đây nằm trong bán kính

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="bg-transparent hover:bg-inherit text-inherit">
                                {radius} km
                                <span className="material-icons text-lg">arrow_drop_down</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='h-52 overflow-auto'>
                            <DropdownMenuRadioGroup value={radius} onValueChange={setRadius}>
                                {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
                                    <DropdownMenuRadioItem key={value} value={value}>
                                        {value} km
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardDescription>
            </CardHeader>

            <CardContent>
                <section className="mb-5">
                    <p className='font-semibold text-gray-500 mb-4'>Những tiện ích gần đây</p>
                    <NearbySitesCarouselCard data={restaurants} />
                </section>

                <section className="my-4">
                    <p className='font-semibold text-gray-500 mb-4'>Những địa điểm khám phá trải nghiệm được yêu thích</p>
                    <NearbySitesCarouselCard data={attractions} />
                </section>
            </CardContent>
        </Card>
     );
}
 
export default NearbySitesCard;