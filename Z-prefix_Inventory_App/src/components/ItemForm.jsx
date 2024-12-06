import React, { useState, useEffect } from 'react'

//define state for name description and quantity
const ItemForm = ({setItems}) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        quantity:''
    });
// function to handle changes 
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        const newFormData = Object.assign({}, formData);
        newFormData[name] = value;
        setFormData(newFormData);
    };

    const submitAction = (event) => {
        event.preventDefault();
        
    //POST request to add new item 
    fetch('http://localhost:3001/items', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            //convert state variables to JSON string 
            body: JSON.stringify(formData),
        })
        .then (response => response.json())
        .then ((newItem) => {
            setItems((previousItems)=> {
                const updatedItems = previousItems.slice();
                updatedItems.push(newItem);
                return updatedItems
            });

            //clears form data
            setFormData({
                name:'',
                description:'',
                quantity:''
            })
        })
    };

return ( 
    <form onSubmit= {submitAction}>
        <h2>Add New Item</h2>
        <input
        type = "text"
        name = 'name'
        placeholder= 'name'
        value={formData.name}
        onChange={handleChange}
        />
        <input 
        type = "text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        />
        <input
        type = "number"
        name= 'quantity'
        placeholder="Quantity"
        value={formData.quantity}
        onChange={handleChange}
        />
        <button type="submit"> Add Item </button>
    </form>
    );
};

export default ItemForm;
