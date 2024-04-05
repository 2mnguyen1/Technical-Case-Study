import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import ItemInCard from "../../components/ItemInCard";
import NavbarContainer from "../../components/NavbarContainer";
import { useParams } from "react-router-dom";
import EmptyCart from "../../components/EmptyCart";

function UserCard() {
  const { getUser } = useAuth();
  const [userCard, setUserCard] = useState(null);
  const { id, qty } = useParams();

  useEffect(() => {
    async function getCurrentUserCard() {
      const token = localStorage.getItem("userToken");
      const user = await getUser(token);
      const res = await fetch("https://dummyjson.com/carts/user/" + user.id);
      const data = await res.json();
      if (data.carts.length === 0) {
        const addCartRes = await fetch("https://dummyjson.com/carts/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: 1,
            products: [
              {
                id: id,
                quantity: qty,
              },
            ],
          }),
        });
        const newCart = await addCartRes.json();
        setUserCard(newCart);
      } else if (id === "n") {
        setUserCard(data.carts[0]);
      } else {
        getCurrentUserUpdata(data.carts[0].id);
      }
    }
    getCurrentUserCard();
    async function getCurrentUserUpdata(userCardId) {
      const res = await fetch("https://dummyjson.com/carts/" + userCardId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merge: true,
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

  async function handleChangeQuality(itemId, quantity) {
    for (let i = 0; i < userCard.products.length; i++) {
      if (userCard.products[i].id === itemId) {
        // update total quantity
        userCard.totalQuantity +=
          parseInt(quantity) - userCard.products[i].quantity;
        // update total
        userCard.total +=
          (parseInt(quantity) - userCard.products[i].quantity) *
          userCard.products[i].price;
        // update discounted total
        userCard.discountedTotal += parseInt(
          (parseInt(quantity) - userCard.products[i].quantity) *
            userCard.products[i].price -
            ((parseInt(quantity) - userCard.products[i].quantity) *
              userCard.products[i].price *
              userCard.products[i].discountPercentage) /
              100
        );
        // update product quantity
        userCard.products[i].quantity = quantity;
        // update item total price
        userCard.products[i].total =
          userCard.products[i].quantity * userCard.products[i].price;
        // update item discounted total price
        userCard.products[i].discountedTotal = parseInt(
          userCard.products[i].total -
            (userCard.products[i].total *
              userCard.products[i].discountPercentage) /
              100
        );

        setUserCard({ ...userCard });
        return;
      }
    }
  }
  console.log(userCard);
  async function handleDelete(itemId) {
    userCard.products = userCard.products.filter((item) => {
      if (item.id === itemId) {
        userCard.discountedTotal -= item.discountedPrice;
        userCard.total -= item.total;
        userCard.totalProducts -= 1;
        userCard.totalQuantity -= item.quantity;
      }
      return item.id !== itemId;
    });
    setUserCard({ ...userCard });
  }
  return (
    <div>
      {userCard && <NavbarContainer numOfItems={userCard.products.length} />}
      {userCard && (
        <>
          <div className='cart-wrapper w-full h-full p-10 flex justify-center'>
            <div className='w-2/3'>
              {userCard.products && (
                <div className='w-full'>
                  {userCard.products.map((item, index) => (
                    <ItemInCard
                      key={index}
                      item={item}
                      handleChangeQuality={handleChangeQuality}
                      handleDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </div>
            {userCard.products.length !== 0 && (
              <div className='summary w-1/7 bg-gray-100 ml-2 flex flex-col p-5 h-fit rounded-lg'>
                <div>
                  Subtotal ({userCard.totalProducts} items):{" "}
                  <span className='font-bold'>${userCard.discountedTotal}</span>
                </div>
                <button className='text-sm bg-yellow-300 rounded px-2 py-1'>
                  Proceed to checkout
                </button>
              </div>
            )}
          </div>
        </>
      )}
      {userCard && userCard.products.length === 0 && <EmptyCart />}
    </div>
  );
}

export default UserCard;
