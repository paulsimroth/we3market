import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Rating from './Rating'

import close from '../assets/close.svg'

const Product = ({ item, provider, account, market, togglePop }) => {

  const buyHandler = async () => {
    console.log("buy");
  };

  return (
    <div className="product">
      <div className="product__details">
        <div>
          <img src={item.image} alt="Product picture"/>
        </div>

        <div className='product__overview'>
          <h1>{item.name}</h1>

          <Rating value={item.rating} />

          <hr/>

          <p>{item.address}</p>

          <h2>{ethers.utils.formatUnits(item.price.toString(), 'ether')} ETH</h2>

          <hr/>

          <h2>Overview</h2>

          <p>{item.description}</p>
        </div>

        <div className='product__order'>
          <h1>{ethers.utils.formatUnits(item.price.toString(), 'ether')} ETH</h1>
          <p>
            Free Delivery <hr/>
            <strong>
              {new Date(Date.now() +345600000).toLocaleDateString(undefined, {weekday: 'long', month: 'long', day: 'numeric'})}
            </strong>
          </p>

          {item.stock > 0 ? (
            <p>In Stock</p>
          ) : (
            <p>Out of Stock</p>
          )}

          <button className='product__buy' onClick={buyHandler}>
            Buy NOW
          </button>

          <p><small>Ships from</small> Web3 Shop</p>
          <p><small>Sold by</small> Web3 Shop</p>


        </div>
          <button onClick={togglePop} className="product__close">
            <img src={close} alt="close"/>
          </button>
      </div>
    </div >
  );
}

export default Product;