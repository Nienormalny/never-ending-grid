import React, { useEffect, useState } from 'react';
import Level from './components/lvl.component';
import './App.css';

const App = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [goToNextLvl, setGoToNextLvl] = useState(false);
  const [lvlNumber, setLvlNumber] = useState(1);
  const [lvlData, setLvlData] = useState({
    gridNumber: 3,
    checkpoints: 1
  });
  const [nextLvlData, setNextLvlData] = useState(null);

  useEffect(() => {
    if (goToNextLvl) {
      setTimeout(() => {
        setLvlNumber(old => old + 1);
        setLvlData(nextLvlData);
        setGoToNextLvl(false);
        setShowMessage(false);
      }, 500);
    }
  }, [goToNextLvl])
  return (
    <main className="game_container">
      <h1>Level {lvlNumber}</h1>
      {!goToNextLvl && <Level gridNumber={lvlData.gridNumber} checkpoints={lvlData.checkpoints} onFinish={(nextLvlGrids, nextLvlRooms) => {
        setShowMessage(true);
        setNextLvlData({
          gridNumber: nextLvlGrids,
          checkpoints: nextLvlRooms
        });
      }}/>}
      {showMessage && <div className="modal">
        <h2>Congratulations!</h2>
        <p>You did it perfect <b>Human</b>. Are you ready for the next episode?</p>
        <button className="btn_next" onClick={() => setGoToNextLvl(true)}>Next Lvl</button>
      </div>}
    </main>
  );
}

export default App;
