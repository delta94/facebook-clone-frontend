import React, { useState, useEffect } from 'react';
import Person from './Person';
import headers from '../../services/headers';

export default function FindPeople({ currentUser }) {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        const getPeople = async () => {
            const response = await fetch(
                `http://localhost:4000/users/${currentUser._id}/new-people`,
                { headers: headers(), mode: 'cors' },
            );
            const nonFriends = await response.json();
            setPeople(nonFriends);
        };
        if (currentUser._id) {
            getPeople();
        }
    }, [currentUser._id]);

    return (
        <section className="find-friends">
            {people.map((person) => (
                <Person
                    key={person._id}
                    current_user_id={currentUser._id}
                    person_id={person._id}
                    first_name={person.first_name}
                    last_name={person.last_name}
                    btnText={'Add friend'}
                />
            ))}
        </section>
    );
}
