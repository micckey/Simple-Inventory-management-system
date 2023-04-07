import axios from "axios";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Swal } from "sweetalert2/dist/sweetalert2.all";

const New = () => {

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const [type, setType] = useState("")
    const [stock, setStock] = useState("")
    const [price, setPrice] = useState("")

    const changeHandler = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()
        let limit = 1024 * 1024 * 2
        if(file['size'] > limit){
            Swal.fire({
                type: 'error',
                title: 'Ooops...',
                text: 'Something went wrong',
                footer: 'Why do I have this issue? '
            })
        }
        reader.onloadend = (file) => {
            setImage(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const createProduct = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('name', name)
        formData.append('description', description)
        formData.append('image', image)
        formData.append('type', type)
        formData.append('stock', stock)
        formData.append('price', price)

        await axios.post('/api/add_product/', formData)
        .then(({data}) => {
            toast.fire({
                icon: 'success',
                title: 'Product added successfully'
            })
            navigate('/')
        })
        .catch(({response}) => {

        })
    }

    return(
        <div className="container">
            <div className="createProducts">
                <div className="titleBar">
                    <div className="titleItem">
                        <h1>Add Product</h1>
                    </div>
                    <div className="titleItem">
                        <button className="btn" onClick={(event)=>createProduct(event)}>
                            Save
                        </button>
                    </div>
                </div>
                <div className="cardWrapper">
                    <div className="left">
                        <div className="card">
                            <p>Name</p>
                            <input type="text" value={name} onChange={(event)=>{setName(event.target.value)}}/>
                            <p>Description (Optional)</p>
                            <textarea cols="10" rows="5" value={description} onChange={(event)=>{setDescription(event.target.value)}}></textarea>

                            <div className="media">
                                <ul className="imageList">
                                    <li className="imageItem">
                                        <div className="imgItem">
                                            <img src={image} alt="" width='117px' height='100px' />
                                        </div>
                                    </li>
                                    <li className="imageItem">
                                        <form  className="itemForm">
                                            <label className="formLabel">Add Image</label>
                                            <input type="file" className="formInput" onChange={changeHandler}/>
                                        </form>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="card">
                            <p>Product Type</p>
                            <input type="text" value={type} onChange={(event)=>{setType(event.target.value)}}/>
                            <hr />

                            <p>Stock</p>
                            <input type="text" value={stock} onChange={(event)=>{setStock(event.target.value)}}/>
                            <hr />

                            <p>Price</p>
                            <input type="text" value={price} onChange={(event)=>{setPrice(event.target.value)}}/>
                            <hr />

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default New