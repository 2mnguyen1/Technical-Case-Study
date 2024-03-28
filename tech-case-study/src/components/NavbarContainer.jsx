import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import icon from "../photos/icon.jpeg";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function NavbarContainer() {
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

    return (
        <Navbar fluid rounded>
            {user && (
                <>
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
                </>
            )}
        </Navbar>
    );
}

export default NavbarContainer;
