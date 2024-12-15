export const getPlayerKey = (userId: string): string => {
  return `player:${userId}`;
};

export const getPuzzleKey = (postId: string): string => {
  return `puzzle:${postId}`;
};

export const getPuzzleGuessesKey = (postId: string): string => {
  return `puzzle:${postId}:guesses`;
};

export const getPuzzleGuessCountKey = (postId: string): string => {
  return `puzzle:${postId}:guess-count`;
};
