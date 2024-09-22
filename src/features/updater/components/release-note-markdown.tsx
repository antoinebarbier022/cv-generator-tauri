import { Link, List, ListItem, Stack, Typography } from '@mui/joy'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Props {
  content: string | undefined
}
export const RealeaseNoteMarkdown = ({ content }: Props) => {
  const level = 'body-sm'
  const textColor = 'text.tertiary'
  const fontWeight = 300

  return (
    <Stack maxHeight={'10lh'} overflow={'auto'}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <Link
              level={level}
              color="primary"
              href={href}
              underline={'always'}
              slotProps={{
                root: {
                  target: '_blank'
                }
              }}
            >
              {children}
            </Link>
          ),
          p: ({ children }) => (
            <Typography
              level={level}
              textColor={textColor}
              fontWeight={fontWeight}
              whiteSpace={'pre-line'}
            >
              {children}
            </Typography>
          ),
          del: ({ children }) => (
            <Typography
              level={level}
              textColor={textColor}
              fontWeight={fontWeight}
              sx={{ textDecoration: 'line-through' }}
            >
              {children}
            </Typography>
          ),
          i: ({ children }) => (
            <Typography
              level={level}
              textColor={textColor}
              fontWeight={fontWeight}
              fontStyle={'italic'}
            >
              {children}
            </Typography>
          ),
          strong: ({ children }) => (
            <Typography level={level} textColor={textColor} fontWeight={'500'}>
              {children}
            </Typography>
          ),

          h1: ({ children }) => <Typography level={'title-md'}>{children}</Typography>,
          h2: ({ children }) => <Typography level={'title-sm'}>{children}</Typography>,
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          table: 'p',
          ol: 'ul',
          b: 'strong',
          em: 'i',
          ul: ({ children }) => (
            <List
              sx={{
                width: '100%',
                listStyleType: 'disc',
                p: 0,
                pl: 2,

                '& .MuiListItem-root': {
                  display: 'list-item',
                  '--ListItem-minHeight': 0
                },
                paddingBottom: 1
              }}
            >
              {children}
            </List>
          ),
          li: ({ children }) => (
            <ListItem component={Typography} level={level} sx={{ m: 0, p: 0, ml: 2 }}>
              <Typography textColor={textColor}>{children}</Typography>
            </ListItem>
          )
        }}
      >
        {content}
      </Markdown>
    </Stack>
  )
}
