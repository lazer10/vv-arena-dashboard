import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import Head from 'next/head';
import AdminSidebar from '../../components/AdminSidebar';
import { vendorType } from '../../types';
import UpdateVendorModal from '../../components/UpdateVendorModal';
import { vendorInit } from '../../data';

const Vendors = () => {
  const [vendors, setVendors] = useState<vendorType[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<vendorType>(vendorInit);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const fetchVendors = async () => {
    try {
      setIsFetching(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/vendors`);
      setVendors(response.data.data);
      setIsFetching(false);
    } catch (err) {
      setVendors([]);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const onUpdate = (v: vendorType) => {
    setSelectedVendor(v);
    setOpenModal(true);
  };

  return (
    <>
      <Head>
        <title>Vendors</title>
      </Head>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-2'>
            <AdminSidebar />
          </div>
          <div className='col-md-10 py-5'>
            <div className='text-center mb-4'>
              <h2>All Vendors</h2>
            </div>
            <table className='table table-bordered table-striped'>
              <thead className='thead-dark'>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Vendor Name</th>
                  <th scope='col'>Sales</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Phone</th>
                  <th scope='col'>Edit</th>
                </tr>
              </thead>
              <tbody>
                {!isFetching && vendors.map((v) => (
                  <tr key={nanoid()}>
                    <th scope='row'>{v.vendorid}</th>
                    <td>{v.vendorname}</td>
                    <td>{v.sales}</td>
                    <td>{v.statusid}</td>
                    <td>{v.phone}</td>
                    <td style={{
                      paddingTop: '0.3rem',
                    }}
                    >
                      <button
                        type='button'
                        className='btn btn-success'
                        onClick={() => onUpdate(v)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {isFetching && (
            <span className='d-flex justify-content-center indicator-progress' style={{ display: 'block' }}>
              <span className='spinner-border spinner-border-sm align-middle ms-2' />
            </span>
            )}
          </div>
          <UpdateVendorModal
            selectedVendor={selectedVendor}
            setSelectedVendor={setSelectedVendor}
            fetchVendors={fetchVendors}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        </div>
      </div>
    </>
  );
};

export default Vendors;
