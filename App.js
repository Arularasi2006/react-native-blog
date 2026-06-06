import React, { useState } from "react";

function Bio() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        age: '',
        city: '',
        bio: '',
        role: 'developer',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };
    return (
        <form onSubmit={handleSubmit}>
            <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
            <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <input name="age" value={formData.age} onChange={handleChange} placeholder="Age" />
            <input name="city" value={formData.city} onChange={handleChange} placeholder="City" />
            <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" />
            <select name="role" value={formData.role} onChange={handleChange}>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="manager">Manager</option>
            </select>
            <button type="submit">Submit</button>
        </form>
    );
}

export default Bio;