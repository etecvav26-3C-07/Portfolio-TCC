import { useLocalStorage } from '@vueuse/core'

interface RecentPage {
  title: string
  path: string
  timestamp: number
}

const MAX_ITEMS = 10

export function useRecentPages() {
  const pages = useLocalStorage<RecentPage[]>(
    'vp-recent-pages',
    []
  )

  function addPage(page: Omit<RecentPage, 'timestamp'>) {
    // remove duplicado
    pages.value = pages.value.filter(
      p => p.path !== page.path
    )

    // adiciona no topo
    pages.value.unshift({
      ...page,
      timestamp: Date.now()
    })

    // limita quantidade
    pages.value = pages.value.slice(0, MAX_ITEMS)
  }

  function clearPages() {
    pages.value = []
  }

  return {
    pages,
    addPage,
    clearPages
  }
}