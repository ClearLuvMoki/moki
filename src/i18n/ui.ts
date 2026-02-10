import type { Language } from '@/i18n/config'

interface Translation {
  title: string
  subtitle: string
  description: string
  posts: string
  tags: string
  about: string
  toc: string
}

export const ui: Record<Language, Translation> = {
  zh: {
    title: 'Moki',
    subtitle: '',
    description: '',
    posts: '文章',
    tags: '标签',
    about: '关于',
    toc: '目录',
  },
}
