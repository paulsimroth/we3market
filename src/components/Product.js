import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// Components
import Rating from './Rating';

import close from '../assets/close.svg';

const Product = ({ item, provider, account, instance, togglePop }) => {

  const [order, setOrder] = useState(null);
  const [purchase, setPurchase] = useState(false);

  const fetchDetails = async () => {
    instance.on("Buy", async (from, orderID, itemID) => {
      let events = {
        buyer: from,
        orderId: orderID,
        itemId: itemID,
      }
      console.log(events);
/*       const orders = events.filter(
        (event) => event.buyer == account && event.itemId.toString() == item.id.toString()
      );
      console.log("orders: ", orders);

      if (orders.length === 0) return;

      const order = await instance.orders(account, orders[0].args.orderId);
      setOrder(order); */
    });
  };

  const buyHandler = async () => {
    const signer = await provider.getSigner();

    let tx = await instance.connect(signer).buy(item.id, {value: item.price});
    await tx.wait();

    setPurchase(true);
  };

  useEffect(() => {
    fetchDetails()
  }, [purchase]);

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

          <p>
            {item.description}
          </p>
        </div>

        <div className='product__order'>
          <h1>{ethers.utils.formatUnits(item.price.toString(), 'ether')} ETH</h1>
          <p>
            Free Delivery <br/>
            <strong>
              {new Date(Date.now() +345600000).toLocaleDateString(undefined, {weekday: 'long', month: 'long', day: 'numeric'})}
            </strong>
          </p>

          {item.stock > 0 ? (
            <p><strong>In Stock</strong></p>
          ) : (
            <p className='red_msg'><strong>Out of Stock</strong></p>
          )}

          <button className='product__buy' onClick={buyHandler}>
            Buy NOW
          </button>

          <p><small>Ships from</small> Web3 Shop Warehouse</p>
          <p><small>Sold by</small> Web3 Shop</p>
          
          {order && (
            <div className='product__bought'>
              Item bought on <br/>
              <strong>
                {new Date(Number(order.time.toString() + "000")).toLocaleDateString(
                  undefined, {
                    weekday: 'long',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                  })}
              </strong>
            </div>
          )}

        </div>

        <button onClick={togglePop} className="product__close">
          <img src={close} alt="Close"/>
        </button>

      </div>
    </div >
  );
}

export default Product;