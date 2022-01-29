import React from 'react';

function CategoryForm({ handleSubmit, name, setName, loading }) {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input 
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                    required
                />
                <br />
                <button className="btn btn-outline-primary" disabled={loading || name.length < 2}>Save</button>
            </div>
        </form>
    )
}

export default CategoryForm;
