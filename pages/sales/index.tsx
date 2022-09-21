import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import Head from 'next/head';

import AdminSidebar from '../../components/AdminSidebar';
import { salesTransactionType, vendorType } from '../../types';

import 'react-datepicker/dist/react-datepicker.css';
import { proceedDownloadExcel } from '../../helpers/generateExcel';

type valueLabel = {
  value: string
  label: string
}

const Sales = () => {
  const [selectOptions, setSelectOptions] = useState<valueLabel[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<string>('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isFileGenerated, setIsFileGenerated] = useState<boolean>(false);
  const [isFileDownloaded, setIsFileDownloaded] = useState<boolean>(false);
  const [excelContents, setExcelContents] = useState<salesTransactionType[]>([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/vendors`);
        const vendors: vendorType[] = response.data.data;
        const optionsArr: valueLabel[] = [];
        // eslint-disable-next-line array-callback-return
        await vendors.map((v) => {
          const vnd: valueLabel = {
            label: v.vendorname,
            value: v.vendorid.toString(),
          };
          optionsArr.push(vnd);
          setSelectOptions(optionsArr);
        });
      } catch (err) {
        setSelectOptions([]);
      }
    };
    fetchVendors();
  }, []);

  const onGenerateExcel = async () => {
    try {
      setIsGenerating(true);
      setIsFileGenerated(false);
      setIsFileDownloaded(false);
      const { data: { data } } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/sales`, {
        vendor: selectedVendor,
        startDate,
        endDate,
      });
      setExcelContents(data);
      setIsFileGenerated(true);
      setIsGenerating(false);
    } catch (err) {
      setExcelContents([]);
      setIsGenerating(false);
    }
  };

  const onDownloadExcel = async () => {
    try {
      await proceedDownloadExcel(excelContents);
      setIsFileDownloaded(true);
    } catch (err) {
      setIsFileDownloaded(true);
    }
  };

  return (
    <>
      <Head>
        <title>Sales</title>
      </Head>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-2'>
            <AdminSidebar />
          </div>
          <div className='col-md-10 py-5'>
            <div className='text-center mb-4'>
              <h2>Sales Transactions</h2>
            </div>
            <div className='d-flex flex-column'>

              <div className='d-flex flex-row justify-content-center mt-5'>
                <div className='d-flex me-2 align-items-center'>
                  Vendor:
                </div>
                <div style={{
                  minWidth: '19rem',
                }}
                >
                  <Select
                    options={selectOptions}
                    onChange={(option) => (option ? setSelectedVendor(option.value) : setSelectedVendor(''))}
                    value={(selectOptions.find((option) => option.value === selectedVendor))}
                  />
                </div>
              </div>
              <div className='d-flex flex-row justify-content-center vv-date-picker-wrapper'>
                <div className='d-flex me-2 align-items-center me-0'>
                  Start date:
                </div>
                <div className='vv-date-picker'>
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    maxDate={endDate}
                  />
                </div>
              </div>
              <div className='d-flex flex-row justify-content-center vv-date-picker-wrapper'>
                <div className='d-flex me-2 align-items-center me-0'>
                  End date:
                </div>
                <div className='vv-date-picker'>
                  <DatePicker
                    selected={endDate}
                    onChange={(date: Date) => setEndDate(date)}
                    minDate={startDate}
                    maxDate={new Date()}
                  />
                </div>
              </div>
              <div className='d-flex justify-content-center mt-5'>
                <button
                  type='button'
                  className='btn btn-dark me-2'
                  onClick={onGenerateExcel}
                  disabled={isGenerating}
                >
                  {!isGenerating && <span>Generate Excel</span>}
                  {isGenerating && (
                  <span className='indicator-progress' style={{ display: 'block' }}>
                    Generating...
                    <span className='spinner-border spinner-border-sm align-middle ms-2' />
                  </span>
                  )}
                </button>
                <button
                  type='button'
                  className='btn btn-success'
                  onClick={onDownloadExcel}
                  disabled={!isFileGenerated || isFileDownloaded}
                >
                  Download Excel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Sales;
