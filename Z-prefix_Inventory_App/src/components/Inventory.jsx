import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";

const Inventory = () => {
    const [items, setItems] =useState([]);

useEffect(() => {
    const getItems = async () => {
    fetch ('http://localhost:3000/items')
        .then(response => response.json())
        .then(items => SetItems(items));
    };
getItems();
},[]);

const deleteItem = function(id) {
    fetch (`http://localhost:3000/items/${id}`, { method: 'DELETE'})
    .then(() => {
setItems (items.filter(item => item.id !== id));
    return items.id !== id;
        });
    };

return (
    <div>
        <h1>Inventory</h1>
        <ItemForm setItems={setItems} />
        <ul>
            {items.map((item) => {
                return(
                    <li key={item.id}>
                        {item.name} - {item.description.substring(0, 100)}...{''}
                        <button onCLick={function () {deletetItem(item.id)}}>Delete</button>
                    </li>
                )
            })}
        </ul>
    </div>
);
};

export default Inventory;