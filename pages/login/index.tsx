/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Head from 'next/head';

const Login = () => (
  <>
    <Head>
      <title>Login</title>
    </Head>
    <section
      className='vh-100'
    >
      <div className='container py-5 h-100'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
            <div
              className='card shadow-2-strong'
              style={{
                borderRadius: '1rem',
                boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
              }}
            >
              <div className='d-flex justify-content-center pt-5'>
                <img
                  src='vvlogo.png'
                  alt=''
                  style={{
                    height: '100px',
                  }}
                />
              </div>
              <div className='card-body p-5 pt-0 text-center'>

                <h3 className='mb-5'>Login</h3>
                <div className='form-outline mb-4'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Username...'
                    autoComplete='new-username'
                    aria-autocomplete='none'
                  />
                </div>

                <div className='form-outline mb-4'>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='Password...'
                    autoComplete='new-password'
                    aria-autocomplete='none'
                  />
                </div>

                <button className='btn btn-success' type='submit'>Login</button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </>
);

export default Login;
