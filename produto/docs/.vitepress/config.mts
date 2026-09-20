import { defineConfig } from 'vitepress'
import {
  commitRef,
  feedback,
  meta,
  nav,
  search,
  sidebar,
  socialLinks
} from './constants.mts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: meta.title,
  description: meta.description,
  titleTemplate: ':title • Render Index',
  lang: 'pt-BR',
  lastUpdated: true,
  cleanUrls: true,
  appearance: true,
  ignoreDeadLinks: true,

  sitemap: {
    hostname: meta.hostname
  },

  head: [
    ['meta', { name: 'theme-color', content: '#38bdf8' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'pt-BR' }],
    ['link', { rel: 'icon', href: '/box.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'keywords', content: meta.keywords.join(', ') }],
    // Redirect to main site if embedded in iframe
    [
      'script',
      {},
      `(function(){if(window.self!==window.top){window.top.location=window.location.href;}})()`
    ]
  ],

  themeConfig: {
    logo: '/box.svg',

    search,
    nav,
    sidebar,
    socialLinks,

    outline: {
      level: 'deep',
      label: 'Nesta página'
    },

    editLink: {
      pattern:
        'https://github.com/etecvav26-3C-07/Portfolio-TCC/edit/main/produto/docs/:path',
      text: '📝 Editar esta página no GitHub'
    },

    footer: {
      message: `${feedback} (rev: ${commitRef})`,
      copyright: `© ${new Date().getFullYear()} Grupo 07 · Etec Vasco Antonio Venchiarutti`
    },

    docFooter: {
      prev: 'Página anterior',
      next: 'Próxima página'
    },

    lastUpdated: {
      text: 'Última atualização'
    },

    darkModeSwitchLabel: 'Aparência',
    returnToTopLabel: 'Voltar ao topo',
    sidebarMenuLabel: 'Menu'
  }
})
