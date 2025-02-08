import { useState, useEffect } from 'react';

const WordCounter = ({ text = '' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const WORD_GOAL = 300;
    let fadeTimeout;

    useEffect(() => {
        const words = String(text || '').trim() ? String(text).trim().split(/\s+/).length : 0;
        setWordCount(words);
        setIsVisible(true);
        
        if (fadeTimeout) clearTimeout(fadeTimeout);
        
        fadeTimeout = setTimeout(() => {
            setIsVisible(false);
        }, 3000);
        
        return () => {
            if (fadeTimeout) clearTimeout(fadeTimeout);
        };
    }, [text]);

    return (
        <div className="word-counter-container">
            <div className={`word-counter-wrapper ${isVisible ? 'visible' : ''}`}>
                <div className="word-counter">
                    <span className="count">{wordCount}</span>
                    <span className="label">words</span>
                </div>
                <progress 
                    value={wordCount} 
                    max={WORD_GOAL} 
                    className="word-progress"
                />
            </div>
        </div>
    );
};

export default WordCounter;