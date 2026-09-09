import {category} from './documents/category'
import {project} from './documents/project'
import {homePage} from './documents/homePage'
import {aboutPage} from './documents/aboutPage'
import {contactPage} from './documents/contactPage'
import {siteSettings} from './documents/siteSettings'
import {technicalInfoItem} from './objects/technicalInfoItem'
import {statItem} from './objects/statItem'
import {valueItem} from './objects/valueItem'
import {socialLink} from './objects/socialLink'

export const singletonTypes = new Set(['homePage', 'aboutPage', 'contactPage', 'siteSettings'])

export const schemaTypes = [
  category,
  project,
  homePage,
  aboutPage,
  contactPage,
  siteSettings,
  technicalInfoItem,
  statItem,
  valueItem,
  socialLink,
]
