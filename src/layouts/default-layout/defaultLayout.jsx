import PropTypes from "prop-types";
import { Toaster } from "@/components/ui/toaster";

function DefaultLayout( { children } ) {

    return ( 
    <div className="min-h-screen">
        {children}
        <Toaster />
    </div> 
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default DefaultLayout;