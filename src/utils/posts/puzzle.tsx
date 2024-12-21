import { Devvit, Context, Post } from "@devvit/public-api";

import { Loading } from "@/components/Loading.js";

import { PUZZLE_FLAIR_ID } from "@/constants/flairs.js";

export const createPuzzlePost = async (
  reddit: Context["reddit"],
  subredditName: string,
): Promise<Post> => {
  return await reddit.submitPost({
    title: "What do these emojis represent?",
    subredditName,
    preview: <Loading />,
    flairId: PUZZLE_FLAIR_ID,
  });
};
