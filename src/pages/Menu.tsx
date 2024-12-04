import { Devvit } from "@devvit/public-api";

import { Page, PageComponent } from "@/types/page.js";

export const Menu: PageComponent = (context, state) => {
  const onCreatePress = () => {
    state.setPage(Page.CREATE)
  }

  return (
    <vstack height="100%" width="100%" gap="large" alignment="center middle"> 
      <text style="heading" size="xxlarge" alignment="center">
        Emoji Game
      </text>

      <vstack gap="small" minWidth="33%">
        <button appearance="primary" onPress={onCreatePress}>
          Create
        </button>

        <button appearance="secondary">Leaderboard</button>
        <button appearance="secondary">What is this?</button>
        <button appearance="secondary">Settings</button>
      </vstack>
    </vstack>
  )
};  