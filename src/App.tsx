import { useState } from 'react'
import './App.css'

// tictactoe game 
// players 
// state of the game 
// round mechanism 
// check at the end of each turn
// Style the game
// Think about testing
// which linter to use these days

type SlotState = 'X' | 'O' | ''

type X = 'X'
type O = 'O'

type Player = X | O
type Winner = Player

type GameOver = {
  winner: Player
}

type GameState = 'continue' | GameOver

type BoardState = Array<Array<SlotState>>

const initial: BoardState = [['', '', ''], ['', '', ''], ['', '', '']]

// TODO move these to init function and maybe test?
const ROW_COORDS = initial.map((row, index) => row.map((_, i) => [index, i]))
const colLength = initial[0].length;
let i = 0; // TODO maybe a range function
const COL_COORDS = [];
for (let i = 0; i <  colLength; i++) {
  COL_COORDS[i] = [] // TODO fix the type
  for(let rowIndex = 0; rowIndex < initial.length; rowIndex++) {
    COL_COORDS[i].push([rowIndex, i]);
  }
}

console.log({ROW_COORDS})
console.log({COL_COORDS})
const DIAGONALS = []
for (let i = 0; i < initial.length; i++) {
  DIAGONALS.push([i, i])
}
console.log({DIAGONALS})

// TODO maybe rename to something generic
function checkSlots(slots: Array<SlotState>): GameState {
  // check if row is not 3 length
  if (slots.every((s) => s === 'X')) {
    return {
      winner: 'X'
    }
  }
  else if (slots.every((s) => s=== 'O')) {
    return {
      winner: 'O'
    }
  }
  else {
    return 'continue'
  }
}
// column and diagonal can be implemented using checkRow anyway 

// TODO unit test this
function checkGame(board: BoardState) {
  // check rows
  // check columns 
  // check diagonals
  const allThingsToCheck = ROW_COORDS.concat(COL_COORDS).concat([DIAGONALS])
  console.log({allThingsToCheck})
  const slotsToCheck = allThingsToCheck.reduce((prev, current) => {
    const things = current.map(([x, y]) => {
      return board[x][y]
    })
    prev.push(things)
    return prev
  }, [])

  console.log({slotsToCheck})

  const result = slotsToCheck.map((s) => checkSlots(s)).find((r) => r !== 'continue')

  return result ? result : 'continue'
}

type BoardProps = {
  game: BoardState
  turn: Player 
  click: (row: number, column: number, player: Player) => void // TODO how to disable click for already played tiles
  gameState: GameState
}

// TODO how to make it more nicer as in google's one
// TODO fix the styling, make the board same width and height
// TODO reset button somehow
function TheBoard({ game, turn, click, gameState }: BoardProps) {
  return (
    <div>
        <div>
        {
          game.map((row, rowIndex) => {
            return (
              <div key={rowIndex} className='flex'>{
                row.map((s, columnIndex) => {
                  return <div key={columnIndex} className='border border-white p-8' onClick={() => click(rowIndex, columnIndex, turn)}>{s}</div>
                })
                }</div>
            )
          })
        }
      </div>
      {gameState === 'continue' ? (
        <div>It is {turn}'s turn</div>
      ): (
        <div>{gameState.winner} has won!</div>
      )} 
    </div>

  )
}

function useTurn(firstPlayer: Player) {
  const [turn, setTurn] = useState<Player>(firstPlayer);

  const toggleTurn = () => {
    setTurn((prev) => prev === 'X' ? 'O' : 'X')
  }

  return [turn, toggleTurn];
}

function App() {
  const [board, setBoard] = useState<BoardState>(initial)
  const [turn, toggle] = useTurn('X') as [Player, (t: Player) => void] // TODO get this from the UI

  const result = checkGame(board)
  console.log({result})

  return (
    <main className='flex flex-col items-center gap-4'>
      <h1 className='font-bold underline'>Tic Tac Toe</h1>
      <TheBoard gameState={result} game={board} turn={turn} click={(row, column, player) => {
        setBoard((prev) => {
          prev[row][column] = player
          return prev
        })
        toggle(player)
      }} />
    </main>
  )
}

export default App
