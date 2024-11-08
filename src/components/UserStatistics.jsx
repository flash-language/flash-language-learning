import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Button, Card } from 'flowbite-react';

const logsUrl = "https://flash-language-5bfe9-default-rtdb.europe-west1.firebasedatabase.app/logs";
const usersUrl = "https://flash-language-5bfe9-default-rtdb.europe-west1.firebasedatabase.app/users.json";

function UserStatistics() {
  const [userStats, setUserStats] = useState([]);
  const [userEmails, setUserEmails] = useState({}); 

  const { currentUser } = useAuth();
  const currentUserId = currentUser ? currentUser.uid : null;

  useEffect(() => {
    // logs and user data in parallel
    axios.all([
      axios.get(`${logsUrl}.json`),
      axios.get(usersUrl)
    ])
      .then(axios.spread((logsResponse, usersResponse) => {
        const logsData = logsResponse.data;
        const usersData = usersResponse.data;

        // Map user emails by userId
        const emails = {};
        Object.values(usersData).forEach(userGroup => {
          Object.values(userGroup).forEach(user => {
            emails[user.uid] = user.email;
          });
        });
        setUserEmails(emails);

        if (logsData) {
          const userLogs = {};

          // prepare logs by user and data for calculations
          Object.entries(logsData).forEach(([key, log]) => {
            const { userId, eventType, timestamp, score } = log;
            if (!userId) return;

            if (!userLogs[userId]) {
              userLogs[userId] = { games: [], clicks: [], finalScores: [], logKeys: [] };
            }

            const user = userLogs[userId];
            user.logKeys.push(key); // store the log entry's unique key for deletion

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

          // average guess times and final scores for all users
          const calculatedStats = Object.entries(userLogs).map(([userId, { games, clicks, finalScores, logKeys }]) => {
            const averageTimes = games.map(({ start, end }) => {
              const gameClicks = clicks.filter((click) => click >= start && click <= end);
              const clickIntervals = gameClicks.slice(1).map((click, index) =>
                (click - gameClicks[index]) / 1000
              );

              return clickIntervals.length > 0
                ? (clickIntervals.reduce((acc, time) => acc + time, 0) / clickIntervals.length).toFixed(2)
                : null;
            }).filter(Boolean);

            return {
              userId,
              email: emails[userId] || "No email available", // Include email
              averageTimes,
              finalScores,
              logKeys, // Include logKeys for deletion
            };
          });

          setUserStats(calculatedStats);
        }
      }))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // delete logs for the current connected user
  const deleteUserLogs = () => {
    const userLog = userStats.find(stat => stat.userId === currentUserId);

    if (!userLog || !userLog.logKeys.length) {
      console.error("No logs found for this user.");
      return;
    }

    // construct delete requests for each log entry associated with the user
    const deleteRequests = userLog.logKeys.map(logKey =>
      axios.delete(`${logsUrl}/${logKey}.json`)
    );

    Promise.all(deleteRequests)
      .then(() => {
        alert("User logs deleted successfully.");
        setUserStats(userStats.filter(stat => stat.userId !== currentUserId)); // Update UI after deletion
      })
      .catch((error) => {
        console.error("Error deleting logs:", error);
      });
  };

  return (
    <div>
      <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white text-center p-1">User Statistics</h5>
      {userStats.map((user) => (
        <Card className="p-5 m-5" key={user.userId}>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white text-left p-1">Email: {user.email}</h3>
            <h3 className='p-1'>User: {user.userId}</h3>
            <p className='p-1'>Average time to Guess a word per Game session:</p>
            <p className='m-2'> {user.averageTimes.join(', ')} seconds</p>
            <p className='p-1'>Final Scores:</p>
            <p className='m-2'> {user.finalScores.join(', ')}</p>
          </div>
        </Card>
      ))}
      <Button className="m-5" onClick={deleteUserLogs}>Delete my Data and Stats</Button>
    </div>
  );
}

export default UserStatistics;
