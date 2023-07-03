import React , {useState} from 'react'

const AddProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);

    const collectionData = async () => {

        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }
        console.log(name,price,category,company);
        let userId = JSON.parse(localStorage.getItem('user'))._id;
        console.log(userId);

        let result = await fetch("http://localhost:5000/add-product",{
            method : "post",
            body: JSON.stringify({name,price,category,company,userId}),
            headers : {
                'Content-Type':'application/json'
            }
        })
        // result = await result.json();
        // console.log(result)
    }

    return (
        <div className='register'>
            <h1>Add Product</h1>
            <input type="text" placeholder='Enter Product Name' className='InputBox' value={name} onChange={(e) => {setName(e.target.value)}}  />
            {error && !name && <span className='Invalid-input'>Invalid Name</span> }
            <input type="text" placeholder='Enter Product Price' className='InputBox' value={price} onChange={(e) => {setPrice(e.target.value)}}  />
            {error && !price && <span className='Invalid-input'>Invalid Price</span> }
            <input type="text" placeholder='Enter Product Category' className='InputBox' value={category} onChange={(e) => {setCategory(e.target.value)}}  />
            {error && !category && <span className='Invalid-input'>Invalid Category</span> }
            <input type="text" placeholder='Enter Product Company' className='InputBox' value={company} onChange={(e) => {setCompany(e.target.value)}}  />
            {error && !company && <span className='Invalid-input'>Invalid Company</span> }
            <br />
            <button type='button' onClick={collectionData} className='InputButton'>Submit</button>
        </div>
    )
}

export default AddProduct