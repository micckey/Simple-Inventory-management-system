import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Index = () => {

    const navigate = useNavigate()
    const newproduct = () => {
        navigate('/product/new')
    }

    const [products, setproducts] = useState([])

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        await axios.get('/api/getAllProducts')
            .then(({ data }) => {                
                setproducts(data.products)
            })
    }

    const editProduct = (id) => {
        navigate('/product/edit/' + id)
    }

    const deleteProduct = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete it!'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axios.get('/api/deleteProduct/' + id)
                        .then(() => {
                            Swal.fire(
                                'Deleted!',
                                'Product deleted successfully.',
                                'success'
                            )
                            getProducts()
                        })
                        .catch(() => {

                        })
                }
            })
    }


    return (
        <div className="container">
            <div className="productList">
                <div className="titleBar">
                    <div className="titleItem">
                        <h1>Products</h1>
                    </div>
                    <div className="titleItem">
                        <div className="btn" onClick={() => { newproduct() }}>
                            Add products
                        </div>
                    </div>
                </div>
                <div className="table">
                    <div className="listHeader">
                        <p>Image</p>
                        <p>Product</p>
                        <p>Type</p>
                        <p>Stock</p>
                        <p>Actions</p>
                    </div>
                    {
                        products.length > 0 && (
                            products.map((item, key) => (
                                <div className="listItems" key={key}>
                                    <img src={`/upload/${item.image}`} alt="" height='40px' />
                                    <a href="">{item.name}</a>
                                    <p>{item.type}</p>
                                    <p>{item.stock}</p>
                                    <div>
                                        <button className="btn-icon success" onClick={() => editProduct(item.id)}>
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <button className="btn-icon danger" onClick={() => deleteProduct(item.id)}>
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default Index;