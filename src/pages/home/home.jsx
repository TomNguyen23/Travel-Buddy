import SearchBar from "@/components/bars/search-bar";
import MainFooter from "@/components/cards/footer/main-footer";
import AddNewSiteCard from "@/components/cards/home_cards/add-new-site";
import HomePageForYouCard from "@/components/cards/home_cards/for-you";
import IntroduceCard from "@/components/cards/home_cards/introduce";
import RegionDiscoverCard from "@/components/cards/home_cards/region-discover";
import HomeHeader from "@/components/headers/home-header";

const HomePage = () => {
    return ( 
        <>
            <HomeHeader />

            <div
                className="hero md:min-h-[calc(100vh-100px)] bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
                }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center w-[96rem]">
                    <div className="max-w-xl">
                        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                        <p className="mb-5">
                            Chúng ta đi, không phải để đến nơi, mà để đi. Đi để thấy, để nghe, để cảm nhận, để hiểu.
                            Chúng ta chia sẻ những địa điểm, những trải nghiệm, những kỷ niệm, những câu chuyện.
                        </p>
                        <div className="flex justify-center"><SearchBar /></div>
                    </div>
                </div>
            </div>

            <main className="px-44">
                <IntroduceCard />
                {/* <RegionDiscoverCard /> */}
                <HomePageForYouCard />
                <AddNewSiteCard />
            </main>


            <MainFooter />
        </>
     );
}
 
export default HomePage;