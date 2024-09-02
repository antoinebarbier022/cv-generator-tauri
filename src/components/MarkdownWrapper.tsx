import {
  Link,
  List,
  ListItem,
  Table,
  Typography,
  TypographySystem,
} from "@mui/joy";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownWrapperProps {
  textColor?: string;
  titleColor?: string;
  level?: keyof TypographySystem | "inherit" | undefined;
  paragraphSpace?: number | string;
  content: string;
}
export const MarkdownWrapper = ({
  textColor = "currentColor",
  titleColor = "currentColor",
  level = "inherit",
  paragraphSpace: paragraphSpace = 2,
  content,
}: MarkdownWrapperProps) => {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children }) => (
          <Link
            level={level}
            color="primary"
            href={href}
            underline={"always"}
            slotProps={{
              root: {
                target: "_blank",
              },
            }}
          >
            {children}
          </Link>
        ),
        p: ({ children }) => (
          <Typography
            level={level}
            textColor={textColor}
            whiteSpace={"pre-line"}
            paddingBottom={paragraphSpace}
          >
            {children}
          </Typography>
        ),
        del: ({ children }) => (
          <Typography
            level={level}
            textColor={textColor}
            sx={{ textDecoration: "line-through" }}
          >
            {children}
          </Typography>
        ),
        em: ({ children }) => (
          <Typography level={level} textColor={textColor} fontStyle={"italic"}>
            {children}
          </Typography>
        ),
        i: ({ children }) => (
          <Typography level={level} textColor={textColor} fontStyle={"italic"}>
            {children}
          </Typography>
        ),
        strong: ({ children }) => (
          <Typography level={level} textColor={textColor} fontWeight={"500"}>
            {children}
          </Typography>
        ),
        b: ({ children }) => (
          <Typography level={level} textColor={textColor} fontWeight={"bold"}>
            {children}
          </Typography>
        ),
        h1: ({ children }) => (
          <Typography
            level={"title-lg"}
            textColor={titleColor || textColor}
            fontWeight={"600"}
          >
            {children}
          </Typography>
        ),
        h2: ({ children }) => (
          <Typography
            level={"title-md"}
            textColor={titleColor || textColor}
            fontWeight={"600"}
          >
            {children}
          </Typography>
        ),
        h3: ({ children }) => (
          <Typography
            level={"title-sm"}
            textColor={titleColor || textColor}
            fontWeight={"600"}
          >
            {children}
          </Typography>
        ),
        h4: "h3",
        h5: "h3",
        h6: "h3",
        table: ({ children }) => <Table size="sm">{children}</Table>,
        ol: ({ children }) => (
          <List
            sx={{
              width: "100%",
              ml: 2,
              listStyleType: "decimal",
              "& .MuiListItem-root": {
                display: "list-item",
              },
              paddingBottom: 1,
            }}
          >
            {children}
          </List>
        ),
        ul: ({ children }) => (
          <List
            sx={{
              width: "100%",
              listStyleType: "disc",
              ml: 2,
              p: 0,
              "& .MuiListItem-root": {
                display: "list-item",
                "--ListItem-minHeight": 0,
              },
              paddingBottom: 1,
            }}
          >
            {children}
          </List>
        ),
        li: ({ children }) => (
          <ListItem
            component={Typography}
            level={level}
            sx={{ m: 0, p: 0, ml: 2 }}
          >
            <Typography textColor={textColor}>{children}</Typography>
          </ListItem>
        ),
      }}
    >
      {content}
    </Markdown>
  );
};
