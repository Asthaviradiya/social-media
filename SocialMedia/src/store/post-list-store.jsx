import { useCallback, useEffect, useState } from "react";
import { createContext, useReducer } from "react"

export const PostList = createContext({
    postList: [],
    addPost: () => { },
    deletePost: () => { },

});

const postListReducer = (currPostList, action) => {
    let postList = currPostList
    if (action.type === 'DELETE_POST') {
        postList = postList.filter((post) => post.id !== action.payload.postId)
    }
    else if (action.type === 'ADD_INITIAL_POST') {
        postList = action.payload.posts;
    }
    else if (action.type === 'ADD_POST') {
        postList = [action.payload, ...currPostList]
    }
    return postList;
}

const PostListProvider = ({ children }) => {
    const [postList, dispatchPostList] = useReducer(postListReducer, []);
    const addPost = (userId, postTitle, postBody, reactions, tags) => {
        dispatchPostList({
            type: 'ADD_POST',
            payload: {
                id: Date.now(),
                title: postTitle,
                body: postBody,
                reactions: reactions,
                userId: userId,
                tags: tags
            },
        })
    }
    const addInitialPosts = (posts) => {
        dispatchPostList({
            type: 'ADD_INITIAL_POST',
            payload: {
                posts
            },
        })
    }
    const deletePost = useCallback((postId) => {
        dispatchPostList({
            type: 'DELETE_POST',
            payload: {
                postId
            },
        })
    }, [dispatchPostList]);

    /* // postList : postList .... it is a postlist that we declaired in useReducer, not postlist arr */
    return <PostList.Provider value={{ postList, addPost, deletePost }}>
        {children}
    </PostList.Provider>
}


// for list of object collected by user from form
// const DEFAULT_LIST = [{
//     id: '2',
//     title: 'pass-out',
//     body: 'Hi frds, i passout ',
//     reactions: 15,
//     userId: 'user-12',
//     tags: ['pass', 'graduating', 'unbelivable']
// },
// {
//     id: '1',
//     title: 'going to mumbai',
//     body: 'Hi frds, im going to mumbai for my vacation',
//     reactions: 2,
//     userId: 'user-9',
//     tags: ['vacation', 'mumbai']
// }]
export default PostListProvider;
