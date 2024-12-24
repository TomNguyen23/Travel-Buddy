import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

import MySiteItem from "@/components/items/user_items/my-sites-item";
import { useGetMyPostedSitesQuery } from "@/api/featureApi/siteApiSlice";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const MySitesCard = () => {
    const { data: postedSites, refetch } = useGetMyPostedSitesQuery({ refetchOnMountOrArgChange: true });

    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/my-sites') {
            refetch();
        }
    }, [location, refetch]);

    const pendingSites = postedSites?.data.filter(site => site.state === 'PENDING');
    const approvedSites = postedSites?.data.filter(site => site.state === 'APPROVED');
    const rejectedSites = postedSites?.data.filter(site => site.state === 'REJECTED');

    return ( 
        <Tabs defaultValue="waiting" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="waiting">Đang chờ xét duyệt</TabsTrigger>
                <TabsTrigger value="done">Đã được xét duyệt</TabsTrigger>
                <TabsTrigger value="rejected">Bị từ chối</TabsTrigger>
            </TabsList>

            <TabsContent value="waiting">
                {pendingSites && pendingSites.length === 0 ? (
                    <div className='flex flex-col items-center gap-4 mt-20'>
                        <span className='material-icons-outlined text-9xl text-gray-500'>mode_of_travel</span>
                        <div className="text-center text-lg text-gray-500">
                            Chưa có địa điểm nào đang chờ xét duyệt
                        </div>
                    </div>
                ): (
                    <div className="grid grid-cols-1 gap-4">
                        {pendingSites?.map(site => (
                            <MySiteItem key={site.siteVersionId} site={site} />
                        ))}
                    </div>
                )}
            </TabsContent>

            <TabsContent value="done">
                {approvedSites && approvedSites.length === 0 ? (
                    <div className='flex flex-col items-center gap-4 mt-20'>
                        <span className='material-icons-outlined text-9xl text-gray-500'>person_pin_circle</span>
                        <div className="text-center text-lg text-gray-500">
                            Chưa có địa điểm nào đã được xét duyệt
                        </div>
                    </div>
                ): (
                    <div className="grid grid-cols-1 gap-4">
                        {approvedSites?.map(site => (
                            <MySiteItem key={site.siteVersionId} site={site} />
                        ))}
                    </div>
                )}
            </TabsContent>

            <TabsContent value="rejected">
                {rejectedSites && rejectedSites.length === 0 ? (
                    <div className='flex flex-col items-center gap-4 mt-20'>
                        <span className='material-icons-outlined text-9xl text-gray-500'>fmd_bad</span>
                        <div className="text-center text-lg text-gray-500">
                            Chưa có địa điểm nào bị từ chối
                        </div>
                    </div>
                ): (
                    <div className="grid grid-cols-1 gap-4">
                        {rejectedSites?.map(site => (
                            <MySiteItem key={site.siteVersionId} site={site} />
                        ))}
                    </div>
                )}
            </TabsContent>
        </Tabs>
     );
}
 
export default MySitesCard;