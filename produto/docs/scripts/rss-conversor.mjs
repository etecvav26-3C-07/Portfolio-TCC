

import Parser from 'rss-parser'
import fs from 'fs'
import translate from 'google-translate-api-x'

const parser = new Parser()

async function traduzir(texto) {
  try {
    const res = await translate(texto || '', {
      to: 'pt'
    })

    return res.text
  } catch {
    return texto
  }
}

async function gerarFeed(nome, url) {
  try {
    console.log(`Baixando ${nome}...`)

    const feed = await parser.parseURL(url)

    const noticias = []

    for (const item of feed.items.slice(0, 10)) {
      const titulo =
        await traduzir(item.title)

      const conteudo =
        await traduzir(
          item.contentSnippet ||
          item.content ||
          item.description ||
          'Sem descrição'
        )

      noticias.push({
        title: titulo,
        link: item.link,
        date:
          item.pubDate ||
          item.isoDate ||
          'Sem data',

        content: conteudo
      })
    }

    fs.mkdirSync('./public', {
      recursive: true
    })

    fs.writeFileSync(
      `./public/${nome}.json`,
      JSON.stringify(noticias, null, 2)
    )

    console.log(`${nome}.json gerado!`)
  } catch (err) {
    console.log(`Erro em ${nome}`)
    console.log(err.message)
  }
}

await gerarFeed(
  'vulkan-news',
  'https://www.khronos.org/feeds/vulkan_news_feed'
)

await gerarFeed(
  'opengl-news',
  'https://www.gamingonlinux.com/article_rss.php'
)

await gerarFeed(
  'blender-news',
  'https://code.blender.org/feed/'
)

console.log('Feeds finalizados!')
