import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAllComments } from "../../store/comment";
import { getAllPosts, getOnePost } from "../../store/post";
import './PostPage.css';

const PostPage = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => Object.values(state.posts));
    const comments = useSelector(state => Object.values(state.comments));
    const sessionUser = useSelector(state => state.session.user);
    // const [hasComments, setHasComments] = useState(false);

    useEffect(() => {
        dispatch(getAllPosts());
    }, [])

    const listComments = (postId) => {
        dispatch(getOnePost(postId));
        // setHasComments(true)
    }

    const createPost = async () => {
        const newPost = {
            authorId: 1,
            body: 'testNewPost'
        }
        await dispatch(createPost(newPost))
    }

    if (!sessionUser) return <Redirect to="/" />;

    return (
        <div className='fontFamily' id='homeFeed'>
            <div className='profileBoard' id="createPost">
                <div className='authorPic'>
                    <img src={sessionUser.photoUrl} alt='defaultProfile' />
                </div>

                <button onClick={createPost}>
                    submit
                </button>
            </div>

            <div className="postList">
                {posts && posts.map((post, index) => (
                <div className='profileBoard' id='feedPost' key={index}>

                    <div className="authorInfo">
                        <div className='authorPic'>
                            <img src={post.authorPhoto} alt='defaultProfile' />
                        </div>
                        <div className="authorDetail">
                            <div className="authorName">
                                {post.authorFirstName} {post.authorLastName}
                            </div>
                            <div className="authorHeadline">
                                {post.authorHeadline}
                            </div>
                        </div>
                    </div>

                    <div className="postBody">
                        {post.body}
                    </div>

                    <div className="postLikesComments">
                        <div className="likesCount">
                            <i className="fa-regular fa-thumbs-up" id="likesCountIcon"></i>
                            {post.likesCount}
                        </div>
                        <div className="commentsCount" onClick={() => listComments(post.id)}>
                            {post.comments.length} comments
                        </div>
                    </div>

                    <div className="postInteract">
                        <button className='postButtons'>
                            <i className="fa-regular fa-thumbs-up" id="likeButton"></i>
                            <span>Like</span>
                        </button>
                        <button className='postButtons'>
                            <i className="fa-regular fa-comment-dots" id="commentButton"></i>Comment
                        </button>
                    </div>
                    { comments && comments.filter(comment => comment.postId === post.id).map((comment, index) => {
                    return (
                        <div className="comments" key={index}>
                            <div className='authorPic'>
                                <img src={comment.commenterPhoto} alt='defaultProfile' />
                            </div>

                            <div className="commentsDetail" key={comment.id}>
                                <div className="authorName">
                                    {comment.commenterFirstName} {comment.commenterLastName}
                                </div>

                                <div className="authorHeadline">
                                    {comment.commenterHeadline}
                                </div>

                                <div className="commentBody">
                                    {comment.body}
                                </div>

                            </div>
                        </div>
                    );
                    })}
                </div>
                ))}
            </div>
        </div>
    )
}

export default PostPage;