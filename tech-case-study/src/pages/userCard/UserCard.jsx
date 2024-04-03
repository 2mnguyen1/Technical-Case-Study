import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import ItemInCard from "../../components/ItemInCard";
import NavbarContainer from "../../components/NavbarContainer";
import { useParams } from "react-router-dom";
function UserCard() {
  const { getUser } = useAuth();
  const [userCard, setUserCard] = useState({});
  const { id, qty } = useParams();

  useEffect(() => {
    async function getCurrentUserCard() {
      const token = localStorage.getItem("userToken");
      const user = await getUser(token);
      const res = await fetch("https://dummyjson.com/carts/user/" + user.id);
      const data = await res.json();
      if (id === "n") {
        setUserCard(data.carts[0]);
      } else {
        getCurrentUserUpdata(data.carts[0].id);
      }
    }
    getCurrentUserCard();
    async function getCurrentUserUpdata(userCardId) {
      const res = await fetch("https://dummyjson.com/carts/" + userCardId, {
        method: "PUT" /* or PATCH */,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merge: true, // this will include existing products in the cart
          products: [
            {
              id: id,
              quantity: qty,
            },
          ],
        }),
      });
      const data = await res.json();
      setUserCard(data);
    }
  }, []);
  return (
    <div>
      <NavbarContainer />
      <div className='cart-wrapper w-full h-full p-10 flex justify-center'>
        <div className='w-2/3'>
          {userCard.products && (
            <div className='w-full'>
              {userCard.products.map((item, index) => (
                <ItemInCard key={index} item={item} />
              ))}
            </div>
          )}
        </div>
        <div className='summary w-1/7 bg-gray-100 ml-2 flex flex-col p-5 h-fit rounded-lg'>
          <div>
            Subtotal ({userCard.totalProducts} items):{" "}
            <span className='font-bold'>${userCard.discountedTotal}</span>
          </div>
          <button className='text-sm bg-yellow-300 rounded-lg px-2 py-1'>
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
