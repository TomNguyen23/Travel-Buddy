import ReportSiteItem from "@/components/items/report/report-site-item";
import AddSiteOutsidePlan from "@/components/items/team-journey_items/add-site-outside-plan";
import { useSelector } from "react-redux";

const SiteDetailSummaryCard = () => {    
    const siteDetail = useSelector((state) => state.siteDetail.amenityDetail);

    return (
        <div>
            {/* tiêu đề về địa điểm */}
            <div className="mb-5">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">{siteDetail?.siteName}</h1>
                    <span className="flex items-center gap-2">
                        <AddSiteOutsidePlan />
                        <ReportSiteItem siteID={siteDetail?.siteId} />
                    </span>
                </div>
                <div className='flex mt-2'>
                    <span className='text-gray-400'>{siteDetail?.averageRating?.toFixed(1)}</span>
                    <span className='material-icons text-yellow-400 pr-2'>star</span>
                    <span className='text-gray-400'>{siteDetail.totalRating} đánh giá</span>

                    <div className="divider divider-horizontal mx-0.5"></div>

                    <div className='text-gray-400'>{siteDetail.siteType?.name}</div>
                </div>

                <div className='flex items-center'>
                    <span className='material-icons-outlined text-2xl text-gray-400'>location_on</span>
                    <span className='text-md text-gray-400 pl-2'>{siteDetail?.resolvedAddress}</span>
                </div>
            </div>
            {/* ---------------------------- */}

            {/* ảnh về địa điểm */}
            <div className="grid grid-cols-4 gap-1">
                {siteDetail?.medias && siteDetail?.medias[0] && (
                    <div className="col-span-2 row-span-2 relative">
                        {siteDetail?.medias[0]?.mediaType === 'IMAGE' 
                            ? <img src={siteDetail?.medias[0]?.url} alt="" className="w-full h-96 object-cover rounded-md" /> 
                            : (
                                <video className="w-full h-96 object-cover rounded-md" 
                                        controls 
                                        autoPlay 
                                        loop
                                        muted
                                    >
                                    <source src={siteDetail?.medias[0]?.url} type="video/mp4"/>
                                </video>
                            )
                        }
                        
                        <button className="px-2 py-1 bg-gray-300/30 dark:bg-gray-700/30 backdrop-blur-md rounded-full flex items-center text-xs absolute top-2 left-2" onClick={()=>document.getElementById('all-images').showModal()}>
                            <span className="material-icons-outlined text-sm pr-1">image</span>
                            Xem tất cả ảnh
                        </button>
                    </div>
                )}
                
                {siteDetail?.medias && siteDetail?.medias[1] && (
                    <div className="col-start-3">
                        {siteDetail?.medias[1]?.mediaType === 'IMAGE' 
                            ? <img src={siteDetail?.medias[1]?.url} alt="" className="w-full h-48 object-cover object-center rounded-md" /> 
                            : (
                                <video className="w-full h-48 object-cover object-center rounded-md" 
                                        controls 
                                        autoPlay 
                                        loop
                                        muted
                                    >
                                    <source src={siteDetail?.medias[1]?.url} type="video/mp4"/>
                                </video>
                            )
                        }
                    </div>
                )}

                {siteDetail?.medias && siteDetail?.medias[2] && (
                    <div className="col-start-4">
                        {siteDetail?.medias[2] && siteDetail?.medias[2]?.mediaType === 'IMAGE' 
                            ? <img src={siteDetail?.medias[2]?.url} alt="" className="w-full h-48 object-cover object-center rounded-md" /> 
                            : (
                                <video className="w-full h-48 object-cover object-center rounded-md" 
                                        controls 
                                        autoPlay 
                                        loop
                                        muted
                                    >
                                    <source src={siteDetail?.medias[2]?.url} type="video/mp4"/>
                                </video>
                            )
                        }
                    </div>
                )}

                {siteDetail?.medias && siteDetail?.medias[3] && (
                    <div className="col-start-3 row-start-2">
                        {siteDetail?.medias[3] && siteDetail?.medias[3]?.mediaType === 'IMAGE' 
                            ? <img src={siteDetail?.medias[3]?.url} alt="" className="w-full h-48 object-cover object-center rounded-md" /> 
                            : (
                                <video className="w-full h-48 object-cover object-center rounded-md" 
                                        controls 
                                        autoPlay 
                                        loop
                                        muted
                                    >
                                    <source src={siteDetail?.medias[3]?.url} type="video/mp4"/>
                                </video>
                            )
                        }
                    </div>
                )}

                {siteDetail?.medias && siteDetail?.medias[4] && (
                    <div className="col-start-4 row-start-2">
                        {siteDetail?.medias[4] && siteDetail?.medias[4]?.mediaType === 'IMAGE' 
                            ? <img src={siteDetail?.medias[4]?.url} alt="" className="w-full h-48 object-cover object-center rounded-md" /> 
                            : (
                                <video className="w-full h-48 object-cover object-center rounded-md" 
                                        controls 
                                        autoPlay 
                                        loop
                                        muted
                                    >
                                    <source src={siteDetail?.medias[4]?.url} type="video/mp4"/>
                                </video>
                            )
                        }
                    </div>
                )}

            </div>
            {/* ---------------------------- */}

            {/* modal ảnh */}
            <dialog id="all-images" className="modal">
                <div className="modal-box w-11/12 max-w-5xl rounded-lg max-h-full overflow-auto">
                    <h3 className="font-bold text-lg">Tất cả ảnh về {siteDetail.siteName}</h3>
                    
                    <div className="grid grid-cols-4 grid-rows-2 gap-2 mt-4">
                        {siteDetail?.medias?.map((item, index) => {
                            // <img src={item.imgelink} alt="" className="w-full h-48 object-cover rounded-md" key={index} />
                            if (item.mediaType === 'IMAGE') {
                                return <img key={index} 
                                            src={item.url} 
                                            className="w-full h-36 object-cover rounded-md" 
                                            alt="Review Media" 
                                        />;
                            } else if (item.mediaType === 'VIDEO') {
                                return <video key={index} 
                                            className="w-full h-36 object-cover rounded-md" 
                                            controls 
                                            autoPlay 
                                            loop
                                            muted
                                        >
                                        <source src={item.url} type="video/mp4"/>
                                        Your browser does not support the video tag.
                                    </video>;
                            } else {
                                return null;
                            }
                        })}
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