import React from "react";
import { Sidebar } from "flowbite-react";

function Category({ name, handleOnClickForCategory }) {
    return (
        <Sidebar.Item
            href="#"
            className="font-semibold text-lg"
            onClick={() => handleOnClickForCategory(name)}
        >
            {name[0].toUpperCase() + name.slice(1)}
        </Sidebar.Item>
    );
}

export default Category;
