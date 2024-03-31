import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import icon from "../photos/icon.jpeg";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function NavbarContainer({ sendDataToParent }) {
    const { getUser, logout } = useAuth();
    const [user, setUser] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        async function getCurrentUser() {
            const token = localStorage.getItem("userToken");
            const data = await getUser(token);
            setUser(data);
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
                <div className="flex justify-between w-full ">
                    <Navbar.Brand href="/">
                        <img
                            src={icon}
                            className="mr-3 h-6 sm:h-9 rounded-full"
                            alt=""
                        />
                        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                            MinhStores
                        </span>
                    </Navbar.Brand>
                    <div className="search-bar w-1/4">
                        <form className="mx-auto" onSubmit={handleFind}>
                            <div className="flex">
                                <label
                                    htmlFor="search-dropdown"
                                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                                >
                                    Your Email
                                </label>
                                <div className="relative w-full">
                                    <input
                                        type="search"
                                        id="search-dropdown"
                                        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Search..."
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full  border-4 border-teal-700 text-white bg-teal-700 focus:ring-4 focus:ring-teal-300  rounded-r-lg"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                            />
                                        </svg>
                                        <span className="sr-only">Search</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="flex md:order-2">
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar
                                    alt="User settings"
                                    img={user.image}
                                    rounded
                                />
                            }
                        >
                            <Dropdown.Header>
                                <span className="block text-sm">
                                    {user.firstName} {user.lastName}
                                </span>
                                <span className="block truncate text-sm font-medium">
                                    {user.email}
                                </span>
                            </Dropdown.Header>
                            <Dropdown.Item>Profile</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleLogout}>
                                Sign out
                            </Dropdown.Item>
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
