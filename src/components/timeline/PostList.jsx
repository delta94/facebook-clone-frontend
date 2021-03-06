import React, { useState, useEffect } from 'react';
import Post from './Post';
import headers from '../../services/headers';
import CreatePost from './CreatePost';
import Loader from './Loader';

export default function PostList({ currentUser, socket }) {
    const [posts, setPosts] = useState([]);
    const [showLoader, setShowLoader] = useState(true);
    const friends = currentUser.friends && currentUser.friends.map((friend) => friend._id);

    useEffect(() => {
        const abortCon = new AbortController();
        const signal = abortCon.signal;
        const getPosts = async () => {
            const response = await fetch(`/api/posts?user=${currentUser._id}`, {
                headers: headers(),
                signal,
            });
            const postsData = await response.json();
            setPosts(postsData);
            setShowLoader(!showLoader);
            socket.on('new_post', (post) => {
                if (post.user._id !== currentUser._id && friends.includes(post.user._id)) {
                    setPosts((posts) => [post, ...posts]);
                }
            });
        };
        if (currentUser._id) {
            getPosts();
        }
        return function () {
            abortCon.abort();
            socket.off('new_post');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser._id]);

    const deletePost = async (post_id, setShowPostActions) => {
        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'delete',
            mode: 'cors',
            headers: headers(),
        });
        // eslint-disable-next-line no-unused-vars
        const data = await response.json();
        setPosts((prevState) => prevState.filter((post) => post._id !== post_id));
        setShowPostActions(false);
    };

    return (
        <>
            <CreatePost
                username={currentUser.first_name}
                profile_picture={currentUser.profile_picture}
                user_id={currentUser._id}
                setPosts={setPosts}
                socket={socket}
            />
            <Loader showLoader={showLoader} />
            <section className="post-list">
                {posts.map((post) => (
                    <Post
                        key={post._id}
                        post_id={post._id}
                        user={`${post.user.first_name} ${post.user.last_name}`}
                        user_id={post.user._id}
                        profile_picture={post.user.profile_picture}
                        content={post.content}
                        image={post.image}
                        comments={post.comments}
                        reactions={post.reactions}
                        timestamp={post.timestamp}
                        currentUser={currentUser}
                        deletePost={deletePost}
                    />
                ))}
            </section>
        </>
    );
}
