import App from "./App.tsx";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

test("renders the App correctly with title and turn and reset button", async () => {
  render(<App />);

  expect(screen.getByText("Tic Tac Toe")).toBeDefined();
  expect(screen.getByText(`It is X's turn`)).toBeDefined();
});
