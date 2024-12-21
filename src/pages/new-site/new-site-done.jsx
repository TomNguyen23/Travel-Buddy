import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NewSiteDone = () => {
    return ( 
        <main className="w-full my-14 flex flex-col items-center justify-center">
            <span className="material-icons-outlined text-green-600 text-9xl">task_alt</span>
            <h1 className="text-3xl font-bold mt-8">Cảm ơn bạn đã đóng góp!</h1>
            <p className="text-lg text-center mt-4">
                Địa điểm của bạn sẽ được kiểm duyệt và cập nhật sớm nhất có thể. <br /> 
                Hãy kiểm tra thông báo từ chúng tôi để cập nhật trạng thái của địa điểm.
            </p>

            <Link to="/" className="mt-8">
                <Button>Trở về trang chủ</Button>
            </Link>
        </main> 
    );
}
 
export default NewSiteDone;