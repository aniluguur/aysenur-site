import {defineField, defineType} from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'İletişim',
  type: 'document',
  fields: [
    defineField({name: 'heroEyebrow', title: 'Hero Üst Etiket', type: 'string'}),
    defineField({name: 'heroTitle', title: 'Hero Başlık', type: 'string'}),
    defineField({name: 'heroDescription', title: 'Hero Açıklama', type: 'text'}),
    defineField({name: 'address', title: 'Adres', type: 'text'}),
    defineField({name: 'phone', title: 'Telefon', type: 'string'}),
    defineField({name: 'email', title: 'E-posta', type: 'string'}),
  ],
  preview: {
    prepare: () => ({title: 'İletişim'}),
  },
})
