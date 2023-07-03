import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

const ProductList = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    },[]);

    const getProducts = async () =>{
        let result = await fetch("http://localhost:5000/products");
        result = await result.json();
        setProducts(result.response);
    }

    const deleteProduct = async (id) =>{
        let result = await fetch(`http://localhost:5000/products/${id}`, {
            method:"delete"
        })

        result = await result.json()
        if(result)
        {
            getProducts();
        }
    }

    return (
        <div>
            <h1> Product List </h1>
            <div className="product-table">
                <table >
                    <tr>
                        <th>SL No.</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Company</th>
                        <th>Action</th>
                    </tr>
                    {
                       
                        products.map((item, index) => 
                            <tr>
                                <td>{index+1+"."}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.category}</td>
                                <td>{item.company}</td>
                                <td>
                                    <button onClick={() => deleteProduct(item._id)}>Delete</button>
                                    <Link className="updateButton" to={"/update/"+item._id}>Update</Link>
                                </td>
                            </tr>
                        )
                    }
                </table>
            </div>
        </div>
    )
}

export default ProductList;