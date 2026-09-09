import {defineField, defineType} from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Hakkımızda',
  type: 'document',
  fields: [
    defineField({name: 'heroEyebrow', title: 'Hero Üst Etiket', type: 'string'}),
    defineField({name: 'heroTitle', title: 'Hero Başlık', type: 'string'}),
    defineField({name: 'heroDescription', title: 'Hero Açıklama', type: 'text'}),
    defineField({
      name: 'storyParagraphs',
      title: 'Hikaye Paragrafları',
      type: 'array',
      of: [{type: 'text'}],
    }),
    defineField({
      name: 'values',
      title: 'Değerlerimiz',
      type: 'array',
      of: [{type: 'valueItem'}],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Hakkımızda'}),
  },
})
