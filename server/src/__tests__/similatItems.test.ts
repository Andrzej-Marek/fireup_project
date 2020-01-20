import { generateSimilarItems } from "../utils/generateSimilarItems";

describe("Similat Items function", () => {
  it("Should return 10 lenght similar words array", async () => {
    let similarWordsArray = await generateSimilarItems("Cars", 10);

    expect(similarWordsArray).toBeDefined();
    expect(similarWordsArray.length).toBe(10);
    similarWordsArray = await generateSimilarItems("Cars", 5);

    expect(similarWordsArray).toBeDefined();
    expect(similarWordsArray.length).toBe(5);
  });
});
