import React, { useState } from 'react';
import Head from 'next/head';
import Select from 'react-select';
import { useRouter } from 'next/router';
import axios from 'axios';

import AdminSidebar from '../../../components/AdminSidebar';
import { newVendorObject } from '../../../types';
import { newVendorInit } from '../../../data';

const statusOptions = [
  { value: 1, label: '1' },
  { value: 99, label: '99' },
];

const CreateVendor = () => {
  const [newVendor, setNewVendor] = useState<newVendorObject>(newVendorInit);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>('');

  const router = useRouter();

  const validationChecks = () => {
    setErrMsg('');
    const {
      vendorname, phone, statusid,
    } = newVendor;
    const phoneReg = /^[2][5][0][7][8/3/2/9][0-9]{7}$/;
    if (vendorname.length === 0 || vendorname.charAt(0) === ' ' || vendorname.charAt(vendorname.length - 1) === ' ') {
      setErrMsg('Invalid Vendor Name');
      return false;
    }
    if (!phone.match(phoneReg)) {
      setErrMsg('Invalid Phone Number... Ex: 250788000000, 250730000000');
      return false;
    }
    if (statusid === 0) {
      setErrMsg('Please select status id...');
      return false;
    }
    return true;
  };

  const onCreate = async () => {
    const isvalid = await validationChecks();
    if (isvalid) {
      try {
        setErrMsg('');
        setIsLoading(true);
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/vendors/new`, {
          vendorname: newVendor.vendorname,
          phone: newVendor.phone,
          statusid: newVendor.statusid,
        });
        setIsLoading(false);
        router.push('/vendors');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        const { response: { status, data: { message } } } = err;
        if (status !== 500) {
          setErrMsg(message);
        } else {
          setErrMsg('Something went wrong... Check your internet connection or contact support');
        }
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Create Vendor</title>
      </Head>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-2'>
            <AdminSidebar />
          </div>
          <div className='col-md-10 py-5'>
            <div className='text-center mb-4'>
              <h2>Create Vendor</h2>
            </div>
            <div className='d-flex flex-column'>

              <div className='d-flex flex-row justify-content-center mt-5 mb-4'>
                <div className='d-flex me-2 align-items-center'>
                  Name:
                </div>
                <div style={{
                  minWidth: '19rem',
                }}
                >
                  <input className='form-control' type='text' value={newVendor.vendorname} onChange={(e) => setNewVendor({ ...newVendor, vendorname: e.target.value })} />
                </div>
              </div>

              <div className='d-flex flex-row justify-content-center mb-4'>
                <div className='d-flex me-2 align-items-center'>
                  Status:
                </div>
                <div style={{
                  minWidth: '19rem',
                }}
                >
                  <Select
                    options={statusOptions}
                    onChange={(option) => (option ? setNewVendor({
                      ...newVendor,
                      statusid: option.value,
                    })
                      : setNewVendor(newVendor))}
                    value={(statusOptions.find((option) => option.value === newVendor.statusid))}
                  />
                </div>
              </div>
              <div className='d-flex flex-row justify-content-center mb-4'>
                <div className='d-flex me-2 align-items-center'>
                  Phone:
                </div>
                <div style={{
                  minWidth: '19rem',
                }}
                >
                  <input className='form-control' type='number' value={newVendor.phone} onChange={(e) => setNewVendor({ ...newVendor, phone: e.target.value })} />
                </div>
              </div>
              <div className='d-flex justify-content-center mt-5'>
                <button
                  type='button'
                  className='btn btn-success'
                  onClick={onCreate}
                  disabled={isLoading}
                >
                  {!isLoading && <span>Create Vendor</span>}
                  {isLoading && (
                  <span className='indicator-progress' style={{ display: 'block' }}>
                    Creating...
                    <span className='spinner-border spinner-border-sm align-middle ms-2' />
                  </span>
                  )}
                </button>
              </div>
              {errMsg !== '' && (
                <div className='text-danger d-flex justify-content-center mt-4 fw-bold'>
                    {errMsg}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateVendor;
