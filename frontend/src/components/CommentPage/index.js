

const CommentPage = ({post, comments}) => {

    return (comments.filter(comment => comment.postId === post.id).map((comment, index) => {
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
            </div>)
            })
        )
    }


export default CommentPage;