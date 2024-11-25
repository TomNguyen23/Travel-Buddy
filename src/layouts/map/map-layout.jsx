import PropTypes from 'prop-types';

const MapLayout = ({ children }) => {
    return ( 
        <div className="min-h-screen flex flex-wrap">
            {children}
        </div>
     );
}
 
MapLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };
export default MapLayout;