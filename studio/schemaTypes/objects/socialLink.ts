import {defineField, defineType} from 'sanity'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Sosyal Medya Linki',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Etiket', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'url', title: 'URL', type: 'url', validation: (Rule) => Rule.required()}),
  ],
  preview: {
    select: {title: 'label', subtitle: 'url'},
  },
})
