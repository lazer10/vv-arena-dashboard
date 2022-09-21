import React from 'react';
import { faShop, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBill1 } from '@fortawesome/free-regular-svg-icons';
import SidebarItem from './SidebarItem';

// eslint-disable-next-line arrow-body-style
const AdminSidebar = () => {
  return (
    <div className='col-md-2 d-none d-md-block sidebar'>
      <div className='sidebar-sticky'>
        <div className='sidebar-img text-center mt-5'>
          <div>
            <img src='../vvlogo.png' alt='Logo' width='150' height='150' />
          </div>
        </div>
        <ul className='nav flex-column dash-nav'>
          <li className='nav-item'>
            <SidebarItem icon={faHome} title='Dashboard' to='/admin' />
            <SidebarItem icon={faUser} title='Create Vendor' to='/vendors/new' />
            <SidebarItem icon={faShop} title='All Vendors' to='/vendors' />
            <SidebarItem icon={faMoneyBill1} title='Sales' to='/sales' />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
