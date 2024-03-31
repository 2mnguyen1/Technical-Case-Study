import React, { useEffect, useState } from "react";
import { Carousel, Rating, Select, Button } from "flowbite-react";
import { useParams } from "react-router-dom";
import NavbarContainer from "./NavbarContainer";

function OneProduct() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const qualities = Array.from({ length: 30 }, (_, index) => index + 1);

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
        <div className="one-product-container h-screen overflow-hidden	">
            <NavbarContainer />
            <div className="w-full h-full flex">
                <div className="h-full w-1/2 p-5">
                    {!isLoading && (
                        <Carousel className="h-1/2">
                            {product.images.map((photo, index) => {
                                return (
                                    <img
                                        key={index}
                                        src={photo}
                                        alt={index}
                                        style={{
                                            objectFit: "contain",
                                        }}
                                    />
                                );
                            })}
                        </Carousel>
                    )}
                </div>
                <div className="left h-full w-1/2">
                    {!isLoading && (
                        <div>
                            <div className="info">
                                <div className="brand">
                                    Product by {product.brand}
                                </div>
                                <div className="title">{product.title}</div>
                                <div className="rating">
                                    <div className="rating-number">
                                        {product.rating}
                                    </div>
                                    <Rating>
                                        <Rating.Star />
                                        <Rating.Star />
                                        <Rating.Star />
                                        <Rating.Star />
                                        <Rating.Star filled={false} />
                                    </Rating>
                                </div>
                                <div className="price">
                                    <div>
                                        List Price:{" "}
                                        <span className="line-through">
                                            ${product.price}
                                        </span>
                                    </div>
                                    <div>
                                        Price: $
                                        {Math.floor(
                                            product.price -
                                                (product.price *
                                                    product.discountPercentage) /
                                                    100
                                        )}
                                    </div>
                                </div>
                                <div className="discription">
                                    <h2>Description</h2>
                                    <div>Category: {product.category}</div>
                                    <div>{product.description}!</div>
                                </div>
                            </div>
                            <div className="button-add-to-card flex gap-2">
                                <select className="rounded-lg" required>
                                    {qualities.map((_, index) => {
                                        return <option>Quality: {index + 1}</option>;
                                    })}
                                </select>
                                <Button>Add to card</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OneProduct;
