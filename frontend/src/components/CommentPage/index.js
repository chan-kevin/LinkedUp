import { useSelector } from "react-redux";


const CommentPage = ({postId}) => {
    const comments = useSelector(state => Object.values(state.comments).filter(comment => comment.postId === postId))
    return (comments.map((comment, index) => {
        return (
            <div className="comments" key={index}>
                <div className='authorPic'>
                    <img src={comment?.commenterPhoto} alt='defaultProfile' />
                </div>

                <div className="commentsDetail" key={comment.id}>
                    <div className="authorName">
                        {comment?.commenterFirstName} {comment?.commenterLastName}
                    </div>

                    <div className="authorHeadline">
                        {comment?.commenterHeadline}
                    </div>

                    <div className="commentBody">
                        {comment?.body}
                    </div>

                </div>
            </div>)
            })
        )
    }


export default CommentPage;