import Box from "@material-ui/core/Box";

import { styled } from "@material-ui/core/styles";

const PostContainer = styled(Box)({
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  backdropFilter: "blur(12px)",
  borderRadius: "0.75rem",
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  margin: " 1rem auto 0",
  width: "100%",
  position: "relative",
});

export { PostContainer };
