import { useSelector } from "react-redux";

const SiteDetailSummaryCard = () => {
    const data = [
        {
            imgelink:
            "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        },
        {
            imgelink:
            "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        },
        {
            imgelink:
            "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
        },
        {
            imgelink:
            "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
        },
        {
            imgelink:
            "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
        },
        
    ];
    
    const siteDetail = useSelector((state) => state.siteDetail.amenityDetail);

    return (
        <div>
            {/* tiêu đề về địa điểm */}
            <div className="mb-5">
                <h1 className="text-3xl font-bold">{siteDetail.siteName}</h1>
                <div className='flex mt-2'>
                    <span className='text-gray-400'>4.6</span>
                    <span className='material-icons text-yellow-400 pr-2'>star</span>
                    <span className='text-gray-400'>200 đánh giá</span>

                    <div className="divider divider-horizontal mx-0.5"></div>

                    <div className='text-gray-400'>{siteDetail.siteType.name}</div>
                </div>

                <div className='flex items-center'>
                    <span className='material-icons-outlined text-2xl text-gray-400'>location_on</span>
                    <span className='text-md text-gray-400 pl-2'>{siteDetail.resolvedAddress}</span>
                </div>
            </div>
            {/* ---------------------------- */}

            {/* ảnh về địa điểm */}
            <div className="grid grid-cols-4 gap-1">
                <div className="col-span-2 row-span-2 relative">
                    <img src={data[0].imgelink} alt="" className="w-full h-96 object-cover rounded-md" />
                    
                    <button className="px-2 py-1 bg-gray-300/30 dark:bg-gray-700/30 backdrop-blur-md rounded-full flex items-center text-xs absolute top-2 left-2" onClick={()=>document.getElementById('all-images').showModal()}>
                        <span className="material-icons-outlined text-sm pr-1">image</span>
                        Xem tất cả ảnh
                    </button>
                </div>

                <div className="col-start-3">
                    <img src={data[1].imgelink} alt="" className="w-full h-48 object-cover object-center rounded-md" />
                </div>

                <div className="col-start-4">
                    <img src={data[2].imgelink} alt="" className="w-full h-48 object-cover object-center rounded-md" />
                </div>

                <div className="col-start-3 row-start-2">
                    <img src={data[3].imgelink} alt="" className="w-full h-48 object-cover object-center rounded-md" />
                </div>

                <div className="col-start-4 row-start-2">
                    <img src={data[4].imgelink} alt="" className="w-full h-48 object-cover object-center rounded-md" />
                </div>
            </div>
            {/* ---------------------------- */}

            {/* modal ảnh */}
            <dialog id="all-images" className="modal">
                <div className="modal-box w-11/12 max-w-5xl rounded-lg max-h-full overflow-auto">
                    <h3 className="font-bold text-lg">Tất cả ảnh về {siteDetail.siteName}</h3>
                    
                    <div className="grid grid-cols-4 grid-rows-2 gap-2 mt-4">
                        {data.map((item, index) => (
                            <img src={item.imgelink} alt="" className="w-full h-48 object-cover rounded-md" key={index} />
                        ))}
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            {/* ---------------------------- */}
        </div>
     );
}
 
export default SiteDetailSummaryCard;