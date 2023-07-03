import React , {useState , useEffect} from 'react'
import { useParams } from 'react-router-dom';

const UpdateProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    const params = useParams();
   

    const collectionData = async () => {
       console.log(name,price,category,company);

       if(!name || !price || !category || !company){
            setError(true);
            return false;
        }
    
       
        let result = await fetch(`http://localhost:5000/products/${params.id}`,{
            method : "put",
            body: JSON.stringify({name,price,category,company}),
            headers : {
                'Content-Type':'application/json'
            }
        })

        result = await result.json();
        console.warn(result);
    }


    useEffect(() => {
        getProductDetails();
    },[])

    const getProductDetails = async () =>{

        let result = await fetch(`http://localhost:5000/products/${params.id}`);
        result = await result.json();
        
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }


    return (
        <div className='register'>
            <h1>Update Product</h1>
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

export default UpdateProduct