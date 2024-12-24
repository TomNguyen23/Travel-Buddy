import MySitesCard from "@/components/cards/user_cards/my-sites_card";

const MySites = () => {
    return ( 
        <>
            <h1 className="text-3xl font-semibold">Địa điểm đã đăng tải</h1>

            <main className="mt-4">
                <MySitesCard />
            </main>
        </>
     );
}
 
export default MySites;