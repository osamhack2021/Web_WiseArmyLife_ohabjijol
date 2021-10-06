import React from 'react'; 
import { Route, Redirect } from 'react-router-dom'; 

const PublicRoute = ({component: Component, auth=false,restricted=false, ...rest}) => {
     return ( // restricted = false meaning public route 
        // restricted = true meaning restricted route 
        <Route {...rest} render={props => (
            auth && restricted ? 
                <Redirect to="/dashboard" /> 
                : <Component {...props} />
        )} /> 
    ); 
}; export default PublicRoute;
