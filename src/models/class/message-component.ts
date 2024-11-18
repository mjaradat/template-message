import { MessageComponentTypeEnum } from '../enum/MessageComponentTypeEnum'
import type { IMessageComponent } from '../interface/i-message-component'

// super class of message component
class MessageComponent implements IMessageComponent {
  type!: MessageComponentTypeEnum
  constructor({ type = MessageComponentTypeEnum.none } = {} as IMessageComponent) {
    this.type = type
  }
}

export { MessageComponent }
