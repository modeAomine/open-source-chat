import React from 'react';
import './activityFeed.css';

const ActivityFeed = ({ activities }) => {
    return (
        <div className="activity-feed">
            <h3>Лента активности</h3>
            <ul aria-label="Лента активности">
                {activities && activities.length > 0 ? (
                    activities.map((activity, index) => (
                        <li key={index} className="activity-item">
                            <img src={activity.avatar} alt={`Аватар ${activity.name}`} className="activity-avatar" />
                            <div className='activity__user__info'>
                                <span>{activity.name}</span>
                                <span>{activity.action}</span>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>В данный момент активности отсутствуют.</li>
                )}
            </ul>
        </div>
    );
};

export default ActivityFeed;