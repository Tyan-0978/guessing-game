import { useState } from 'react'
import './App.css'
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')
  const [attempt, setAttempt] = useState(0);

  const startMenu = (
    <div>
      <button
        onClick={async () => {
          await startGame()
          setHasStarted(true)
        }}
      >
        start game
      </button>
    </div>
  )

  // count attempt feature
  const createAttemptText = (attempt) => {
    return attempt === 0 ? "" : ("Attempt: " + attempt);
  };

  const game = (
    <div>
      {hasWon ? (
        <>
          <p>you won! the number was {number}.<br/>Your attempts: {attempt}.</p>
          <button
            onClick={async () => {
              const msg = await restart()
              console.log(msg);

              setHasWon(false)
              setStatus('')
              setNumber('')
              setAttempt(0);
            }}
          >
            restart
          </button>
        </>
      ) : (
        <>
          <p>Guess a number between 1 to 100</p>
          <input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          ></input>
          <button
            // TODO: use async/await to call guess(number),
            // process the response to set the proper state values
            onClick={ async () => {
              const message = await guess(number);
              if (message === "correct") {
                setHasWon(true);
              } else {
                setStatus(message);
                setAttempt(attempt + 1);
              }
            }}
            disabled={!number}
          >
            guess!
          </button>
          <p>{status + " " + createAttemptText(attempt)}</p>
        </>
      )}
    </div>
  )

  return <div className="App">{hasStarted ? game : startMenu}</div>
}

export default App
