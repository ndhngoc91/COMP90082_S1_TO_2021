import React, {useState} from 'react'
import {FaSignOutAlt} from 'react-icons/fa';
import axios from 'axios';
import {withRouter, Redirect, useHistory} from 'react-router-dom'

const Logout = ({className, children}) => {
    const history = useHistory();

    const _handleClick = (e) => {
        e.preventDefault();
        axios({
            method: 'get',
            url: 'api/logout',
        }).then((response) => {
            console.log(response);
            sessionStorage.removeItem('user')
            history.push("/user-login");
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <div>
            <button type="button"
                    onClick={_handleClick}
                    className={className}>
                {children}
                <FaSignOutAlt/>

            </button>
        </div>
    );
};

export default Logout;
