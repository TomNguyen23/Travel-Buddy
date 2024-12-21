import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import UploadImage_v2Item from "@/components/items/review/upload-images-v2-item";

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getNewSitebasicInfo } from "@/redux/reducer/new-site.reducer";

const NewSiteMediaCard = () => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const [medias, setMedias] = useState([]);

    const handlePostImage = () => {
        const mediaData = {
            medias: medias,
        };

        dispatch(getNewSitebasicInfo(mediaData));
        navigateTo('/new-site/confirmation');
    }

    const handleRemoveMedia = (url) => {
        setMedias((prev) => prev.filter((media) => media.url !== url));
    };

    return ( 
        <Card>
            <CardHeader>
                <CardTitle>Thêm ảnh về địa điểm của bạn</CardTitle>
                <CardDescription>
                    Ảnh đầu tiên sẽ là ảnh đại diện về địa điểm của bạn, sẽ là điều đầu tiên
                    người dùng nhìn thấy khi tìm kiếm địa điểm của bạn. Vì vậy, hãy chọn ảnh đẹp nhất
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h2 className="font-bold mb-2">Nên</h2>

                        <table className="text-sm">
                            <tr>
                                <td><span className="material-icons-outlined text-green-600">check</span></td>
                                <td>Chọn ảnh có độ phân giải cao</td>
                            </tr>
                            <tr>
                                <td><span className="material-icons-outlined text-green-600">check</span></td>
                                <td>Chọn ảnh có góc chụp đẹp, không bị mờ, không bị rung</td>
                            </tr>
                            <tr>
                                <td><span className="material-icons-outlined text-green-600">check</span></td>
                                <td>Chọn ảnh có ánh sáng tốt, không quá sáng hoặc quá tối</td>
                            </tr>
                            <tr>
                                <td><span className="material-icons-outlined text-green-600">check</span></td>
                                <td>Kích thước mỗi ảnh không quá 7MB</td>
                            </tr>
                        </table>
                    </div>

                    <div>
                        <h2 className="font-bold mb-2">Không nên</h2>

                        <table className="text-sm">
                            <tr>
                                <td><span className="material-icons-outlined text-red-600">close</span></td>
                                <td>Ảnh có logo/quảng cáo/watermark</td>
                            </tr>
                            <tr>
                                <td><span className="material-icons-outlined text-red-600">close</span></td>
                                <td>Ảnh không phải của chính bạn hoặc không có quyền sử dụng</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div className="mt-8">
                    <UploadImage_v2Item 
                        getMediaInParent={(media) => setMedias([...medias, media])} 
                        removeMediaInParent={handleRemoveMedia}
                    />
                </div>
            </CardContent>

            <CardFooter>
                <Button onClick={handlePostImage} className='bg-main hover:bg-main-hover'>Tiếp theo</Button>
            </CardFooter>
        </Card>

     );
}
 
export default NewSiteMediaCard;