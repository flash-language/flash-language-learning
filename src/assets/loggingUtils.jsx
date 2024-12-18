import axios from 'axios';

const logsUrl = "https://flash-language-5bfe9-default-rtdb.europe-west1.firebasedatabase.app/logs.json";

export const logEvent = (eventType, { isCorrect, score, currentWordId, userId }) => {
    
    const timestamp = new Date().toISOString();
    
    const logEntry = {
        timestamp,
        eventType,
        isCorrect,
        score,
        currentWordId,
        userId
    };

    axios.post(logsUrl, logEntry)
        .then(() => {
            console.log("Log entry saved to Firebase:", logEntry);
        })
        .catch((error) => {
            console.error("Error saving log entry:", error);
        });
};
