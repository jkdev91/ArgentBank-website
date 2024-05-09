
import React from 'react';

const UserNavLink = ({username}) => {
    return (
        <a className="main-nav-item" href="#">
          <i className="fa fa-user-circle"></i>
          {username}
        </a>
    );
};

export default UserNavLink