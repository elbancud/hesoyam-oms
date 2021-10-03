import React from 'react'
import { Route , Redirect} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCookies } from 'react-cookie';

export default function PrivateRoute({ component: Component, ...rest }) {
    const [cookies] = useCookies(['user'])
    const { currentUser } = useAuth();
    return (
           <Route
                {...rest}
                render={props => {
                    return cookies.User || currentUser? <Component {...props} /> : <Redirect to="/login" />
                }}
    ></Route>
    )
}
