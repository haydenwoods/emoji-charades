import { InitialDataEvent, MountedEvent } from "@shared/types/message.js";

import { sendMessage } from "@/utils/message.js";
import { getUserRank, getUserXP } from "@/utils/user-xp.js";
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

  const _getUserXP = async () => {
    data.playerXP = await getUserXP(context.redis, user.username);
  };

  const _getUserRank = async () => {
    data.playerRank = await getUserRank(context.redis, user.username);
  };

  const getPuzzle = async () => {
    if (!postId) return;
    data.puzzle = await getObject<Puzzle>(context.redis, getPuzzleKey(postId));
  };

  const _getPuzzleSummary = async () => {
    if (!postId) return;
    data.puzzleSummary = await getPuzzleSummary(context.redis, postId);
  };

  await Promise.all([_getUserXP(), _getUserRank(), getPlayer(), getPuzzle(), _getPuzzleSummary()]);

  sendMessage(context, {
    type: "INITIAL_DATA_EVENT",
    data,
  });
};
