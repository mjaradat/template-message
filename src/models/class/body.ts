import { MessageComponentTypeEnum } from '../enum/MessageComponentTypeEnum'
import { IMessageBody } from '../interface/i-body'
import { MessageComponent } from './message-component'

// body component class
class MessageBody extends MessageComponent {
  text!: string
  constructor({ text = '' } = {} as IMessageBody) {
    super({ type: MessageComponentTypeEnum.body })
    this.text = text
  }
}

export { MessageBody }
