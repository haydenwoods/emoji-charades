import { Devvit } from "@devvit/public-api";

export const Loading = () => {
  return (
    <vstack
      height="100%"
      width="100%"
      alignment="middle center"
      backgroundColor="#f5f5f5"
      gap="small"
    >
      <image url="loader.gif" imageWidth={72} imageHeight={72} description="Loading spinner GIF" />
      <text
        style="body"
        size="xxlarge"
        color="#171717"
        alignment="middle center"
        selectable={false}
      >
        Loading
      </text>
    </vstack>
  );
};
