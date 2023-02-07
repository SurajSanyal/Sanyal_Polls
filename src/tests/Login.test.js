import React from "react";
import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../components/Login";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

const mockStore = configureStore([]);

describe("Login Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      users: "sarahedo",
    });
  });

  it("will display username/password/submit elements", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId("username")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("submit")).toBeInTheDocument();
  });

  it("will change UI based on text input", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    // Enter a username
    let input = screen.getByTestId("username");
    fireEvent.change(input, { target: { value: "testusername" } });

    // Check UI
    expect(screen.getByTestId("username").value).toEqual("testusername");
  });

  it("will display error message for invalid login", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    // Enter a username
    let input = screen.getByTestId("username");
    fireEvent.change(input, { target: { value: "testusername" } });

    // Enter a password
    input = screen.getByTestId("password");
    fireEvent.change(input, { target: { value: "invalidpass" } });

    // ID and click Submit Button
    var submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);

    expect(screen.getByTestId("error-msg")).toBeInTheDocument();
  });
});
