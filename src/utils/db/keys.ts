export const getPlayerKey = (userId: string) => {
  return `player:${userId}`;
};

export const getPuzzleKey = (postId: string) => {
  return `puzzle:${postId}`;
};
