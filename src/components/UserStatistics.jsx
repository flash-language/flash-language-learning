import React, { useEffect, useState } from 'react';
import axios from 'axios';

const logsUrl = "https://flash-language-5bfe9-default-rtdb.europe-west1.firebasedatabase.app/logs.json";

function UserStatistics() {
  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    axios.get(logsUrl)
      .then((response) => {
        const logsData = response.data;
        //console.log(logsData)

        if (logsData) {
          const userLogs = {};

          // Organize logs by user and prepare data for calculations
          Object.entries(logsData).forEach(([key, log]) => {
            const { userId, eventType, timestamp, score } = log;
            
            if (!userId) return;

            if (!userLogs[userId]) {
              userLogs[userId] = { games: [], clicks: [], finalScores: [] };
              console.log(userLogs[userId])
            }

            const user = userLogs[userId];

            if (eventType === "click") {
              user.clicks.push(new Date(timestamp));
            } else if (eventType === "game_start") {
              user.games.push({ start: new Date(timestamp), end: null });
            } else if (eventType === "game_end") {
              const lastGame = user.games[user.games.length - 1];
              if (lastGame) lastGame.end = new Date(timestamp);
              user.finalScores.push(score);
            }
          });

          // Calculate average guess times and final scores for each user
          const calculatedStats = Object.entries(userLogs).map(([userId, { games, clicks, finalScores }]) => {
            const averageTimes = games.map(({ start, end }) => {
              //if (!start || !end) return null;

              const gameClicks = clicks.filter((click) => click >= start && click <= end);
              const clickIntervals = gameClicks.slice(1).map((click, index) =>
                (click - gameClicks[index]) / 1000 // Convert milliseconds to seconds
              );

              console.log(clickIntervals)

              return clickIntervals.length > 0
                ? (clickIntervals.reduce((acc, time) => acc + time, 0) / clickIntervals.length).toFixed(2)
                : null;
            }).filter(Boolean);

            return {
              userId,
              averageTimes,
              finalScores,
            };
          });

          setUserStats(calculatedStats); // Update the state with calculated stats
        }
      })
      .catch((error) => {
        console.error("Error fetching logs:", error);
      });
  }, []);

  return (
    <div>
      <h2>User Statistics</h2>
      {userStats.map((user) => (
        <div key={user.userId}>
          <h3>User: {user.userId}</h3>
          <p>Average Time to Guess per Game: {user.averageTimes.join(', ')} seconds</p>
          <p>Final Scores: {user.finalScores.join(', ')}</p>
        </div>
      ))}
    </div>
  );
}

export default UserStatistics;
