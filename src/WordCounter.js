import { useState, useEffect, useCallback } from 'react';

const WordCounter = ({ text = '' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const WORD_GOAL = 300;
    let fadeTimeout;

    // Show counter and set fade timeout
    const showCounter = useCallback(() => {
        setIsVisible(true);
        if (fadeTimeout) clearTimeout(fadeTimeout);
        fadeTimeout = setTimeout(() => {
            setIsVisible(false);
        }, 3000);
    }, []);

    useEffect(() => {
        const words = String(text || '').trim() ? String(text).trim().split(/\s+/).length : 0;
        setWordCount(words);
        showCounter();

        // Handle focus events on supporting text
        const handleFocus = (event) => {
            if (event.target.classList.contains('supporting-text')) {
                showCounter();
            }
        };

        // Add focus event listener
        document.addEventListener('focusin', handleFocus);
        
        return () => {
            if (fadeTimeout) clearTimeout(fadeTimeout);
            document.removeEventListener('focusin', handleFocus);
        };
    }, [text, showCounter]);

    const progress = (wordCount / WORD_GOAL) * 100;
    const isComplete = wordCount >= WORD_GOAL;

    return (
        <div className="word-counter-container">
            <div className={`word-counter-wrapper ${isVisible ? 'visible' : ''} ${isComplete ? 'complete' : ''}`}>
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