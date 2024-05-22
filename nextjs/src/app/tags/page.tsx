'use client';

import React, { useState } from 'react';
import './TagsPage.css';

const TagsPage = () => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const tags = {
        Hobbies: ['Climbing', 'Surfing', 'Music', 'Reading', 'Film'],
        Classes: ['CSC 123', 'CSC 101', 'CSC 202', 'PHIL 323', 'CSC 307'],
        Clubs: ['CS+AI', 'CPES', 'Ballroom', 'ISCO', 'SWE'],
    };

    const handleTagClick = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else if (selectedTags.length < 3) {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    return (
        <div className='tags-page-container'>
            <div className='tags-page'>
                <h1>Select your tags</h1>
                <p>Select up to 3</p>
                <div className='categories'>
                    {Object.entries(tags).map(([category, tags]) => (
                        <div key={category} className='category'>
                            <h2>{category}</h2>
                            <div className='tags'>
                                {tags.map((tag) => (
                                    <button
                                        key={tag}
                                        className={`tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
                                        onClick={() => handleTagClick(tag)}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <button className='submit-button'>Join Poly Meet</button>
            </div>
        </div>
    );
};

export default TagsPage;
