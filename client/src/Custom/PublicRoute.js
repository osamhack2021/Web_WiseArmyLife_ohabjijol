import React from 'react'; 
import { Route, Redirect } from 'react-router-dom'; 

<<<<<<< HEAD
const PublicRoute = ({component: Component, auth,restricted, ...rest}) => {
=======
const PublicRoute = ({component: Component, auth=false,restricted, ...rest}) => {
>>>>>>> 47f728a168de44afe346bc6f837af0cc7b5ca90a
     return ( // restricted = false meaning public route 
        // restricted = true meaning restricted route 
        <Route {...rest} render={props => (
            auth && restricted ? 
                <Redirect to="/dashboard" /> 
                : <Component {...props} />
        )} /> 
    ); 
}; export default PublicRoute;
