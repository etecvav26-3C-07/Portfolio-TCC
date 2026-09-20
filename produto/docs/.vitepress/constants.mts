import type { DefaultTheme } from 'vitepress'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
export const meta = {
  title: 'Render Index',
  description:
    'Índice curado de recursos sobre computação gráfica, renderização 3D, OpenGL, Vulkan, Blender e WebGL.',
  hostname: 'https://etecvav26-3C-07.github.io',
  keywords: [
    'computação gráfica',
    'renderização 3D',
    'OpenGL',
    'Vulkan',
    'WebGL',
    'WebGPU',
    'Blender',
    'ray tracing',
    'shaders',
    'GLSL',
    'TCC',
    'Etec'
  ]
}

// ---------------------------------------------------------------------------
// Commit ref (shown in footer when available)
// ---------------------------------------------------------------------------
export const commitRef =
  process.env.CF_PAGES_COMMIT_SHA?.slice(0, 7) ?? 'dev'

// ---------------------------------------------------------------------------
// Footer feedback text
// ---------------------------------------------------------------------------
export const feedback =
  'Encontrou um link morto ou quer contribuir? Abra uma issue no GitHub!'

// ---------------------------------------------------------------------------
// Top navigation bar
// ---------------------------------------------------------------------------
export const nav: DefaultTheme.NavItem[] = [
  { text: '🏠 Início', link: '/' },
  { text: '📖 Guia', link: '/guia' },
  { text: '📰 Notícias', link: '/noticias' }
]

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------
export const sidebar: DefaultTheme.SidebarItem[] = [
  {
    text: '📁 Principal',
    items: [
      { text: '🏠 Início', link: '/' },
      { text: '📖 Guia para iniciantes', link: '/guia' },
      { text: '📰 Notícias', link: '/noticias' },
      { text: '📱 Renderização Mobile', link: '/api-examples' }
    ]
  },
  {
    text: '🎓 Aprendizado',
    items: [
      { text: '📚 Glossário', link: '/glossario' },
      { text: '🧑‍💻 Material Educativo', link: '/material-educativo' },
      { text: '📦 Bibliotecas', link: '/bibliotecas' },
      { text: '🛠️ Software', link: '/software' },
      { text: '💡 Conceitos', link: '/conceitos' }
    ]
  },
  {
    text: '⚙️ Ferramentas e Tecnologias',
    items: [
      { text: '🟩 OpenGL', link: '/opengl' },
      { text: '🔺 Vulkan', link: '/vulkan' },
      { text: '🪟 DirectX & Metal', link: '/directx-metal' },
      { text: '🌐 Web', link: '/web' },
      { text: '💥 Ray Tracing', link: '/ray-tracing' },
      { text: '✨ Shaders', link: '/shaders' },
      { text: '🐵 Blender', link: '/blender' },
      { text: '🎬 Edição de Vídeo', link: '/edicao-de-video' },
      { text: '🖨️ Impressão 3D e Modelagem', link: '/impressao-3d-e-modelagem' }
    ]
  },
  {
    text: '— Legenda',
    items: [
      { text: '⭐ Recomendação da Comunidade', link: '/guia#legenda' },
      { text: '🌐 Portal / Índice Externo', link: '/guia#legenda' },
      { text: '↪️ Link de Seção', link: '/guia#legenda' }
    ]
  }
]

// ---------------------------------------------------------------------------
// Social links
// ---------------------------------------------------------------------------
export const socialLinks: DefaultTheme.SocialLink[] = [
  {
    icon: 'github',
    link: 'https://github.com/etecvav26-3C-07/Portfolio-TCC'
  }
]

// ---------------------------------------------------------------------------
// Search — MiniSearch local (PT-BR)
// ---------------------------------------------------------------------------
export const search: DefaultTheme.Config['search'] = {
  provider: 'local',
  options: {
    translations: {
      button: {
        buttonText: 'Pesquisar',
        buttonAriaLabel: 'Pesquisar documentação'
      },
      modal: {
        noResultsText: 'Nenhum resultado encontrado para',
        resetButtonTitle: 'Limpar pesquisa',
        footer: {
          selectText: 'para selecionar',
          navigateText: 'para navegar',
          closeText: 'para fechar'
        }
      }
    }
  }
}
