
import Parser from 'rss-parser'
import fs from 'fs'

const parser = new Parser()

const feed = await parser.parseURL(
  'https://www.khronos.org/feeds/vulkan_news_feed'
)

const noticias = feed.items.map(item => ({
  title: item.title,
  link: item.link,
  date: item.pubDate,
  content:
    item.contentSnippet ||
    item.content ||
    item.description
}))

fs.mkdirSync('./docs/public', { recursive: true })

fs.writeFileSync(
  './docs/public/noticias.json',
  JSON.stringify(noticias, null, 2)
)

console.log('RSS convertido para JSON!')
