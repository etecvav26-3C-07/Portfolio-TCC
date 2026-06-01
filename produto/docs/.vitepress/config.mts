import { defineConfig } from 'vitepress'




// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Render Index",
  description: "Um site vitepress para indexação de contéudo",

  themeConfig: {
    logo: '/box.svg',

    nav: [
      { text: 'Atualizações', link: '/atualizacoes' },
      { text: 'Backups', link: '/backups' },
      { text: 'Notícias', link: '/noticias' }
    ],

    sidebar: [
      {
        text: 'Index',
        items: [
          { text: 'Guia para iniciantes', link: '/guia' },
          { text: 'Postagens', link: '/postagens' },
          { text: 'Contribuir', link: '/contribuir' }
        ]
      },
      {
        text: 'Index',
        items: [
          { text: 'Vulkan', link: '/vulkan.md' },
          { text: 'OpenGL', link: '/opengl.md' },
          { text: 'Web', link: '/web.md' },
          { text: 'Mobile', link: '/mobile.md' },
          { text: 'Blender', link: '/blender.md' },
          { text: 'Edição de Vídeo', link: '/edicao-de-video.md' },
          { text: 'Impressão 3D e Modelagem', link: '/impressao-3d-e-modelagem.md' }
        ]
      },
      {
        text: 'Ferramentas',
        items: [
          { text: 'Item 1', link: '/item-1' },
          { text: 'Item 2', link: '/item-2' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/etecvav26-3C-07/Portfolio-TCC' }
    ]
  }
})