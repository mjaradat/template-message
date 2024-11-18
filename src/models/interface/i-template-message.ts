import { LanguageEnum } from '../enum/LanguageEnum'
import { MessageCategoryEnum } from '../enum/MessageCategoryEnum'
import type { IMessageComponent } from './i-message-component'

interface ITemplateMessage {
  language: LanguageEnum
  name: string
  category: MessageCategoryEnum
  components: IMessageComponent[]
}

export type { ITemplateMessage }
