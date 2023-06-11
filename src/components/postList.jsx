import React, {useState} from 'react';
import PostItem from "./postItem";

const PostList = ({posts, title, remove}) => {

    if(!posts.length){
        return(
            <div style={{textAlign: 'center'}}>Posts is not found</div>
        )
    }

    return (
        <div>
            <h3 style={{textAlign: 'center'}}>{title}</h3>
            {posts.map((item, index)=>
                <PostItem remove={remove} number={index+1} post={item} key={item.id}/>
            )}
        </div>
    );
};

export default PostList;