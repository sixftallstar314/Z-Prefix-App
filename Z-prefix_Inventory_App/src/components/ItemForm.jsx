import React, { useState } from 'react'

const ItemForm = () => {
    const [name, setName] = useState ('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [items, setItems] = useState([]);

    const addItem = (event) => {
        event.preventDefault ();

        fetch('http://localhost:3000/items', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({ name: name, description: description, quantity: quantity}),
        })
        .then ((response) => {
            if(!response.ok){
                return Promise.reject('failed to add item')
            }
            return response.json();
            })
        .then ((newItem) => {
            const updatedItems = items.slice();
            updatedItems.push(newItems);
            setItems(updatedItems);
            setName('');
            setDescription('');
            setQuantity('')
        });
    };


return ( 
    <form onSubmit= {addItem}>
        <h2>Add an Item</h2>
        <input
        type = "text"
        placeholder = "name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        />
        <input 
        placeholder="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        />
        <input
        placeholder="Qusntity"
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
        />
        <button type="submit"> Add Item </button>
    </form>
);
};

export default ItemForm;
