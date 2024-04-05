import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import icon from "../photos/icon.jpeg";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function NavbarContainer({ sendDataToParent, numOfItems }) {
  const { getUser, logout } = useAuth();
  const [user, setUser] = useState();
  const [userCard, setUserCard] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    async function getCurrentUser() {
      const token = localStorage.getItem("userToken");
      const data = await getUser(token);
      setUser(data);

      const res = await fetch("https://dummyjson.com/carts/user/" + data.id);
      const newUserCard = await res.json();
      setUserCard(newUserCard?.carts[0]);
    }
    getCurrentUser();
  }, []);
  function handleLogout() {
    logout();
    navigate("/login");
  }

  function handleFind(e) {
    e.preventDefault();
    sendDataToParent(e.target[0].value);
  }
  return (
    <Navbar fluid rounded>
      {user && (
        <div className='flex justify-between w-full '>
          <Navbar.Brand href='/'>
            <img src={icon} className='mr-3 h-6 sm:h-9 rounded-full' alt='' />
            <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
              MinhStores
            </span>
          </Navbar.Brand>
          <div className='search-bar w-1/4'>
            <form className='mx-auto' onSubmit={handleFind}>
              <div className='flex'>
                <label
                  htmlFor='search-dropdown'
                  className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
                >
                  Your Email
                </label>
                <div className='relative w-full'>
                  <input
                    type='search'
                    id='search-dropdown'
                    className='block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Search...'
                    required
                  />
                  <button
                    type='submit'
                    className='absolute top-0 end-0 p-2.5 text-sm font-medium h-full  border-4 border-teal-700 text-white bg-teal-700 focus:ring-4 focus:ring-teal-300  rounded-r-lg'
                  >
                    <svg
                      className='w-4 h-4'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 20 20'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                      />
                    </svg>
                    <span className='sr-only'>Search</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className='flex md:order-2'>
            <svg
              onClick={() => navigate("/cart/n/0")}
              className='relative w-10 h-10 bg-gray-100 rounded-full p-2 hover:bg-gray-100 cursor-pointer mr-5 mt-1'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 64 64'
              id='cart'
            >
              <g fill='#134563'>
                <path d='M48.5 45.7H18.2c-.5 0-.9-.2-1.1-.6-.3-.4-.3-.9-.1-1.3l2.6-6.6L17 12.6H8.6V9.8h9.6c.7 0 1.3.5 1.4 1.2l2.8 26.1c0 .2 0 .4-.1.7l-2 5h28.2v2.9'></path>
                <path d='m21.3 38.8-.6-2.7 31.9-6.6V18.2h-33v-2.8H54c.8 0 1.4.6 1.4 1.4v13.8c0 .7-.5 1.2-1.1 1.3l-33 6.9M49.9 54c-3 0-5.5-2.5-5.5-5.5s2.5-5.5 5.5-5.5 5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5zm0-8.3c-1.5 0-2.8 1.2-2.8 2.8s1.2 2.8 2.8 2.8 2.8-1.2 2.8-2.8-1.3-2.8-2.8-2.8zm-33 8.3c-3 0-5.5-2.5-5.5-5.5s2.5-5.5 5.5-5.5 5.5 2.5 5.5 5.5-2.5 5.5-5.5 5.5zm0-8.3c-1.5 0-2.8 1.2-2.8 2.8s1.2 2.8 2.8 2.8 2.8-1.2 2.8-2.8-1.3-2.8-2.8-2.8z'></path>
              </g>
            </svg>
            {userCard && (
              <span
                className='text-white absolute top-2 w-4 h-4 bg-red-500 rounded-full text-sm text-center flex justify-center items-center'
                style={{ right: "70px", top: "15px" }}
              >
                {numOfItems !== undefined
                  ? numOfItems
                  : userCard.products.length}
              </span>
            )}
            {!userCard && (
              <span
                className='text-white absolute top-2 w-4 h-4 bg-red-500 rounded-full text-sm text-center flex justify-center items-center'
                style={{ right: "70px", top: "15px" }}
              >
                {numOfItems !== undefined ? numOfItems : 0}
              </span>
            )}
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar alt='User settings' img={user.image} rounded />}
            >
              <Dropdown.Header>
                <span className='block text-sm'>
                  {user.firstName} {user.lastName}
                </span>
                <span className='block truncate text-sm font-medium'>
                  {user.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse></Navbar.Collapse>
        </div>
      )}
    </Navbar>
  );
}

export default NavbarContainer;
