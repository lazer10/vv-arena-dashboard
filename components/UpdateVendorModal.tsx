import axios from 'axios';
import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import Select from 'react-select';
import Modal from 'react-bootstrap/Modal';

import { vendorType } from '../types';

type updateVendorModalProps = {
    selectedVendor: vendorType
    setSelectedVendor: Dispatch<SetStateAction<vendorType>>
    fetchVendors: () => void
    openModal: boolean
    setOpenModal: Dispatch<SetStateAction<boolean>>
}

const statusOptions = [
  { value: '1', label: '1' },
  { value: '99', label: '99' },
];

const UpdateVendorModal = ({
  selectedVendor,
  setSelectedVendor,
  fetchVendors,
  openModal,
  setOpenModal,
}: updateVendorModalProps) => {
  const [nameFieldError, setNameFieldError] = useState<string>('');
  const [phoneFieldError, setPhoneFieldError] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    const { phone, vendorname } = selectedVendor;
    const phoneReg = /^[2][5][0][7][8/3/2/9][0-9]{7}$/;
    if (vendorname.length === 0 || vendorname.charAt(0) === ' ' || vendorname.charAt(vendorname.length - 1) === ' ') {
      setNameFieldError('Invalid Vendor Name');
    } else {
      setNameFieldError('');
    }
    if (!phone.match(phoneReg)) {
      setPhoneFieldError('Invalid phone number... Ex: 250788000000, 250730000000');
    } else {
      setPhoneFieldError('');
    }
  }, [selectedVendor]);

  const onSave = async () => {
    try {
      setIsUpdating(true);
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/vendors/${selectedVendor.vendorid}/update`,
        {
          phone: selectedVendor.phone,
          vendorname: selectedVendor.vendorname,
          statusid: selectedVendor.statusid,
          sales: selectedVendor.sales,
        },
      );
      await fetchVendors();
      setIsUpdating(false);
      setOpenModal(false);
    } catch (err) {
      setIsUpdating(false);
      setOpenModal(false);
    }
  };
  return (
    <Modal show={openModal} onHide={() => setOpenModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Update Vendor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className='mb-2'>
            <div>
              <h6>Vendor Name</h6>
            </div>
            <div>
              <input
                type='text'
                className='form-control'
                value={selectedVendor.vendorname}
                onChange={(e) => setSelectedVendor(
                  {
                    ...selectedVendor,
                    vendorname: e.target.value,
                  },
                )}
              />
            </div>
            {nameFieldError !== '' && (
            <div className='text-danger'>{nameFieldError}</div>
            )}
          </div>
          <div className='mb-2'>
            <div>
              <h6>Phone</h6>
            </div>
            <div>
              <input
                type='number'
                className='form-control'
                value={selectedVendor.phone}
                onChange={(e) => setSelectedVendor(
                  {
                    ...selectedVendor,
                    phone: e.target.value,
                  },
                )}
              />
            </div>
            {phoneFieldError !== '' && (
            <div className='text-danger'>{phoneFieldError}</div>
            )}
          </div>
          <div className='mb-2'>
            <div>
              <h6>Status</h6>
            </div>
            <div>
              <Select
                options={statusOptions}
                onChange={(option) => (option ? setSelectedVendor({
                  ...selectedVendor,
                  statusid: Number(option.value),
                })
                  : setSelectedVendor(selectedVendor))}
                value={(statusOptions.find(
                  (option) => option.value === selectedVendor.statusid.toString(),
                ))}
              />
            </div>
          </div>
          <div>
            <div>
              <h6>Sales</h6>
            </div>
            <div>
              <input
                type='number'
                className='form-control'
                value={selectedVendor.sales}
                onChange={(e) => setSelectedVendor(
                  {
                    ...selectedVendor,
                    sales: Number(e.target.value),
                  },
                )}
              />
            </div>
            {phoneFieldError !== '' && (
            <div className='text-danger'>{phoneFieldError}</div>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type='button'
          className='btn btn-success'
          disabled={nameFieldError !== '' || phoneFieldError !== ''}
          onClick={onSave}
        >
          {!isUpdating && <span>Save Changes</span>}
          {isUpdating && (
          <span className='indicator-progress' style={{ display: 'block' }}>
            Updating...
            <span className='spinner-border spinner-border-sm align-middle ms-2' />
          </span>
          )}
        </button>
        <button
          type='button'
          className='btn btn-secondary'
          onClick={() => setOpenModal(false)}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateVendorModal;
