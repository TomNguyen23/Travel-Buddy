const ReviewSummaryCard = () => {
    return ( 
        <div>
            <h1 className="text-4xl font-bold mb-8">Cảm nhận của bạn về địa điểm này</h1>

            <div className="card card-compact bg-base-100 w-full shadow-xl rounded-lg">
                <figure>
                    <img src="https://picsum.photos/200" className="h-full max-h-72 w-full" alt="Site" />
                </figure>

                <div className="card-body">
                    <h2 className="card-title">Sunworld Bà nà Hill</h2>
                    <div className='flex items-center'>
                        <span className='material-icons-outlined text-2xl text-gray-400'>location_on</span>
                        <span className='text-md font-light pl-1'>Hoà Ninh, Hòa Vang, Đà Nẵng</span>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ReviewSummaryCard;