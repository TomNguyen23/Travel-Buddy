import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

const UploadImage_v2Item = () => {
    const { toast } = useToast();
    const [imageFile, setImageFile] = useState(null);

    const uploadImageHandler = async (props) => {

        if (imageFile) {
            const validImageTypes = ['image/png', 'image/jpg', 'image/jpeg'];
            if (!validImageTypes.includes(imageFile.type)) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Có gì đó sai sai.",
                    description: "Chỉ chấp nhận file ảnh có định dạng PNG, JPG, JPEG.",
                    action: <ToastAction altText="Try again">Thử lại</ToastAction>,
                })
                return;
            }
            // Do something with imageFile

            props.postImageInParent(imageFile);
        }
    }

    useEffect(() => {
        uploadImageHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageFile]);
    return ( 

        <section>
            <div className="flex items-center">
                <label className="bg-gray-200 dark:bg-gray-800 px-3 py-2 mr-2 font-medium cursor-pointer rounded-lg">
                    + Tải ảnh lên
                    <input
                        type="file"
                        name="images"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        multiple
                        accept="image/png, image/jpeg, image/webp"
                        hidden
                    />
                </label>
            </div>
        </section>
     );
}
UploadImage_v2Item.propTypes = {
    postImageInParent: PropTypes.func.isRequired,
};

export default UploadImage_v2Item;