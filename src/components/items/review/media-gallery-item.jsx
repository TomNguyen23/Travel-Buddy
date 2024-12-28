import PropTypes from 'prop-types';

const MediaGallery = ({ media, onRemoveMedia }) => {
    if (!media || media.length === 0) return null;
  
    return (
      <div className="mb-10">
        <h1 className="text-xl font-semibold pb-3">Ảnh/video đã đăng tải từ trước</h1>
        <div className="grid grid-cols-3 gap-1 mt-3">
          {media.map((item, index) => (
            <div key={index} className="relative">
              {item.mediaType === "IMAGE" ? (
                <img
                  src={item.url}
                  className="w-full h-36 object-cover rounded-md"
                  alt="Review Media"
                />
              ) : item.mediaType === "VIDEO" ? (
                <video
                  className="w-full h-36 object-cover rounded-md"
                  controls
                  autoPlay
                  loop
                  muted
                >
                  <source src={item.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : null}
  
              <span
                className="material-icons-outlined cursor-pointer absolute top-0 right-0 p-2 text-gray-500"
                onClick={() => onRemoveMedia(index)}
              >
                cancel
              </span>
            </div>
          ))}
        </div>
      </div>
    );
};
  
MediaGallery.propTypes = {
    media: PropTypes.arrayOf(
        PropTypes.shape({
        mediaType: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        })
    ).isRequired,
    onRemoveMedia: PropTypes.func.isRequired,
};  
export default MediaGallery;
  