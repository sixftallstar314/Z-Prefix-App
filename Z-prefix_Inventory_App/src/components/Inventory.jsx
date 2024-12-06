import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";

const Inventory = () => {
    const [items, setItems] =useState([]);
    const [editMode, setEditMode] = useState(null);
    const [editedItem, setEditedItem]= useState({});

//Fetch items from server
useEffect(() => {
    const getItems = () => {
    fetch ('http://localhost:3001/items')
        .then((response) => response.json())
        .then((itemsFromServer) => {
            setItems(itemsFromServer);
        })
    };
getItems();
},[]);

//delete an item
const deleteItem = (id) => {
    fetch (`http://localhost:3001/items/${id}`, { method: 'DELETE'})
    .then(() => {
setItems (items.filter((item) => item.id !== id));
    })
};

//logout feature
const logOut = () => {
    localStorage.removeItem ('token')
    window.location.reload();
}

//edit mode to edit entries
const toggleEditMode = (item) => {
    setEditMode(item.id);
    setEditedItem({
        name: item.name,
        description: item.description,
        quantity: item.quantity
    });
};

// handling input changes whie editing 
const handleEdits = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setEditedItem((previousEditedItem) => ({
        ...previousEditedItem,
        [fieldName]: fieldValue
    }));
};

// function for updating an items
const updateItem = (id) => {
    fetch(`http://localhost:3001/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedItem),
    })
    .then(response => response.json())
    .then(updatedItem => {
        setItems(items.map(item => (item.id === id ? updatedItem : item)));
        setEditMode(null);
        setEditedItem({});
    });
};

//rendering
return (
    <div>
        <h1>Inventory Manager Made Easy </h1>
        <ItemForm setItems={setItems} />
        <button onClick={logOut}> Log Out </button>
        <ol>
            <h2>Current Inventory </h2>
            {items.map((item) => (
                    <li key={item.id}>
                        {editMode === item.id ? (
                        <>
                        <input
                            type="text"
                            name="name"
                            value={editedItem.name}
                            onChange={handleEdits}
                        />
                        <textarea
                            name="description"
                            value={editedItem.description}
                            onChange={handleEdits}
                        />
                        <input
                            type="number"
                            name="quantity"
                            value={editedItem.quantity}
                            onChange={handleEdits}
                        />
                        <button onClick={() => updateItem(item.id)}>Save</button>
                        <button onClick={() => setEditMode(null)}>Cancel</button>
                    </>
                ) : (
                    <>
                        <div>Name: {item.name}</div>
                        <div>Description: {item.description}</div>
                        <div>Quantity: {item.quantity}</div>
                        <button onClick={() => toggleEditMode(item)}>Edit</button>
                        <button onClick={() => deleteItem(item.id)}>Delete</button>
                    </>
                )}
            </li>
        ))}
    </ol>
</div>
);
};

export default Inventory;