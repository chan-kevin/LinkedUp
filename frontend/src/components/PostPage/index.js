import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../store/post";

const PostPage = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => Object.values(state.posts))

    useEffect(() => {
        dispatch(getAllPosts());
    }, [])

    return (
        <div>
            {posts && posts.map(post => (
                <p>{post.body}</p>
            ))}
        </div>
    )
}

export default PostPage;