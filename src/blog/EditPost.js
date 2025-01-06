import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditPost.css"

const URI = process.env.REACT_APP_API_URL;

const CompEditPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();

    const update = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API_URL}/blogs/${id}`, {
                title: title,
                content: content,
            });
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 403) {
                // Manejo específico para posts protegidos
                alert('No se pueden editar las publicaciones realizadas por el admin.');
            } else {
                // Manejo genérico de errores
                console.error('Error al actualizar el blog:', error);
                alert('No se pudo actualizar el blog. Intenta nuevamente más tarde.');
            }
        }
    };    

    const getPostById = useCallback(async () => {
        const res = await axios.get(`${URI}/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
    }, [id]);

    useEffect(() => {
        getPostById();
    }, [getPostById]);


    return ( 
        <div className="container-sm container-form">
            <h3>
                Edit post
            </h3>
            <form onSubmit={update}>
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
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
     );
}
 
export default CompEditPost;