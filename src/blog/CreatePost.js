import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URI = 'http://localhost:8000/blogs'


const CompCreateBlog = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const navigate = useNavigate()

    const store = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(URI, { title, content }, {
                headers: { 'Content-Type': 'application/json' }
            });
            navigate('/');
        } catch (error) {
            console.error('Error en la creación del blog:', error.response || error.message);
            alert('Hubo un error al crear el blog');
        }
    };    

    return ( 
        <div>
            <h3>
                Create post
            </h3>
            <form onSubmit={store}>
                <div className="mb-3">
                    <label className="from-label">Title</label>
                    <input
                    value={title}
                    onChange={ (e) => setTitle(e.target.value) }
                    type="text"
                    className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="from-label">Content</label>
                    <textarea
                    value={content}
                    onChange={ (e) => setContent(e.target.value) }
                    type="text"
                    className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Send</button>
            </form>
        </div>
     );
}
 
export default CompCreateBlog;