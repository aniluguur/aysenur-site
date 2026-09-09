import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Ana Sayfa',
  type: 'document',
  fields: [
    defineField({name: 'heroEyebrow', title: 'Hero Üst Etiket', type: 'string'}),
    defineField({name: 'heroTitle', title: 'Hero Başlık', type: 'string'}),
    defineField({name: 'heroDescription', title: 'Hero Açıklama', type: 'text'}),
    defineField({
      name: 'stats',
      title: 'İstatistikler',
      type: 'array',
      of: [{type: 'statItem'}],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({name: 'testimonialQuote', title: 'Referans Metni', type: 'text'}),
    defineField({name: 'testimonialAuthorName', title: 'Referans Veren Kişi', type: 'string'}),
    defineField({name: 'testimonialAuthorCompany', title: 'Referans Veren Şirket', type: 'string'}),
  ],
  preview: {
    prepare: () => ({title: 'Ana Sayfa'}),
  },
})
