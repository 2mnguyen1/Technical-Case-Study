import React from "react";
import emptycart from "../photos/emptycart.png";
import { Button } from "flowbite-react";

function EmptyCart() {
  return (
    <div className='flex justify-center'>
      <div className='w-1/3 h-5/6'>
        <img src={emptycart} alt='empty cart' />
        <h1 className='text-center text-2xl font-bold'>Your cart is empty!</h1>
        <div className='text-center'>Add something to make me happy!!</div>
        <div className='flex justify-center'>
          <a href='/'>
            <Button className='mt-5 px-3' color='failure' size='large'>
              Continue Shopping
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default EmptyCart;
