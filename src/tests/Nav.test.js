import { render, screen } from "@testing-library/react";
import { Nav } from "../components/Nav";

// @todo maybe mock store like this?
// https://medium.com/hackernoon/unit-testing-redux-connected-components-692fa3c4441c

describe("Nav", () => {
  let wrapper;
  const mockFunc = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<Nav authedUser={mockFunc} />);
  });

  it("will display all expected links", async () => {
    render(<Nav authedUser="sarahedo" />);

    expect(screen.getByTestId("home")).toBeInTheDocument();
    expect(screen.getByTestId("add-poll")).toBeInTheDocument();
    expect(screen.getByTestId("leaderboard")).toBeInTheDocument();
    expect(screen.getByTestId("logout")).toBeInTheDocument();
  });
});
