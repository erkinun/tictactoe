// sum.test.js
import { expect, test } from "vitest";
import { BoardState, checkGame } from "./App";


test("check game returns continue when there is no winner", () => {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ] as BoardState;
  expect(checkGame(board)).toBe("continue");
});

test("check game returns winner when there is winner", () => {
  const board = [
    ["X", "X", "X"],
    ["", "", ""],
    ["", "", ""],
  ] as BoardState;
  expect(checkGame(board)).toStrictEqual({ winner: "X" });
});

test("check game returns winner when there is winner", () => {
  const board = [
    ["O", "X", "X"],
    ["", "O", ""],
    ["", "", "O"],
  ] as BoardState;
  expect(checkGame(board)).toStrictEqual({ winner: "O" });
});


