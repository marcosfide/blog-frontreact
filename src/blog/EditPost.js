import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI = 'http://localhost:8000/blogs'

const CompEditPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();

    const update = async (e) => {
        e.preventDefault();
        await axios.put(`${URI}/${id}`, {
            title: title,
            content: content
        });
        navigate('/');
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
        <div>
            <h3>
                Edit post
            </h3>
            <form onSubmit={update}>
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
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
     );
}
 
export default CompEditPost;