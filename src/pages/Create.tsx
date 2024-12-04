import { Devvit, useForm, useState } from "@devvit/public-api";

import { getRandomTopic } from "@shared/utils/topics.js";

import { Topic } from "@shared/types/topic.js";
import { PageComponent } from "@/types/page.js";
import { CATEGORY_TO_NAME } from "@shared/constants/categories.js";

export const Create: PageComponent = (context, state) => {
  const [topic, setTopic] = useState<Topic>(getRandomTopic());

  const form = useForm({
    fields: [
      {
        type: "paragraph",
        name: "emojis",
        label: "Emojis",
        helpText: "For Mac users: Fn + E will open the Emoji Viewer."
      }
    ],
  }, (data) => {
    console.log(data)
  });

  const onNewTopicPressed = () => {
    const newTopic = getRandomTopic({ exclude: [topic] })
    setTopic(newTopic)
  };

  const onStartPressed = () => {
    context.ui.showForm(form)
  }

  return (
    <vstack height="100%" width="100%" gap="large" alignment="center middle">
      <vstack alignment="center" gap="small">
        <text style="body" size="xlarge" alignment="center">
          Your topic is a {CATEGORY_TO_NAME[topic.category]}
        </text>
        <text style="heading" size="xxlarge" alignment="center">
          {topic.name}
        </text>
      </vstack>

      <hstack alignment="center" gap="small">
        <button appearance="secondary" onPress={onNewTopicPressed}>
          I don't know it
        </button>
        <button appearance="primary" onPress={onStartPressed}>
          Let's start!
        </button>
      </hstack>
    </vstack>
  )
};  