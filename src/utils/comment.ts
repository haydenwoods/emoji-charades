import { Player } from "@shared/types/db/player.js";

export const getPostCompletedCommentText = (
  playedPost: Player["playedPuzzles"][number],
): string => {
  if (playedPost.guesses.length === 1) {
    return "I got it correct on my **first guess!**";
  }

  const incorrectGuesses = playedPost.guesses.filter(({ correct }) => !correct);

  let incorrectGuessesString = "";
  if (incorrectGuesses.length === 1) {
    incorrectGuessesString = `My only guess was *"${incorrectGuesses[0]}"*`;
  } else {
    incorrectGuessesString = incorrectGuesses.reduce<string>((acc, { input }, index) => {
      const isFirst = index === 0;
      const isLast = index === incorrectGuesses.length - 1;
      if (isLast) {
        return acc + ` and *"${input}"*`;
      } else {
        return acc + `${isFirst ? "" : ", "}*"${input}"*`;
      }
    }, "My guesses were ");
  }

  return `I got it correct after **${incorrectGuesses.length} incorrect guesses!** ${incorrectGuessesString}.`;
};
