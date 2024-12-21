import { Devvit, Context, Post } from "@devvit/public-api";

import { Loading } from "@/components/Loading.js";

export const createMenuPost = async (
  reddit: Context["reddit"],
  subredditName: string,
): Promise<Post> => {
  return reddit.submitPost({
    title: "Emoji Charades",
    subredditName,
    preview: <Loading />,
  });
};
