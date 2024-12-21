import { Player } from "@shared/types/db/player.js";
import { Puzzle } from "@shared/types/db/puzzle.js";

export const getPlayerCompletedPuzzleIds = (player: Player) => {
  const completedPuzzles = player.playedPuzzles.filter(({ completedAt }) => Boolean(completedAt));
  const completedPuzzleIds = completedPuzzles.map(({ id }) => id);
  return completedPuzzleIds;
};

export const isPlayerPuzzleCompleted = (player: Player, puzzleId: Puzzle["id"]): boolean => {
  const completedPuzzleIds = getPlayerCompletedPuzzleIds(player);
  const isPuzzleCompleted = completedPuzzleIds.includes(puzzleId);
  return isPuzzleCompleted;
};
