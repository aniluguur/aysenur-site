import {defineField, defineType} from 'sanity'

export const statItem = defineType({
  name: 'statItem',
  title: 'İstatistik',
  type: 'object',
  fields: [
    defineField({name: 'value', title: 'Değer', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'label', title: 'Etiket', type: 'string', validation: (Rule) => Rule.required()}),
  ],
  preview: {
    select: {title: 'value', subtitle: 'label'},
  },
})
