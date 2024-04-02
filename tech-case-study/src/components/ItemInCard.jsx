import React from "react";
import { useNavigate } from "react-router-dom";

function ItemInCard({ item }) {
  const navigate = useNavigate();
  const qualities = Array.from({ length: 10 }, (_, index) => index + 1);
  function handleOnClick() {
    return navigate("/products/" + item.id);
  }
  return (
    <div className='cart-item w-full flex p-5 gap-5 bg-gray-100 mb-2 rounded-lg'>
      <div
        className='item-photo w-40 h-40 hover:cursor-pointer'
        onClick={handleOnClick}
      >
        <img src={item.thumbnail} alt='' className='rounded-lg' />
      </div>

      <div className='item-info'>
        <div className='flex flex-col justify-between h-full relative'>
          <div className='price absolute top-6'>
            Price: $
            <span className='font-bold'>
              {Math.floor(
                item.price - (item.price * item.discountPercentage) / 100
              )}
            </span>
          </div>
          <div
            className='title text-lg font-semibold relative hover:cursor-pointer'
            onClick={handleOnClick}
          >
            {item.title}
          </div>
          <span className='available text-green-500 text-sm absolute top-11'>
            In Stock
          </span>
          <div className='action'>
            <select
              className='rounded-lg h-9 text-sm'
              defaultValue={item.quantity}
              required
            >
              {qualities.map((_, index) => {
                return (
                  <option selected={item.quantity === index + 1 ? true : false}>
                    {index + 1}
                  </option>
                );
              })}
            </select>
            <a
              href='#'
              className='ml-5 border-x px-2 border-cyan-700 text-cyan-700 text-sm'
            >
              Delete
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemInCard;
