import { useSelector } from "react-redux";

const ReviewSummaryCard = () => {
    const siteDetail = useSelector((state) => state.siteDetail.amenityDetail);
    return ( 
        <div>
            <h1 className="text-4xl font-bold mb-8">Cảm nhận của bạn về địa điểm này</h1>

            <div className="card card-compact bg-base-100 w-full shadow-xl rounded-lg">
                {siteDetail?.medias[0] && 
                    <figure>
                        <img src={siteDetail?.medias[0].url} className="h-full max-h-72 w-full" alt="Site" />
                    </figure>
                }

                <div className="card-body">
                    <h2 className="card-title">{siteDetail?.siteName}</h2>
                    <div className='flex items-center'>
                        <span className='material-icons-outlined text-2xl text-gray-400'>location_on</span>
                        <span className='text-md font-light pl-1'>{siteDetail?.resolvedAddress}</span>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ReviewSummaryCard;