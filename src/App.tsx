import { useState } from "react";
import "./App.css";

// tictactoe game
// Think about testing
// TODO nice to have, bold the winning slots!
// TODO do the other guys pair exercises
// TODO history of moves

type SlotState = "X" | "O" | "";

type X = "X";
type O = "O";

type Player = X | O;

type GameOver = {
  winner: Player;
};

type GameState = "continue" | GameOver;

export type BoardState = Array<Array<SlotState>>;

const initial: BoardState = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function initialiseGame() {
  // TODO move these to init function and maybe test?
  const ROW_COORDS = initial.map((row, index) => row.map((_, i) => [index, i]));
  const colLength = initial[0].length;
  const COL_COORDS: number[][][] = [];
  for (let i = 0; i < colLength; i++) {
    COL_COORDS[i] = []; // TODO fix the type
    for (let rowIndex = 0; rowIndex < initial.length; rowIndex++) {
      COL_COORDS[i].push([rowIndex, i]);
    }
  }

  const DIAGONALS: number[][][] = [[], []];

  for (let i = 0, y = initial.length - 1; i < initial.length; i++, y--) {
    DIAGONALS[0].push([i, i]);
    DIAGONALS[1].push([y, i]);
  }

  return {
    DIAGONALS,
    ROW_COORDS,
    COL_COORDS,
  };
}

const { DIAGONALS, COL_COORDS, ROW_COORDS } = initialiseGame();

function checkSlots(slots: Array<SlotState>): GameState {
  // check if row is not 3 length
  if (slots.every((s) => s === "X")) {
    return {
      winner: "X",
    };
  } else if (slots.every((s) => s === "O")) {
    return {
      winner: "O",
    };
  } else {
    return "continue";
  }
}
// column and diagonal can be implemented using checkRow anyway
// TODO unit test this
export function checkGame(board: BoardState) {
  const allThingsToCheck = ROW_COORDS.concat(COL_COORDS).concat(DIAGONALS);
  const slotsToCheck = allThingsToCheck.reduce((prev, current) => {
    const things = current.map(([x, y]) => {
      return board[x][y];
    });
    prev.push(things);
    return prev;
  }, [] as SlotState[][]);

  const result = slotsToCheck
    .map((s) => checkSlots(s))
    .find((r) => r !== "continue");

  return result ? result : "continue";
}

type BoardProps = {
  game: BoardState;
  turn: Player;
  click: (row: number, column: number, player: Player) => void;
  gameState: GameState;
  reset: () => void;
};

// TODO how to make it more nicer as in google's one
function TheBoard({ game, turn, click, gameState, reset }: BoardProps) {
  return (
    <div>
      <div className="h-72 w-72 flex flex-col">
        {game.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="flex grow">
              {row.map((s, columnIndex) => {
                return (
                  <div
                    key={columnIndex}
                    className="flex grow shrink-0 basis-0 items-center justify-center border border-white p-8"
                    onClick={() =>
                      s === "" && click(rowIndex, columnIndex, turn)
                    }
                  >
                    {s === "" ? "_" : s}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      {gameState === "continue" ? (
        <div>It is {turn}'s turn</div>
      ) : (
        <div>
          <div>{gameState.winner} has won!</div>
        </div>
      )}
      <button onClick={reset}>Reset</button>
    </div>
  );
}

function useTurn(firstPlayer: Player) {
  const [turn, setTurn] = useState<Player>(firstPlayer);

  const toggleTurn = () => {
    setTurn((prev) => (prev === "X" ? "O" : "X"));
  };

  return [turn, toggleTurn];
}

function App() {
  const [board, setBoard] = useState<BoardState>(initial);
  const [turn, toggle] = useTurn("X") as [Player, (t: Player) => void]; // TODO get this from the UI

  const result = checkGame(board);

  const handleReset = () => {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
  };

  return (
    <main className="flex flex-col items-center gap-4">
      <h1 className="font-bold underline">Tic Tac Toe</h1>
      <TheBoard
        gameState={result}
        game={board}
        turn={turn}
        click={(row, column, player) => {
          setBoard((prev) => {
            prev[row][column] = player;
            return prev;
          });
          toggle(player);
        }}
        reset={handleReset}
      />
    </main>
  );
}

export default App;
