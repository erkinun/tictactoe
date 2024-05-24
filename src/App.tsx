import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// tictactoe game 
// draw the game 
// players 
// state of the game 
// round mechanism 
// check at the end of each turn
// Style the game

type SlotState = 'X' | 'O' | ''

type X = 'X'
type O = 'O'

type Player = X | O
type Winner = Player

type GameOver = {
  winner: Player
}

type GameState = 'continue' | GameOver

type GameBoard = Array<Array<SlotState>>

const initial: GameBoard = [['', '', ''], ['', '', ''], ['', '', '']]

// TODO maybe rename to something generic
function checkRow(row: Array<SlotState>): GameState {
  // check if row is not 3 length
  if (row.every((s) => s === 'X')) {
    return {
      winner: 'X'
    }
  }
  else if (row.every((s) => s=== 'O')) {
    return {
      winner: 'O'
    }
  }
  else {
    return 'continue'
  }
}
// column and diagonal can be implemented using checkRow anyway 

function checkGame() {
  // check rows 
  // check columns 
  // check diagonals
}

// TODO how to make it more nicer as in google's one
function drawTheBoard(game: GameBoard) {
  return (
    <div className=''>
      {
        game.map((row) => {
          return (
            <div className='flex'>{
              row.map((s) => {
                return <div className='border border-white p-8'>{s}</div>
              })
              }</div>
          )
        })
      }
    </div>
  )
}

function App() {
  const [board, setBoard] = useState<GameBoard>(initial)

  return (
    <main className='flex flex-col items-center gap-4'>
      <h1 className='font-bold underline'>Tic Tac Toe</h1>
      {drawTheBoard(board)}
    </main>
  )
}

export default App
