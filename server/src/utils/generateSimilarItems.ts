import { SimilarWords } from "./../types/SimilarWordsType";
import { Item } from "./../models/Item";
import axios from "axios";
import { SIMILAR_WORDS_ENDPOINT } from "./../config/config";

export const generateSimilarItems = async (
  categoryName: string,
  limit: number
) => {
  try {
    const categoryNameToUrlFormat = categoryName.replace(" ", "+");
    const response = await axios.get(
      `${SIMILAR_WORDS_ENDPOINT}${categoryNameToUrlFormat}`
    );
    const arrayWithNItems = await response.data.slice(0, limit);

    const arrayWithIds: string[] = [];

    arrayWithNItems.forEach(async (el: SimilarWords) => {
      const newItem = new Item({ itemName: el.word });
      arrayWithIds.push(newItem.id);
      await newItem.save();
    });

    return arrayWithIds;
  } catch (err) {
    throw new Error(err.message);
  }
};
