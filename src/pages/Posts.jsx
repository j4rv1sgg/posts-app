import React, {useRef,useMemo, useEffect, useState} from "react";
import {useFetching} from "../components/hooks/useFetching";
import {getPageCount} from "../components/utils/pages";
import PostService from "../API/PostService";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/postForm";
import PostFilter from "../components/postFilter";
import PostList from "../components/postList";
import Pagination from "../components/UI/pagination/Pagination";
import {usePosts} from "../components/hooks/usePosts";
import Loader from "../components/UI/Loader/Loader";
import {useObserver} from "../components/hooks/useObserver";


function Posts() {

    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [limit, setLimit] = useState(10)
    const [totalPages, setTotalPages] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)
    const lastElement = useRef()

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, ()=>{
        setPage(page+1)
    })

    useEffect(()=>{
        fetchPosts(limit, page)
    }, [page])

    const removePost = (post) =>{
        setPosts(posts.filter(p => p.id !== post.id))
    }
    const changePage = (page) =>{
        setPage(page)

    }

    const createPost = (newPost) =>{
        setPosts([...posts, newPost])
        setModal(false)
    }

    return (
        <div className="App">
            <MyButton onClick={() => setModal(true)}>Create post</MyButton>

            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create = {createPost}/>
            </MyModal>

            <hr style={{margin: "10px 0"}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {postError &&
                <h1>Error ${postError}</h1>
            }
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Man'/>
            <div ref={lastElement} style={{height: 20, background: 'red'}}/>
            {isPostsLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>


            }
            <Pagination
                page = {page}
                changePage={changePage}
                totalPages={totalPages}
            />

        </div>
    )
}
export default Posts;