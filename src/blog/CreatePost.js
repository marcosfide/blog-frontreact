import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URI = process.env.REACT_APP_API_URL;


const CompCreateBlog = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const navigate = useNavigate()

    const store = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/blogs`, { title, content }, {
                headers: { 'Content-Type': 'application/json' }
            });
            navigate('/');
        } catch (error) {
            console.error('Error en la creación del blog:', error.response || error.message);
            alert('Hubo un error al crear el blog');
        }
    };    

    return ( 
        <div className="container-sm container-form">
            <h3>
                Create post
            </h3>
            <form onSubmit={store}>
                <div className="mb-3">
                    <label className="from-label fw-bold">Title</label>
                    <input
                    value={title}
                    onChange={ (e) => setTitle(e.target.value) }
                    type="text"
                    className="form-control border border-secondary"
                    />
                </div>
                <div className="mb-3">
                    <label className="from-label fw-bold">Content</label>
                    <textarea
                    value={content}
                    onChange={ (e) => setContent(e.target.value) }
                    type="text"
                    className="form-control border border-secondary"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Send</button>
            </form>
        </div>
     );
}
 
export default CompCreateBlog;