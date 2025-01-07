import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Placeholder from "../Static/Images/placeholder.jpeg"

const ProductPage = () => {
  const { web_id } = useParams();
  const [loading, setLoading] = useState(true);
  const[notfound, setn404] = useState(false);
  const [productData, setProductData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3008/fetch-product-page?web_id=${web_id}`);
      const data = await response.json();
      if (response.ok) {
        setProductData(data.message);
        document.title = data.message[0].title;
      } else if(response.status === 404) {
        setn404(true);
        window.failure(data.message);
      }else{
        console.log("An error occured")
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [web_id]);

  return (
    <div className='product-page'>
      <div className="left-side">
          Content for left-side
      </div>
        <div className='middle'>
          {loading && (<>Loading please wait</>)}
          {notfound && (<>Product Not found</>)}
          {(!loading && !notfound) && (
              productData.map((product,index)=>(
              <div className='product-container' key={index}>
                {
                <>
                <div className="views">Viewed by {product.views}</div>
                <h3 className="product-title">{product.title}</h3>
                  <div className="image-container">
                    <img src={product.image_url[0]}/>
                  </div>
                <h3>Website description</h3>
                <p className="product-desc">{product.description}</p>
                <h3>What buyers need to know</h3>
                <p className="product-buyers-desc">{product.buyer_essentials}</p>
                <h3>Assets</h3>
                <div className="product-assets">
                  {JSON.parse(product.assets).map((asset,index)=>(
                    <div key={index} className='asset'>{asset}</div>
                  ))}
                </div>
                </>
                }
              </div>
              ))
          )}
        </div>
      <div className="right-side">
        <div className="author-info">
          {
            productData.map((author)=>(
              <>
              <img className='seller_image' height={50} width={50} src={!author.seller_image ? Placeholder : author.seller_image}/>
              <div className='seller_name'>{author.seller_name}</div>
              <div className='seller_joined_date'>{author.joined_date}</div>
              <div className='seller_email'>{author.seller_email}</div>
              </>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
