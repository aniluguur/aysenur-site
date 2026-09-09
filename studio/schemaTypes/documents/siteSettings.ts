import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Ayarlar',
  type: 'document',
  fields: [
    defineField({name: 'companyName', title: 'Şirket Adı', type: 'string'}),
    defineField({name: 'footerTagline', title: 'Footer Açıklaması', type: 'text'}),
    defineField({
      name: 'socialLinks',
      title: 'Sosyal Medya Linkleri',
      type: 'array',
      of: [{type: 'socialLink'}],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Ayarlar'}),
  },
})
