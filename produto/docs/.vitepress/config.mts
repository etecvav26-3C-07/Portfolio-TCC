import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Render Index',
  description: 'Um site VitePress para indexação de contéudo sobre computação gráfica.',

  themeConfig: {
    logo: '/box.svg',

    nav: [
      { text: 'Início', link: '/' },
      { text: 'Guia', link: '/guia' },
      { text: 'Notícias', link: '/noticias' }
    ],

    sidebar: [
      {
        text: 'Principal',
        items: [
          { text: 'Início', link: '/' },
          { text: 'Guia para iniciantes', link: '/guia' },
          { text: 'Notícias', link: '/noticias' },
          { text: 'API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'Aprendizado',
        items: [
          { text: 'Glossário', link: '/glossario' },
          { text: 'Material Educativo', link: '/material-educativo' },
          { text: 'Bibliotecas', link: '/bibliotecas' },
          { text: 'Software', link: '/software' },
          { text: 'Conceitos', link: '/conceitos' }
        ]
      },
      {
        text: 'Ferramentas e Tecnologias',
        items: [
          { text: 'OpenGL', link: '/opengl' },
          { text: 'Vulkan', link: '/vulkan' },
          { text: 'Web', link: '/web' },
          { text: 'Blender', link: '/blender' },
          { text: 'Edição de Vídeo', link: '/edicao-de-video' },
          { text: 'Impressão 3D e Modelagem', link: '/impressao-3d-e-modelagem' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/etecvav26-3C-07/Portfolio-TCC' }
    ],

    lastUpdated: true
  }
})
