import React, { useEffect, useState } from 'react';
import { useSession } from '../context/SessionContext';
import "../styles/Dashboard.css";
import SingleEditCard from './SingleEditCard';
import Loader from "./Loader";

const EditListing = () => {
  const { sessionData } = useSession();
  const [email, setEmailData] = useState({ seller_email: '' });
  const [selectedListing, setSelectedListing] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    if (sessionData?.email) {
      setEmailData((prevData) => ({
        ...prevData,
        seller_email: sessionData.email,
      }));
    }
  }, [sessionData]);

  const fetchData = async () => {
    if (!email.seller_email) return;
    try {
      const response = await fetch('http://localhost:3008/fetch-edit-listing', {
        method: 'POST',
        body: JSON.stringify({ sellerEmail: email.seller_email }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.status === 200 && data.message.length > 0) {
        setListings(data.message);
        if(!selectedListing){
          setSelectedListing(data.message[0]);
        }
        setNotFound(false); 
      } else {
        setListings([]);
        setSelectedListing(null);
        setNotFound(true); 
      }
    } catch (error) {
      console.error(error.message);
      setListings([]);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [email.seller_email]);

  if (loading) {
    return (
      <div style={{ width: '100%', height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader />
      </div>
    );
  }

  if (notFound) {
    return (
      <div style={{ width: '100%', height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="product-not-found">
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '10px' }}>Requested item not found</h2>
          <p style={{ marginBottom: '10px' }}>You have not listed any products for Sale!</p>
          <i style={{ fontSize: '70px' }} className="ri-search-line"></i>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-container">
      <div className="edit-card">
        {listings.map((listing) => (
            <div
              key={listing.web_id}
              onClick={() => {
                setSelectedListing(listing);
                setSelectedRow(listing.web_id);
              }}
              className={`listings ${selectedRow === listing.web_id ? 'selected' : ''}`}
            >
              <table>
                <thead>
                  <tr>
                    <th className='th-image'>Image</th>
                    <th>Website Title</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='td-image'>
                      <img src={listing.image_url} width={100} height={50} />
                    </td>
                    <td className="td-title">{listing.title}</td>
                    <td>NPR {listing.price}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))
        }
      </div>

      {selectedListing && (
        <div className="singleCard">
          <SingleEditCard data={selectedListing} function={fetchData} />
        </div>
      )}
    </div>
  );
};

export default EditListing;
