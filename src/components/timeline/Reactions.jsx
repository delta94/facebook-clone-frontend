import React from 'react';
import like from '../../images/like-reaction.png';
import love from '../../images/love.png';
import haha from '../../images/haha.png';
import wow from '../../images/wow.png';
import sad from '../../images/sad.png';
import angry from '../../images/angry.png';
import headers from '../../services/headers';

export default function Reactions({ post_id, user_id, setPostReactions }) {
    const react = async (type) => {
        const reaction = {
            reaction: type,
            user_id,
        };
        const response = await fetch(`/api/posts/${post_id}/react`, {
            method: 'put',
            mode: 'cors',
            headers: headers(),
            body: JSON.stringify(reaction),
        });
        const submittedReaction = await response.json();
        setPostReactions((postReactions) => postReactions.concat(submittedReaction));
    };

    return (
        <div className="box">
            <button className="reaction-like" onClick={() => react('Like')}>
                <img src={like} alt="" />
                <span className="legend-reaction">Like</span>
            </button>
            <button className="reaction-love" onClick={() => react('Love')}>
                <img src={love} alt="" />
                <span className="legend-reaction">Love</span>
            </button>
            <button className="reaction-haha" onClick={() => react('Haha')}>
                <img src={haha} alt="" />
                <span className="legend-reaction">Haha</span>
            </button>
            <button className="reaction-wow" onClick={() => react('Wow')}>
                <img src={wow} alt="" />
                <span className="legend-reaction">Wow</span>
            </button>
            <button className="reaction-sad" onClick={() => react('Sad')}>
                <img src={sad} alt="" />
                <span className="legend-reaction">Sad</span>
            </button>
            <button className="reaction-angry" onClick={() => react('Angry')}>
                <img src={angry} alt="" />
                <span className="legend-reaction">Angry</span>
            </button>
        </div>
    );
}
