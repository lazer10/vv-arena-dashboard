import React from 'react';
import Head from 'next/head';
import AdminSidebar from '../../components/AdminSidebar';

const index = () => (
  <>
    <Head>
      <title>Dashboard</title>
    </Head>
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminSidebar />
        </div>
        <div className='d-flex flex-column col-md-10'>
          <div className='d-flex justify-content-center align-content-center mt-5 mb-4'>
            <h1>Welcome Admin</h1>
          </div>
          <div className='text-center'>
            <h4>This is your dashboard</h4>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default index;
