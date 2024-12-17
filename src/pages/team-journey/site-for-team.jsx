import { useState, useEffect } from "react";
import { useGetAllSitesQuery } from "@/api/featureApi/siteApiSlice";
import ForTeamCard from "@/components/cards/team-journey_card/for-team_card";

const SiteForTeam = () => {
    const [page, setPage] = useState(1);
    const { data: sites, isFetching } = useGetAllSitesQuery(page, {refetchOnMountOrArgChange: true});
    const [allSites, setAllSites] = useState([]);

    useEffect(() => {
        if (sites) {
            setAllSites(prevSites => [...prevSites, ...sites.data]);
        }
    }, [sites]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            setPage((prev) => prev + 1);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <main className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            {allSites.map((site) => (
                <ForTeamCard key={site.siteId} site={site} />
            ))}
            {isFetching && <span className="loading loading-dots loading-lg"></span>}
        </main>
    );
};

export default SiteForTeam;