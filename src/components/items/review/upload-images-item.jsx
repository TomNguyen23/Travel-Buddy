import { useState } from "react";
import PropTypes from "prop-types";

const UploadImagesItem = (props) => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [imagesURL, setImagesURL] = useState([]);

    const onSelectFile = (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);

        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });

        setImagesURL((previousImagesURL) => previousImagesURL.concat(imagesArray));

        setSelectedImages((previousImages) => {
            const newImages = previousImages.concat(selectedFilesArray);
            props.getImages(newImages); // Pass the selected images to the parent
            return newImages;
        });



        // FOR BUG IN CHROME
        event.target.value = "";
    };

    function handleDeleteImage(imageToDelete) {
        // Find the index of the image to delete
        const indexToDelete = imagesURL.indexOf(imageToDelete);

        // Remove the image from the selectedImages array
        setSelectedImages((previousImages) => {
            const newImages = [...previousImages];
            newImages.splice(indexToDelete, 1);
            props.getImages(newImages);
            return newImages;
        });

        // Remove the image URL from the imagesURL array
        setImagesURL((previousImagesURL) => {
            const newImagesURL = [...previousImagesURL];
            newImagesURL.splice(indexToDelete, 1);
            return newImagesURL;
        });

        // Revoke the object URL
        URL.revokeObjectURL(imageToDelete);
    }

    return ( 
        <section>
            <div className="flex items-center">
                <label className="bg-gray-200 dark:bg-gray-800 px-3 py-2 mr-2 font-medium cursor-pointer rounded-lg">
                    + Tải ảnh lên
                    <input
                        type="file"
                        name="images"
                        onChange={onSelectFile}
                        multiple
                        accept="image/png, image/jpeg, image/webp"
                        hidden
                    />
                </label>

                {selectedImages.length > 0 &&
                    (selectedImages.length > 5 ? (
                        <p className="font-light text-red-700">Bạn đã đăng quá số lượng ảnh giới hạn</p>) 
                        : (
                            null
                        // <Button onClick={() => console.log(selectedImages)} className='bg-main hover:bg-main-hover'>Upload</Button>
                    ))
                }
            </div>

            <div className="grid grid-cols-3 gap-6 my-4">
                {imagesURL &&
                    imagesURL.map((image) => {
                        return (
                            <div key={image} className="w-full relative">
                                <img src={image} className="rounded-md" alt="upload" />
                                <span className="material-icons-outlined cursor-pointer absolute top-0 right-0 p-2 text-white"
                                    onClick={() => handleDeleteImage(image)}
                                >
                                    cancel
                                </span> 
                            </div>
                        );
                    })
                }
            </div>

            

            
        </section>
     );
}

UploadImagesItem.propTypes = {
    getImages: PropTypes.func.isRequired,
};
 
export default UploadImagesItem;