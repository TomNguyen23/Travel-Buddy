import PropTypes from "prop-types";

function DefaultLayout( { children } ) {

    return ( 
    <div className="flex flex-wrap min-h-screen">
        {children}
    </div> 
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default DefaultLayout;