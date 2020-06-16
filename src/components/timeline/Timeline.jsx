import React, { useEffect, useState } from 'react';
import headers from '../../services/headers';
import Header from './Header';
import PostList from './PostList';
import FindPeople from '../friends-side-bar/FindPeople';

export default function Timeline({ match }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(`http://localhost:4000/users/${match.params.id}`, {
                mode: 'cors',
                headers: headers(),
            });
            const userData = await response.json();
            setUser(userData);
        };
        getUser();
    }, [match.params.id]);

    return (
        <>
            <Header
                username={user.first_name}
                profile_picture={user.profile_picture}
                user_id={user._id}
            />
            <div className="container">
                <section className="posts">
                    <PostList currentUser={user} />
                </section>
                <section className="right-col">
                    <FindPeople currentUser={user} />
                </section>
            </div>
        </>
    );
}
