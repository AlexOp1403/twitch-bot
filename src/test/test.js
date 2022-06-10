import {questionQuiz} from "../quiz";

test("giving wrong answer to question", () => {
    const res = questionQuiz("Lewis Hami99lton");
    expect(res).toBe(0);
    }
)