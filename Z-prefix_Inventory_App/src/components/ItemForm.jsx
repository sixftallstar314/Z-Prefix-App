import React, { useState, useEffect } from 'react'

const ItemForm = ({setItems}) => {
    const [name, setName] = useState ('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const newItem ={ name, description, quantity};
    
    fetch('http://localhost:3001/items', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({ name: name, description: description, quantity: quantity}),
        })
        .then (response => response.json())
        .then (item => setItems (prevItems => [...prevItems, item]))
};

return ( 
    <form onSubmit= {handleSubmit}>
        <input
        type = "text"
        placeholder = "name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        />
        <input 
        type = "text"
        placeholder="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        />
        <input
        type = "number"
        placeholder="Quantity"
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
        />
        <button type="submit"> Add Item </button>
    </form>
    );
};

export default ItemForm;
