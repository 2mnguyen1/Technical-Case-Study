import React, { useEffect, useState } from "react";
import { Carousel, Rating, Select, Button } from "flowbite-react";
import { useParams } from "react-router-dom";
import NavbarContainer from "./NavbarContainer";

function OneProduct() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [qtyValue, setQtyValue] = useState(1);
  const qualities = Array.from({ length: 10 }, (_, index) => index + 1);

  useEffect(() => {
    async function getProduct() {
      const res = await fetch("https://dummyjson.com/products/" + id);
      const data = await res.json();
      setIsLoading(false);
      setProduct(data);
    }
    getProduct();
  }, []);
  return (
    <div className='one-product-container h-screen overflow-hidden'>
      <NavbarContainer />
      <div className='w-full h-full flex '>
        <div className='h-1/2 w-1/2 p-5 bg-gray-100 rounded-xl'>
          {!isLoading && (
            <Carousel className=''>
              {product.images.map((photo, index) => {
                return (
                  <img
                    key={index}
                    src={photo}
                    alt={index}
                    className='object-contain w-full h-full'
                  />
                );
              })}
            </Carousel>
          )}
        </div>
        <div className='left h-full w-1/2 flex flex-col px-5'>
          {!isLoading && (
            <div className='flex flex-col justify-between w-full h-1/2'>
              <div className='info'>
                <div className='brand font-extrabold'>
                  Product by {product.brand}
                </div>
                <div className='title font-semibold text-3xl'>
                  {product.title}
                </div>
                <div className='rating'>
                  <Rating>
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star />
                    <Rating.Star filled={false} />{" "}
                    <span className='ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800'>
                      {product.rating}
                    </span>
                  </Rating>
                </div>
                <div className='price mt-5'>
                  <div className='bg-green-100 w-fit px-2 rounded font-semibold mb-2'>
                    Price: $
                    {Math.floor(
                      product.price -
                        (product.price * product.discountPercentage) / 100
                    )}
                  </div>
                  <div className='bg-red-100 w-fit px-2 font-semibold rounded text-sm'>
                    List Price:{" "}
                    <span className='line-through'>${product.price}</span>
                  </div>
                </div>
                <div className='discription mt-5'>
                  <h2 className='font-bold text-lg'>Description</h2>
                  <div className='font-semibold'>
                    Category: {product.category}
                  </div>
                  <div>{product.description}!</div>
                </div>
              </div>
              <div className='button-add-to-card flex gap-2'>
                <select
                  className='rounded-lg'
                  onChange={(e) => setQtyValue(e.target.value)}
                  required
                >
                  {qualities.map((_, index) => {
                    return <option>{index + 1}</option>;
                  })}
                </select>
                <a
                  href={"/cart/" + id + "/" + qtyValue}
                  className='h-full rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800'
                >
                  Add to cart
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OneProduct;
