import { LanguageEnum } from '../enum/LanguageEnum'
import { MessageCategoryEnum } from '../enum/MessageCategoryEnum'
import { MessageComponentFactory } from './message-component-factory'
import type { IMessageComponent } from '../interface/i-message-component'
import type { ITemplateMessage } from '../interface/i-template-message'

// template message class
class TemplateMessage {
  language!: LanguageEnum
  name!: string
  category!: MessageCategoryEnum
  components!: IMessageComponent[]
  constructor({ language = LanguageEnum.none, name = '', category = MessageCategoryEnum.none, components = [] } = {} as ITemplateMessage) {
    this.language = language
    this.name = name
    this.category = category
    this.components = components?.map(model => MessageComponentFactory.createComponent(model))
  }
}

export { TemplateMessage }
