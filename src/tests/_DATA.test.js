import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";

describe("_saveQuestion", () => {
  it("will return saved question w/ all fields filled", async () => {
    var questionInput = {
      optionOneText: "Option 1",
      optionTwoText: "Option 2",
      author: "Author",
    };

    var question = await _saveQuestion(questionInput);

    // Check expected fields
    expect(question).toHaveProperty("id");
    expect(question).toHaveProperty("timestamp");
    expect(question.author).toBe(questionInput.author);
    expect(question.optionOne).toEqual({
      votes: [],
      text: questionInput.optionOneText,
    });
    expect(question.optionTwo).toEqual({
      votes: [],
      text: questionInput.optionTwoText,
    });
  });

  it("will reject an invalid question input", async () => {
    var invalidQuestion = {
      optionOneText: null,
      optionTwoText: null,
      author: null,
    };

    await expect(_saveQuestion(invalidQuestion)).rejects.toEqual(
      `Please provide optionOneText, optionTwoText, and author`
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("will return answer w/ expected fields", async () => {
    var answerInput = {
      authedUser: "sarahedo",
      qid: "loxhs1bqm25b708cmbf3g",
      answer: "optionOne",
    };

    var answer = await _saveQuestionAnswer(answerInput);
    // @todo: why is "answer" just "true?"
    // Do I need a ".then((res))"?
    console.log(answer);
    // @todo check fields...idek what fields to check
  });

  it("will reject an invalid answer input", async () => {
    var invalidAnswer = {
      authedUser: null,
      qid: null,
      answer: null,
    };

    await expect(_saveQuestionAnswer(invalidAnswer)).rejects.toEqual(
      `Please provide authedUser, qid, and answer`
    );
  });
});
