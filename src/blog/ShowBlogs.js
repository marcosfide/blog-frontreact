import axios from 'axios'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

const URI = 'http://localhost:8000/blogs'

const CompShowBlog = () => {
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        getBlogs()
    },[])

    const getBlogs = async() => {
        const res = await axios.get(URI)
        setBlogs(res.data)
    }

    const deleteBlog = async(id) => {
        await axios.delete(`${URI}/${id}`)
        getBlogs()
    }

    return(
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <Link to='/create' className='btn btn-primary my-2'><i className='fas fa-plus'></i> Add post</Link>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Content</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog) => (
                                <tr key={blog.id}>
                                    <td>{blog.title}</td>
                                    <td>{blog.content}</td>
                                    <td>
                                        <Link to={`/edit/${blog.id}`} className='btn btn-sm btn-info mx-2'><i className='fas fa-edit'></i> Edit</Link>
                                        <button onClick={()=> deleteBlog(blog.id)} className='btn btn-sm btn-danger mx-2'><i className='fas fa-trash-alt'></i> Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CompShowBlog