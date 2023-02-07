import React from "react";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import Leaderboard from "../components/Leaderboard";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import kirby_brown from "../assets/kirby_brown.png";
import kirby_orange from "../assets/kirby_orange.png";
import kirby_green from "../assets/kirby_green.png";
import kirby_purple from "../assets/kirby_purple.png";

const mockStore = configureStore([]);

describe("Leaderboard Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      users: {
        sarahedo: {
          id: "sarahedo",
          password: "password123",
          name: "Sarah Edo",
          avatarURL: kirby_brown,
          answers: {
            "8xf0y6ziyjabvozdd253nd": "optionOne",
            "6ni6ok3ym7mf1p33lnez": "optionOne",
            am8ehyc8byjqgar0jgpub9: "optionTwo",
            loxhs1bqm25b708cmbf3g: "optionTwo",
          },
          questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
        },
        tylermcginnis: {
          id: "tylermcginnis",
          password: "abc321",
          name: "Tyler McGinnis",
          avatarURL: kirby_green,
          answers: {
            vthrdm985a262al8qx3do: "optionOne",
            xj352vofupe1dqz9emx13r: "optionTwo",
          },
          questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
        },
        mtsamis: {
          id: "mtsamis",
          password: "xyz123",
          name: "Mike Tsamis",
          avatarURL: kirby_orange,
          answers: {
            xj352vofupe1dqz9emx13r: "optionOne",
            vthrdm985a262al8qx3do: "optionTwo",
            "6ni6ok3ym7mf1p33lnez": "optionOne",
          },
          questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
        },
        zoshikanlu: {
          id: "zoshikanlu",
          password: "pass246",
          name: "Zenobia Oshikanlu",
          avatarURL: kirby_purple,
          answers: {
            xj352vofupe1dqz9emx13r: "optionOne",
          },
          questions: [],
        },
      },
    });
  });

  it("will display the correct name/qCount/aCount for each user", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Leaderboard />
        </MemoryRouter>
      </Provider>
    );

    // Sarah's values
    expect(screen.getByTestId("sarahedo-name").textContent).toEqual(
      "Sarah Edo"
    );
    expect(screen.getByTestId("sarahedo-questions").textContent).toEqual("2");
    expect(screen.getByTestId("sarahedo-answers").textContent).toEqual("4");

    // Tyler's Values
    expect(screen.getByTestId("tylermcginnis-name").textContent).toEqual(
      "Tyler McGinnis"
    );
    expect(screen.getByTestId("tylermcginnis-questions").textContent).toEqual(
      "2"
    );
    expect(screen.getByTestId("tylermcginnis-answers").textContent).toEqual(
      "2"
    );

    // Mike's Values
    expect(screen.getByTestId("mtsamis-name").textContent).toEqual(
      "Mike Tsamis"
    );
    expect(screen.getByTestId("mtsamis-questions").textContent).toEqual("2");
    expect(screen.getByTestId("mtsamis-answers").textContent).toEqual("3");

    // Zenobia's Values
    expect(screen.getByTestId("zoshikanlu-name").textContent).toEqual(
      "Zenobia Oshikanlu"
    );
    expect(screen.getByTestId("zoshikanlu-questions").textContent).toEqual("0");
    expect(screen.getByTestId("zoshikanlu-answers").textContent).toEqual("1");
  });

  it("will match the snapshot", () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    var component = render(
      <Provider store={store}>
        <MemoryRouter>
          <Leaderboard />
        </MemoryRouter>
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });
});
