import { useLocation } from "react-router-dom";

const DiscoverRankingPanel = () => {
    const panelOptions = [
        { 
            title: 'Khách sạn & Resort', 
            imagePath: 'https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
            path: '/discover/hotel&resort', 
        },
        { 
            title: 'Khám phá ẩm thực', 
            imagePath: 'https://images.pexels.com/photos/2240361/pexels-photo-2240361.jpeg',
            path: '/discover/cuisine',
        },
        { 
            title: 'Hòa vào thiên nhiên', 
            imagePath: 'https://images.pexels.com/photos/18058627/pexels-photo-18058627/free-photo-of-binh-minh-hoang-hon-r-ng-nui.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            path: '/discover/nature',
        },
        { 
            title: 'Điểm đến giải trí', 
            imagePath: 'https://images.pexels.com/photos/12858962/pexels-photo-12858962.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            path: '/discover/entertainment',
        },
        { 
            title: 'Địa điểm tham quan', 
            imagePath: 'https://images.pexels.com/photos/1621249/pexels-photo-1621249.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            path: '/discover/destination',
        },
        
    ];
    const path = useLocation().pathname;
    const currentPanel = panelOptions.find(panel => panel.path === path);

    return ( 
        <div className="bg-cover bg-center mb-4 h-96" 
            style={{ backgroundImage: `url(${currentPanel.imagePath})` }}
        >
            <div className="bg-blackOverlay h-full text-white">
                <div className="px-32 pb-20 h-full flex flex-col justify-end">
                    <h1 className="text-2xl font-medium">Lựa chọn của Travelers</h1>
                    <h1 className='text-5xl font-bold'>{currentPanel.title}</h1>
                </div>
            </div>
        </div>
     );
}
 
export default DiscoverRankingPanel;