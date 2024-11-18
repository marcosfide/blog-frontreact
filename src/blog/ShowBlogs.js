import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const URI = process.env.REACT_APP_API_URL;

const CompShowBlog = () => {
    const [blogs, setBlogs] = useState([])
    const [error, setError] = useState(null) // Para manejar errores

    useEffect(() => {
        // Llamada a getBlogs dentro del useEffect
        getBlogs()
    }, [])

    const getBlogs = async () => {
        try {
            const res = await axios.get(URI)
            setBlogs(res.data)
        } catch (error) {
            console.error('Error al obtener los blogs:', error)
            setError('No se pudo cargar los blogs. Intenta nuevamente más tarde.')
        }
    }

    const deleteBlog = async (id) => {
        try {
            await axios.delete(`${URI}/${id}`)
            // Vuelve a cargar los blogs después de la eliminación
            getBlogs()
        } catch (error) {
            console.error('Error al eliminar el blog:', error)
            setError('No se pudo eliminar el blog. Intenta nuevamente más tarde.')
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    {/* Botón para agregar un nuevo blog */}
                    <Link to="/create" className="btn btn-primary my-2">
                        <i className="fas fa-plus"></i> Add post
                    </Link>

                    {/* Muestra mensaje de error si hay un error */}
                    {error && <div className="alert alert-danger">{error}</div>}

                    {/* Tabla que muestra los blogs */}
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Content</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.length > 0 ? (
                                blogs.map((blog) => (
                                    <tr key={blog.id}>
                                        <td>{blog.title}</td>
                                        <td>{blog.content}</td>
                                        <td>
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
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">No blogs found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CompShowBlog