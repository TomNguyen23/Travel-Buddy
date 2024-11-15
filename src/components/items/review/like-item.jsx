import { useState } from "react";

const LikeItem = () => {
    const [liked, setLiked] = useState(false);
    const [isFetching, setIsFetching] = useState(false);


    const handleLikeUnlike = () => {
        // setIsFetching(true);
        setLiked(!liked);
        // try {
        //     const response = await fetch(
        //         "https://www.greatfrontend.com/api/questions/like-button",
        //         {
        //             method: "POST",
        //             headers: { "Content-Type": "application/json" },
        //             body: JSON.stringify({
        //                 action: liked ? "unlike" : "like",
        //             }),
        //         }
        //     );

        //     if (response.status >= 200 && response.status < 300) {
        //         setLiked(!liked);
        //     }
        // } finally {
        //     setIsFetching(false);
        // }
    };
    return ( 
        <button onClick={handleLikeUnlike}>
            {isFetching 
            ? <span className="loading loading-spinner loading-sm"></span> 
            : <span className={`${liked ? 'material-icons' : 'material-icons-outlined'}`}>thumb_up</span>
            }
        </button>
     );
}
 
export default LikeItem;