import React from 'react';
import MyButton from "./UI/button/MyButton";
import {useNavigate} from 'react-router-dom'

const PostItem = (props) => {
    const navigate = useNavigate()
    return (
        <div>
            <div className="post">
                <div className="post__content">
                    <strong>{props.post.id} {props.post.title}</strong>
                    <div>
                        {props.post.body}
                    </div>
                </div>
                <div className="post__button">
                    <MyButton onClick={()=> navigate(`/posts/${props.post.id}`)}>Open</MyButton>
                    <MyButton onClick={()=>props.remove(props.post)}>Remove</MyButton>
                </div>
            </div>
        </div>
    );
};

export default PostItem;