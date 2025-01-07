import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ShowBlog.css';

const URI = process.env.REACT_APP_API_URL;

const CompShowBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null); // Para manejar errores

    useEffect(() => {
        // Llamada a getBlogs dentro del useEffect
        getBlogs();
    }, []);

    const getBlogs = async () => {
        try {            
            const res = await axios.get(`${URI}/blogs`);
            setBlogs(res.data);
        } catch (error) {
            console.error('Error al obtener los blogs:', error);
            setError('No se pudo cargar los blogs. Intenta nuevamente más tarde.');
        }
    };

    const deleteBlog = async (id) => {
        try {
            // Intentamos eliminar el blog
            await axios.delete(`${URI}/blogs/${id}`);
            // Volvemos a cargar los blogs después de la eliminación
            getBlogs();
        } catch (error) {
            if (error.response && error.response.status === 403) {
                // Manejar el caso de posts protegidos
                setError('No se pueden eliminar las publicaciones realizadas por el admin.');
            } else {
                // Manejo genérico de errores
                console.error('Error al eliminar el blog:', error);
                setError('No se pudo eliminar el blog. Intenta nuevamente más tarde.');
            }
        }
    };

    return (
        <div className="container-md">
            <div className="row">
                <div className="col">
                    {/* Botón para agregar un nuevo blog */}
                    <Link to="/create" className="btn btn-primary my-2">
                        <i className="fas fa-plus"></i> Add post
                    </Link>

                    {/* Muestra mensaje de error si hay un error */}
                    {error && <div className="alert alert-danger">{error}</div>}

                    {/* Muestra los blogs en formato de bloques */}
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <div key={blog.id} className="card my-3 custom-card">
                                <div className="card-body">
                                    <h5 className="card-title">{blog.title}</h5>
                                    <p className="card-text">{blog.content}</p>
                                    <div className="d-flex justify-content-end">
                                        {/* Enlace para editar el blog */}
                                        <Link
                                            to={`/edit/${blog.id}`}
                                            className="btn btn-sm btn-info mx-2"
                                        >
                                            <i className="fas fa-edit"></i> Edit
                                        </Link>
                                        {/* Botón para eliminar el blog */}
                                        <button
                                            onClick={() => deleteBlog(blog.id)}
                                            className="btn btn-sm btn-danger mx-2"
                                        >
                                            <i className="fas fa-trash-alt"></i> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="alert alert-warning">
                            No blogs found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompShowBlog;
