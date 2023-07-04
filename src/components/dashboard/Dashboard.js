import React from 'react'


function Dashboard() {
    const topics = [
        { name: "Calculus" },
        { name: "Statistics" },
        { name: "Physics" },
        { name: "Astrology" },
        { name: "Geology" },
        { name: "Chemistry" },
        { name: "Biology" },
        { name: "Computer Science" },
        { name: "Economics" },
        { name: "Finance" },
        { name: "Accounting" },
        { name: "Business" },
        { name: "History" },
        { name: "Geography" },
        { name: "English" },
        { name: "Vietnamese" },
        { name: "Chinese" },
        { name: "German" },
    ]
    return (
        <div className='dashboard'>
            <h1>Dashboard</h1>

            <h2>Topics</h2>
            {topics.map(topic => (
                <div>{topic.name}</div>
            ))}
        </div>

    )
}

export default Dashboard