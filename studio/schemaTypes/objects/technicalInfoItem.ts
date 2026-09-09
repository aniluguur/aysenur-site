import {defineField, defineType} from 'sanity'

export const technicalInfoItem = defineType({
  name: 'technicalInfoItem',
  title: 'Teknik Bilgi',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Etiket', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'value', title: 'Değer', type: 'string', validation: (Rule) => Rule.required()}),
  ],
  preview: {
    select: {title: 'label', subtitle: 'value'},
  },
})
