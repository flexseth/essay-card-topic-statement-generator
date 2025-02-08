import { useState, useEffect } from 'react';

const WordCounter = ({ text = '' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const WORD_GOAL = 300;
    let fadeTimeout;

    // Calculate word count and handle visibility
    useEffect(() => {
        // Ensure text is a string and count words
        const words = String(text || '').trim() ? String(text).trim().split(/\s+/).length : 0;
        setWordCount(words);
        
        // Show counter
        setIsVisible(true);
        
        // Clear any existing timeout
        if (fadeTimeout) clearTimeout(fadeTimeout);
        
        // Set new timeout to hide counter
        fadeTimeout = setTimeout(() => {
            setIsVisible(false);
        }, 3000);
        
        // Cleanup
        return () => {
            if (fadeTimeout) clearTimeout(fadeTimeout);
        };
    }, [text]);

    const progress = (wordCount / WORD_GOAL) * 100;

    return (
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
    );
};

export default WordCounter;