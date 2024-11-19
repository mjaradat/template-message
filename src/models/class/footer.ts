import { MessageComponent } from './message-component'
import type { IMessageFooter } from '../interface/i-footer'
import { MessageComponentTypeEnum } from '../enum/MessageComponentTypeEnum'

// footer component class
class MessageFooter extends MessageComponent {
  text!: string
  constructor({ text = '' } = {} as IMessageFooter) {
    super({ type: MessageComponentTypeEnum.footer })
    this.text = text
  }
}

export { MessageFooter }
