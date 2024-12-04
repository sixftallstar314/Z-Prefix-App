import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";

const Inventory = () => {
    const [items, setItems] =useState([]);

useEffect(() => {
    const getItems = async () => {
    fetch ('http://localhost:3001/items')
        .then(response => response.json())
        .then(items => setItems(items));
    };
getItems();
},[]);

const deleteItem = (id) => {
    fetch (`http://localhost:3001/items/${id}`, { method: 'DELETE'})
    .then(() => {
setItems (items.filter(item => item.id !== id));
    });
};

const logOut = () => {
    localStorage.removeItem ('token')
    window.location.reload();
}

return (
    <div>
        <h1>Inventory</h1>
        <ItemForm setItems={setItems} />
        <button onClick={logOut}> Log Out </button>
        <ol>
            {items.map((item) => (
                    <li key={item.id}>
                        <div> Name: {item.name} </div>
                        <div>Description: {item.description} </div>
                        <div> Quantity: {item.quantity} </div>
                        <button onClick={() => deleteItem(item.id)}>Delete</button>
                    </li>
            ))}
        </ol>
    </div>
    );
};

export default Inventory;