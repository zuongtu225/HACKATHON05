import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

function App() {
  useEffect(() => {
    getData();
  }, []);
  const [dataGame, setDataGame] = useState();
  const [rounds, setRounds] = useState();
  const [score1, setScore1] = useState();
  const [score2, setScore2] = useState();
  const [score3, setScore3] = useState();
  const [score4, setScore4] = useState();
  const plus = (id) => {
    console.log(id);
  };
  const minus = (id) => {};
  // get data
  const getData = async () => {
    const datajson = await axios.get(`http://localhost:5000/games`);
    const datas = datajson.data;
    setDataGame(datas[0].games);
    setRounds(datas[1].rounds);
  };

  // ADD;
  const addRound = async () => {
    const newRound = {
      id: Math.random(),
      scorePlayer1: 0,
      scorePlayer2: 0,
      scorePlayer3: 0,
      scorePlayer4: 0,
    };
    await axios.post(`http://localhost:5000/add/round`, newRound);
    getData();
  };

  return (
    <>
      <div className="game-wraper">
        <h1>TÍCH ĐIỂM ĐÁNH BÀI</h1>
        <table>
          <thead>
            <tr>
              <th>#</th>
              {dataGame?.map((item) => {
                return <th>{item.name}</th>;
              })}
            </tr>
            <tr className="color-sum">
              <th>Sum</th>
              <th>1</th>
              <th>1</th>
              <th>1</th>
              <th>1</th>
            </tr>
          </thead>
          <tbody>
            {rounds?.map((item, index) => {
              return (
                <tr>
                  <td>Round {index + 1}</td>
                  <td>
                    <AiOutlineMinus
                      className="minus"
                      onClick={() => minus(item.id)}
                    />
                    <input
                      type="number"
                      value={item.scorePlayer1}
                      onChange={(e) => setScore1(e.target.value)}
                    />
                    <AiOutlinePlus
                      className="plus"
                      onClick={() => plus(item.id)}
                    />
                  </td>
                  <td>
                    <AiOutlineMinus
                      className="minus"
                      onClick={() => minus(item.id)}
                    />
                    <input
                      type="number"
                      value={item.scorePlayer2}
                      onChange={(e) => setScore1(e.target.value)}
                    />
                    <AiOutlinePlus
                      className="plus"
                      onClick={() => plus(item.id)}
                    />
                  </td>
                  <td>
                    <AiOutlineMinus
                      className="minus"
                      onClick={() => minus(item.id)}
                    />
                    <input
                      type="number"
                      value={item.scorePlayer3}
                      onChange={(e) => setScore1(e.target.value)}
                    />
                    <AiOutlinePlus
                      className="plus"
                      onClick={() => plus(item.id)}
                    />
                  </td>
                  <td>
                    <AiOutlineMinus
                      className="minus"
                      onClick={() => minus(item.id)}
                    />
                    <input
                      type="number"
                      value={item.scorePlayer4}
                      onChange={(e) => setScore1(e.target.value)}
                    />
                    <AiOutlinePlus
                      className="plus"
                      onClick={() => plus(item.id)}
                    />
                  </td>
                </tr>
              );
            })}

            {/* {
              <tr>
                <td>Round</td>
                {data?.map((player) => {
                  return (
                    <td>
                      {player.rounds.map((round) => {
                        return round.score;
                      })}
                    </td>
                  );
                })}
              </tr>
            } */}
          </tbody>
        </table>
        <Button variant="primary" onClick={addRound}>
          AddRound
        </Button>
      </div>
    </>
  );
}

export default App;
