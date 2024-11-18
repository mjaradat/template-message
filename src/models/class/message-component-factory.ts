import { MessageComponentTypeEnum } from '../enum/MessageComponentTypeEnum'

import { MessageBody } from './body'
import { MessageButtons } from './buttons'
import { MessageFooter } from './footer'
import { MessageHeader } from './header'
import { MessageComponent } from './message-component'

import type { IMessageBody } from '../interface/i-body'
import type { IMessageButtons } from '../interface/i-buttons'
import type { IMessageFooter } from '../interface/i-footer'
import type { IMessageHeader } from '../interface/i-header'
import type { IMessageComponent } from '../interface/i-message-component'

// message component factory component class
class MessageComponentFactory {
  static createComponent(model: IMessageComponent): IMessageComponent {
    switch (model.type) {
      case MessageComponentTypeEnum.header:
        return new MessageHeader(model as IMessageHeader)

      case MessageComponentTypeEnum.body:
        return new MessageBody(model as IMessageBody)

      case MessageComponentTypeEnum.footer:
        return new MessageFooter(model as IMessageFooter)

      case MessageComponentTypeEnum.buttons:
        return new MessageButtons(model as IMessageButtons)

      default:
        return new MessageComponent(model)
    }
  }
}

export { MessageComponentFactory }
