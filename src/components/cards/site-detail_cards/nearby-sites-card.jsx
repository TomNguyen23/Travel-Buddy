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
    // const restaurants = [{
    //     "id": 1,
    //     "amenity_name": "Dryopteris expansa (C. Presl) Fraser-Jenkins & Jermy",
    //     "star": 3.5,
    //     "review quantity": 263
    //   }, {
    //     "id": 2,
    //     "amenity_name": "Caloplaca sinapisperma (Lam. & DC.) Maheu & A. Gillet",
    //     "star": 4.8,
    //     "review quantity": 177
    //   }, {
    //     "id": 3,
    //     "amenity_name": "Solanum sandwicense Hook. & Arn.",
    //     "star": 4.4,
    //     "review quantity": 141
    //   }, {
    //     "id": 4,
    //     "amenity_name": "Lupinus sericeus Pursh ssp. huffmanii (C.P. Sm.) Fleak & D. Dunn",
    //     "star": 4.1,
    //     "review quantity": 116
    //   }, {
    //     "id": 5,
    //     "amenity_name": "Argythamnia mercurialina (Nutt.) Müll. Arg. var. pilosissima (Benth.) Shinners",
    //     "star": 5,
    //     "review quantity": 208
    //   }];

    // const attractions = [{
    //     "id": 1,
    //     "amenity_name": "Calochortus catalinae S. Watson",
    //     "star": 3.2,
    //     "review quantity": 259
    //   }, {
    //     "id": 2,
    //     "amenity_name": "Oxytropis besseyi (Rydb.) Blank.",
    //     "star": 4.7,
    //     "review quantity": 207
    //   }, {
    //     "id": 3,
    //     "amenity_name": "Pohlia tundrae Shaw",
    //     "star": 4.4,
    //     "review quantity": 127
    //   }, {
    //     "id": 4,
    //     "amenity_name": "Eriogonum gracilipes S. Watson",
    //     "star": 4.3,
    //     "review quantity": 179
    //   }, {
    //     "id": 5,
    //     "amenity_name": "Artemisia arbuscula Nutt. ssp. thermopola Beetle",
    //     "star": 3.2,
    //     "review quantity": 122
    //   }, {
    //     "id": 6,
    //     "amenity_name": "Cyperus cuspidatus Kunth",
    //     "star": 4.6,
    //     "review quantity": 119
    //   }, {
    //     "id": 7,
    //     "amenity_name": "Myrcia deflexa (Poir.) DC.",
    //     "star": 4.5,
    //     "review quantity": 152
    //   }];

    const coordinates = useSelector((state) => state.siteDetail.amenityDetail);
    const { data } = useGetNearbySitesQuery(
      {lat: coordinates.lat, lng: coordinates.lng, degRadius: radius},
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