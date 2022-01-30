import React from 'react'

function ProductCreateForm({ handleSubmit, handleChange, values }) {

    const { title, description, price, categories, category, subs, shipping, quantity, images, colors, brands, color, brand } = values;

    return (
        <form onSubmit={handleSubmit}>

            <div className="form-group">
                <label>Title</label>
                <input 
                    type="text"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={handleChange}
                    autoFocus
                />
            </div>

            <div className="form-group">
                <label>Description</label>
                <input 
                    type="text"
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Price</label>
                <input 
                    type="number"
                    name="price"
                    className="form-control"
                    value={price}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Shipping</label>
                <select 
                    name="shipping"
                    className="form-control"
                    onChange={handleChange}
                >   
                    <option value="">Please Select</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label>Quantity</label>
                <input 
                    type="number"
                    name="quantity"
                    className="form-control"
                    value={quantity}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Color</label>
                <select 
                    name="color"
                    className="form-control"
                    onChange={handleChange}
                >   
                    <option key="" value="">Please Select</option>
                    {
                        colors.map((c) => {
                            return (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            )
                        })
                    }
                </select>
            </div>

            <div className="form-group">
                <label>Brand</label>
                <select 
                    name="brand"
                    className="form-control"
                    onChange={handleChange}
                >   
                    <option key="" value="">Please Select</option>
                    {
                        brands.map((b) => {
                            return (
                                <option key={b} value={b}>
                                    {b}
                                </option>
                            )
                        })
                    }
                </select>
            </div>

            <div className="form-group">
                <label>Select Category</label>
                <select
                    name="category"
                    className="form-control"
                    onChange={handleChange}
                >
                    <option value=''>Please select a Category</option>
                    {
                        categories.length > 0 &&
                        categories.map((c) => {
                            return (
                                <option key={c._id} value={c._id}>
                                    {c.name}
                                </option>
                            )
                        })
                    }

                </select>
            </div>

            <button className="btn btn-outline-info">
                Save Product
            </button>

        </form>
    )
}

export default ProductCreateForm;
