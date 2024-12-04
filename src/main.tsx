import { Devvit, useState } from "@devvit/public-api";

import { Menu } from "@/pages/Menu.js";
import { Create } from "@/pages/Create.js";

import { Page, PageComponent, State } from "@/types/page.js";
import { Topic } from "@shared/types/topic.js";

Devvit.configure({
  redditAPI: true,
});

Devvit.addMenuItem({
  label: "Add Emoji Game post",
  location: "subreddit",
  forUserType: "moderator",
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    const subreddit = await reddit.getCurrentSubreddit();
    await reddit.submitPost({
      title: "Main emoji game post",
      subredditName: subreddit.name,
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">Loading ...</text>
        </vstack>
      ),
    });
    ui.showToast({ text: "Created post!" });
  },
});

const PAGE_TO_PAGE_COMPONENT: Partial<Record<Page, PageComponent>> = {
  [Page.MENU]: Menu,
  [Page.CREATE]: Create,
}

// TODO: Replace with a real not found page
const NOT_FOUND_PAGE_COMPONENT: PageComponent = Menu

const renderPage = (page: Page, context: Devvit.Context, state: State): JSX.Element => {
  const component = PAGE_TO_PAGE_COMPONENT[page] ?? NOT_FOUND_PAGE_COMPONENT
  return component(context, state)
};

Devvit.addCustomPostType({
  name: "Emoji Game",
  height: "tall",
  render: (context) => {
    // console.log(context.uiEnvironment)
    // console.log(context.dimensions)
    console.log(context.debug.metadata)

    const [page, setPage] = useState<Page>(Page.MENU);
    const [createTopic, setCreateTopic] = useState<Topic | null>(null)

    return renderPage(page, context, {
      page,
      setPage,
    })
  },
});

export default Devvit;
