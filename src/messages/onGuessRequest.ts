import { sendMessage } from "@/utils/message.js";
import { setObject } from "@/utils/db.js";

import { GuessRequest } from "@shared/types/message.js";
import { GuessData } from "@shared/types/guess-data.js";
import { MessageHandler } from "@/types/message.js";

export const onGuessRequest: MessageHandler<GuessRequest> = async ({ message, context }) => {
  const { userId, postId } = context;
  if (!userId || !postId) return;

  const { guess } = message.data;

  const now = new Date();
  const guessId = `${userId}-${now.toISOString()}`;

  await setObject<GuessData>(context.redis, `post:${postId}:guess${guessId}`, {
    guess,
    correct: true,
    createdBy: userId,
    createdAt: now.toISOString(),
  });

  sendMessage(context, {
    type: "GUESS_RESPONSE",
    data: {
      correct: true,
    },
  });
};
