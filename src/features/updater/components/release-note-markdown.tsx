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
    <Stack maxHeight={'10lh'} sx={{ overflowY: 'scroll' }}>
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
              pb={1}
            >
              {children}
            </Typography>
          ),
          del: ({ children }) => (
            <Typography
              level={level}
              textColor={textColor}
              fontWeight={fontWeight}
              whiteSpace={'pre-wrap'}
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
              whiteSpace={'pre-wrap'}
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

          h1: ({ children }) => <Typography level={'title-sm'}>{children}</Typography>,
          h2: ({ children }) => <Typography level={'title-sm'}>{children}</Typography>,
          h3: ({ children }) => <Typography level={'title-sm'}>{children}</Typography>,
          h4: ({ children }) => <Typography level={'title-sm'}>{children}</Typography>,
          h5: ({ children }) => <Typography level={'title-sm'}>{children}</Typography>,
          h6: ({ children }) => <Typography level={'title-sm'}>{children}</Typography>,
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
            <ListItem
              component={Typography}
              level={level}
              textColor={textColor}
              fontWeight={fontWeight}
              sx={{ m: 0, p: 0, ml: 1 }}
            >
              {children}
            </ListItem>
          )
        }}
      >
        {content}
      </Markdown>
    </Stack>
  )
}
