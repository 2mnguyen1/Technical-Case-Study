import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CardItem from "../../components/CardItem";
import { Sidebar } from "flowbite-react";
import Category from "../../components/Category";

function Home() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");
    const [allCards, setAllCards] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        if (!currentUser && !token) {
            navigate("login");
        }
    }, [currentUser]);

    useEffect(() => {
        async function getAllCards() {
            try {
                const res = await fetch("https://dummyjson.com/products");
                const data = await res.json();
                setAllCards(data.products);
            } catch (e) {
                console.log(e);
            }
        }
        getAllCards();

        async function getAllProducts() {
            try {
                const res = await fetch(
                    "https://dummyjson.com/products/categories"
                );
                const data = await res.json();
                setAllProducts(data);
            } catch (e) {
                console.log(e);
            }
        }

        getAllProducts();
    }, []);

    async function handleOnClickForCategory(category) {
        console.log(category);
        try {
            const res = await fetch(
                "https://dummyjson.com/products/category/" + category
            );
            const data = await res.json();
            setAllCards(data.products);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="w-full">
            <div className="cards-wrapper w-full flex">
                <div className="left-bar w-1/6 h-fit">
                    <Sidebar>
                        <Sidebar.ItemGroup>
                            {allProducts.map((name, index) => {
                                return (
                                    <Category
                                        key={index}
                                        name={name}
                                        handleOnClickForCategory={
                                            handleOnClickForCategory
                                        }
                                    />
                                );
                            })}
                        </Sidebar.ItemGroup>
                    </Sidebar>
                </div>
                <div className="right-bar w-5/6 gap-3 grid grid-cols-3 place-content-center p-5">
                    {allCards.map((item, index) => {
                        return (
                            <div>
                                <CardItem key={index} item={item} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Home;
