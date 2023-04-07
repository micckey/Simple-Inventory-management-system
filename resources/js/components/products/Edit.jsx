import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {

    const navigate = useNavigate()
    const { id } = useParams()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const [type, setType] = useState("")
    const [stock, setStock] = useState("")
    const [price, setPrice] = useState("")
    const [avatar, setAvatar] = useState(true)

    useEffect(() => {
        getProduct()
    }, [])

    const getProduct = async () => {
        await axios.get(`/api/getEditProducts/${id}`)
            .then(({ data }) => {
                // console.log('data', data)
                const { name, description, image, type, stock, price } = data.product
                setName(name)
                setDescription(description)
                setImage(image)
                setType(type)
                setStock(stock)
                setPrice(price)
            })
            .catch(({ response: { data } }) => {

            })
    }

    const ourimage = (img) => {
        return '/upload/' + img
    }

    const changeHandler = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()
        let limit = 1024 * 1024 * 2
        if (file['size'] > limit) {
            Swal.fire({
                type: 'error',
                title: 'Ooops...',
                text: 'Something went wrong',
                footer: 'Why do I have this issue? '
            })
        } else {
            let reader = new FileReader()
            reader.onload = e => {
                setAvatar(false)
                setImage(e.target.result)
            }
            reader.readAsDataURL(file)
        }

    }

    const updateProduct = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('name', name)
        formData.append('description', description)
        formData.append('image', image)
        formData.append('type', type)
        formData.append('stock', stock)
        formData.append('price', price)

        await axios.post(`/api/updateProduct/${id}`, formData)
            .then((data) => {
                toast.fire({
                    icon: 'success',
                    title: 'Product updated successfully'
                })
                navigate('/')
            })
            .catch((error) => {

            })
    }

    return (
        <div className="container">
            <div className="prodEdit">
                <div className="titleBar">
                    <div className="titleItem">
                        <h1>Edit Product</h1>
                    </div>
                    <div className="titleItem">
                        <button className="btn" onClick={(event) => updateProduct(event)}>
                            Save
                        </button>
                    </div>
                </div>
                <div className="cardWrapper">
                    <div className="left">
                        <div className="card">
                            <p>Name</p>
                            <input type="text" value={name} onChange={(event) => { setName(event.target.value) }} />
                            <p>Description (Optional)</p>
                            <textarea cols="10" rows="5" value={description} onChange={(event) => { setDescription(event.target.value) }}></textarea>

                            <div className="media">
                                <ul className="imageList">
                                    <li className="imageItem">
                                        <div className="imgItem">
                                            {avatar === true
                                                ? <img src={ourimage(image)} alt="" width='117px' height='100px' />
                                                : <img src={image} alt="" width='117px' height='100px' />
                                            }
                                        </div>
                                    </li>
                                    <li className="imageItem">
                                        <form className="itemForm">
                                            <label className="formLabel">Add Image</label>
                                            <input type="file" className="formInput" onChange={changeHandler} />
                                        </form>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="card">
                            <p>Product Type</p>
                            <input type="text" value={type} onChange={(event) => { setType(event.target.value) }} />
                            <hr />

                            <p>Stock</p>
                            <input type="text" value={stock} onChange={(event) => { setStock(event.target.value) }} />
                            <hr />

                            <p>Price</p>
                            <input type="text" value={price} onChange={(event) => { setPrice(event.target.value) }} />
                            <hr />

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Edit