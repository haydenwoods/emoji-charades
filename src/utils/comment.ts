import { DBUser } from "@shared/types/db/user.js";

export const getPostCompletedCommentText = (playedPost: DBUser["playedPosts"][number]): string => {
  const guessCount = playedPost.guesses.length;

  if (guessCount === 1) {
    return "I got it correct on my first guess!";
  }

  const guessInputList = playedPost.guesses.reduce<string>((acc, { input }, index) => {
    const isFirst = index === 0;
    const isLast = index === playedPost.guesses.length - 1;
    if (isLast) {
      return acc + ` and *"${input}"*`;
    } else {
      return acc + `${isFirst ? "" : ", "}*"${input}"*`;
    }
  }, "");

  return `I got it correct after **${guessCount} guesses!** My guesses were ${guessInputList}.`;
};
