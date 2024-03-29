import React, { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";
import { useParams } from "react-router-dom";
import NavbarContainer from "./NavbarContainer";

function OneProduct() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState(null);

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
        </div>
    );
}

export default OneProduct;
