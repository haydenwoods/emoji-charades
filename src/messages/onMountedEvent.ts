import { InitialDataEvent, MountedEvent } from "@shared/types/message.js";

import { sendMessage } from "@/utils/message.js";
import { getPlayerRank, getPlayerXP } from "@/utils/player-xp.js";
import { getObject } from "@/utils/db/index.js";
import { getPlayerKey, getPuzzleKey } from "@/utils/db/keys.js";

import { MessageHandler } from "@/types/message.js";
import { Puzzle } from "@shared/types/db/puzzle.js";
import { Player } from "@shared/types/db/player.js";
import { getPuzzleSummary } from "@/utils/puzzle-summary.js";

export const onMountedEvent: MessageHandler<MountedEvent> = async ({ context, app }) => {
  app.setWebviewMounted(true);

  const { postId, userId } = context;
  if (!userId) return;

  const user = await context.reddit.getUserById(userId);
  if (!user) return;

  const data: InitialDataEvent["data"] = {
    user,
  };

  const getPlayer = async () => {
    data.player = await getObject<Player>(context.redis, getPlayerKey(userId));
  };

  const _getPlayerXP = async () => {
    data.playerXP = await getPlayerXP(context.redis, user.id);
  };

  const _getPlayerRank = async () => {
    data.playerRank = await getPlayerRank(context.redis, user.id);
  };

  const getPuzzle = async () => {
    if (!postId) return;

    data.puzzle = await getObject<Puzzle>(context.redis, getPuzzleKey(postId));
    if (!data.puzzle) return;

    const completedPuzzleIds = data.player?.playedPuzzles
      .filter(({ completedAt }) => Boolean(completedAt))
      .map(({ id }) => id);
    const isPuzzleCompleted = completedPuzzleIds?.includes(data.puzzle.id);

    if (isPuzzleCompleted) {
      data.puzzleSummary = await getPuzzleSummary(context.redis, postId);
    }
  };

  await Promise.all([_getPlayerXP(), _getPlayerRank(), getPlayer()]);
  await getPuzzle();

  sendMessage(context, {
    type: "INITIAL_DATA_EVENT",
    data,
  });
};
