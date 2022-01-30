import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

function ProductUpdateForm({ handleSubmit, handleChange, handleCategoryChange, values, setValues, categories, subOptions, subCategoryIds, setSubCategoryIds, selectedCategory }) {
    const { title, description, price, category, subs, shipping, quantity, images, colors, brands, color, brand } = values;
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
                    value={shipping}
                >   
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
                    value={color}
                >   
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
                    value={brand}
                >   
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
                    onChange={handleCategoryChange}
                    value={selectedCategory ? selectedCategory : category._id}
                >
                    {!category && <option value=''>Please select a Category</option>}
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

            <div>
                <label>Select Sub Categories</label>
                {
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please Select"
                        value={subCategoryIds}
                        onChange={(value) => setSubCategoryIds(value)}
                    >
                        {
                            subOptions.length &&
                            subOptions.map((s) => {
                                return (
                                    <Option value={s._id} key={s._id}>
                                        {s.name}
                                    </Option>
                                )
                            })
                        }

                    </Select>
                }
            </div>

            <br />

            <button className="btn btn-outline-info">
                Save Product
            </button>

        </form>
    )
}

export default ProductUpdateForm;
