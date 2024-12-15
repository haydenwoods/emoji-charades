import { TOPICS } from "@shared/constants/topics";

import { Message, InitialDataEvent } from "@shared/types/message";

const IS_PUZZLE = true;
const IS_PUZZLE_SOLVED = true;

const sendMessage = (message: Message) => {
  window.postMessage({
    type: "devvit-message",
    data: {
      message,
    },
  });
};

const timeout = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const onMountedEvent = () => {
  const now = new Date().toISOString();
  const topic = TOPICS.find(({ name }) => name === "Parks and Recreation") ?? TOPICS[0];

  const data: InitialDataEvent["data"] = {
    playerXP: 24,
    playerRank: 17593,
  };

  data.user = {
    id: "t2_12345",
    username: "Spleentacular",
  };

  if (IS_PUZZLE) {
    data.puzzle = {
      id: "t3_12345",
      topic,
      clue: ["📺", "🛝", "➕", "🏃"],
      createdBy: data.user.id,
      createdAt: now,
    };
  }

  data.player = {
    id: data.user.id,
    username: "Spleentacular",
    playedPuzzles: [],
    createdAt: now,
  };

  if (IS_PUZZLE_SOLVED && data.puzzle) {
    data.player.playedPuzzles.push({
      id: data.puzzle.id,
      guesses: [],
      createdAt: now,
      completedAt: now,
    });

    data.puzzleGuesses = [
      { guess: "Parks and Recreation", count: 1892, percentage: 72, rank: 1 },
      { guess: "The Office", count: 482, percentage: 12, rank: 2 },
      { guess: "Community", count: 352, percentage: 8, rank: 3 },
      { guess: "Friends", count: 174, percentage: 4, rank: 4 },
      { guess: "Mr Robot", count: 24, percentage: 1, rank: 5 },
    ];
  }

  sendMessage({
    type: "INITIAL_DATA_EVENT",
    data,
  });
};

export const mockMessages = () => {
  window.addEventListener("message", async (event) => {
    const message = event.data as Message;

    switch (message.type) {
      case "MOUNTED_EVENT":
        return onMountedEvent();
      case "CREATE_REQUEST":
        await timeout(2000);
        return sendMessage({
          type: "CREATE_RESPONSE",
        });
      case "LEADERBOARD_REQUEST":
        await timeout(1500);
        return sendMessage({
          type: "LEADERBOARD_RESPONSE",
          data: {
            leaderboard: [
              { username: "Spleentacular", xp: 6392, rank: 1 },
              { username: "Richard", xp: 4820, rank: 2 },
              { username: "Jared", xp: 4530, rank: 3 },
              { username: "Erlich", xp: 3498, rank: 4 },
              { username: "Dinesh", xp: 3222, rank: 5 },
              { username: "Gilfoyle", xp: 2982, rank: 6 },
              { username: "Monica", xp: 2430, rank: 7 },
              { username: "Russ", xp: 1454, rank: 8 },
              { username: "Peter", xp: 820, rank: 9 },
              { username: "Ron", xp: 566, rank: 10 },
            ],
          },
        });
    }
  });
};
