/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const DiscoverCategoryCard = ({ navigateTo, props }) => {
    return ( 
        <Link to={navigateTo} >
            <div className="bg-cover bg-center rounded-md mb-4 h-52" 
                style={{ backgroundImage: `url(${props.image})` }}>
                <div className="bg-blackOverlay hover:bg-slate-900/40 h-full rounded-md text-white">
                    <h1 className='text-5xl font-bold px-7 pt-28'>{props.name}</h1>
                </div>
            </div>
        </Link>
     );
}
DiscoverCategoryCard.propTypes = {
    navigateTo: PropTypes.func.isRequired,
    props: PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired
};
 
export default DiscoverCategoryCard;