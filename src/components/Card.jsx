import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Card() {
  const [wordData, setWordData] = useState(null);
  const url = "https://flash-language-5bfe9-default-rtdb.europe-west1.firebasedatabase.app/words.json/-OAcbs8YkDmCW3u_rE-n";

  useEffect(() => {
    axios.get(url)
      .then((response) => {
      
        setWordData(response.data[1]);
      })
      .catch((e) => console.log(e));
  }, []);

  if (!wordData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <img src={wordData.ImageURL} alt={wordData.English} />
      <h2>{wordData.English}</h2>
    </div>
  );
}

export default Card;
