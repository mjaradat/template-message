import { IMessageBody } from '../interface/i-body'
import { MessageComponent } from './message-component'

// body component class
class MessageBody extends MessageComponent {
  text!: string
  constructor({ text = '', ...rest } = {} as IMessageBody) {
    super(rest)
    this.text = text
  }
}

export { MessageBody }
