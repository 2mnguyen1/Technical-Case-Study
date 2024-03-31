import React from "react";
import warningPhoto from "../photos/warning.png";
import { Alert } from "flowbite-react";
import { redirect } from "react-router-dom";

function ItemsNotFound() {
    function handleDismissed() {
        redirect("/");
        window.location.reload();
    }
    return (
        <div className="w-1/2">
            <img src={warningPhoto} alt="warning" />
            <Alert color="warning" onDismiss={handleDismissed}>
                <span className="font-medium">Info alert!</span> Item does not
                exist
            </Alert>
        </div>
    );
}

export default ItemsNotFound;
