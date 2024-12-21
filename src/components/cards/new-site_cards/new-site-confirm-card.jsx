import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usePostNewSiteMutation } from "@/api/featureApi/siteApiSlice";

const NewSiteConfirmCard = () => {
    const { toast } = useToast();
    const siteInfo = useSelector((state) => state.newSite.newSiteInfo);
    const navigateTo = useNavigate();

    const [postNewSite] = usePostNewSiteMutation();
    const handlePostNewSite = async () => {
        await postNewSite(siteInfo)
            .unwrap()
            .then(() => {
                navigateTo('/new-site/done');
            })
            .catch((error) => {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Có gì đó sai sai.",
                    description: error.data.message,
                    action: <ToastAction altText="Try again">Thử lại</ToastAction>,
                })
            })
    }

    return ( 
        <Card className="mb-10">
            <CardHeader>
                <CardTitle>Xác nhận điều khoản đăng địa điểm</CardTitle>
                <CardDescription>
                    Bằng việc xác nhận, bạn đã đồng ý với các điều khoản và quy định của chúng tôi.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <h1 className="font-semibold mb-4">ĐIỀU KHOẢN VÀ QUY ĐỊNH VỀ VIỆC ĐĂNG ĐỊA ĐIỂM TRÊN TRAVEL BUDDY</h1>

                <h2 className="font-bold ">1. Phạm vi áp dụng</h2>
                <p className="mb-4 font-light">
                    Điều khoản này áp dụng cho tất cả các cá nhân, tổ chức muốn đăng địa điểm tham quan, 
                    du lịch khám phá hoặc địa điểm kinh doanh như nhà hàng, khách sạn, resort trên nền tảng Travel Buddy.
                </p>
                
                <h2 className="font-bold mb-2">2. Điều kiện đăng địa điểm</h2>
                <h3 className="font-semibold">2.1. Tính chính xác và minh bạch:</h3>
                <p className="mb-4 ml-2 font-light"> 
                    - Địa điểm phải cung cấp thông tin chính xác, đầy đủ và minh bạch. <br />
                    - Hình ảnh phải rõ ràng, không vi phạm bản quyền.
                </p>
                <h3 className="font-semibold">2.2. Tính hợp pháp:</h3>
                <p className="mb-4 ml-2 font-light"> 
                    - Địa điểm phải tuân thủ các quy định pháp luật hiện hành. <br />
                    - Không đăng địa điểm có hoạt động bất hợp pháp, không lành mạnh.
                </p>
                <h3 className="font-semibold">2.3. Quyền sở hữu và ủy quyền:</h3>
                <p className="mb-4 ml-2 font-light"> 
                    - Người đăng phải là chủ sở hữu hoặc có sự ủy quyền hợp lệ từ chủ sở hữu.
                </p>
                
                <h2 className="font-bold mb-2">3. Nội dung địa điểm đăng tải</h2>
                <h3 className="font-semibold">3.1. Mô tả địa điểm:</h3>
                <p className="mb-4 ml-2 font-light"> 
                    - Cung cấp mô tả chi tiết về dịch vụ, tiện ích, giờ hoạt động, địa chỉ và thông tin liên hệ.
                </p>
                <h3 className="font-semibold">3.2. Hình ảnh và video:</h3>
                <p className="mb-4 ml-2 font-light"> 
                    - Hình ảnh và video phải thể hiện đúng thực tế. <br />
                    - Không chứa nội dung phản cảm, bạo lực, kích động hay vi phạm thuần phong mỹ tục.
                </p>
                <h3 className="font-semibold">3.3. Giá cả và ưu đãi:</h3>
                <p className="mb-4 ml-2 font-light"> 
                    - Nếu có thông tin về giá cả, khuyến mãi, phải cập nhật chính xác và kịp thời.
                </p>
                
                <h2 className="font-bold mb-2">4. Trách nhiệm của người đăng</h2>
                <p className="mb-4 ml-2 font-light"> 
                    - Chịu trách nhiệm hoàn toàn về tính chính xác và hợp pháp của thông tin đăng tải. <br />
                    - Đồng ý cho nền tảng sử dụng thông tin và hình ảnh để quảng bá.
                </p>
                
                <h2 className="font-bold mb-2">5. Quyền của nền tảng</h2>
                <p className="mb-4 ml-2 font-light"> 
                    - Có quyền từ chối, chỉnh sửa hoặc xóa bỏ thông tin nếu phát hiện vi phạm các điều khoản. <br />
                    - Không chịu trách nhiệm pháp lý liên quan đến nội dung do người dùng đăng tải.
                </p>
                
                <h2 className="font-bold mb-2">6. Quy định về xử lý vi phạm</h2>
                <p className="mb-4 ml-2 font-light"> 
                    - Cảnh cáo hoặc khóa tài khoản nếu người đăng vi phạm điều khoản. <br />
                    - Thông báo cơ quan chức năng nếu có hành vi vi phạm pháp luật nghiêm trọng.
                </p>
                
                <h2 className="font-bold mb-2">7. Điều khoản bổ sung</h2>
                <p className="mb-4 ml-2 font-light"> 
                    - Nền tảng có quyền thay đổi điều khoản bất kỳ lúc nào mà không cần báo trước. <br />
                    - Người đăng có trách nhiệm cập nhật các thay đổi và tuân thủ các điều khoản mới. <br />
                    - Bằng việc đăng địa điểm, người dùng đồng ý tuân thủ đầy đủ các điều khoản và quy định này.
                </p>  
            </CardContent>

            <CardFooter>
                <Button onClick={handlePostNewSite} className='bg-main hover:bg-main-hover'>Xác nhận</Button>
            </CardFooter>
        </Card>
     );
}
 
export default NewSiteConfirmCard;