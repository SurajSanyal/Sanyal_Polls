import React from "react";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import Nav from "../components/Nav";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

const mockStore = configureStore([]);

describe("Nav Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      authedUser: "sarahedo",
    });
  });

  it("will display all expected links", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Nav />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId("home")).toBeInTheDocument();
    expect(screen.getByTestId("add-poll")).toBeInTheDocument();
    expect(screen.getByTestId("leaderboard")).toBeInTheDocument();
    expect(screen.getByTestId("logout")).toBeInTheDocument();
  });
});
