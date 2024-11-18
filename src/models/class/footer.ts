import { MessageComponent } from './message-component'
import type { IMessageFooter } from '../interface/i-footer'

// footer component class
class MessageFooter extends MessageComponent {
  text!: string
  constructor({ text = '', ...rest } = {} as IMessageFooter) {
    super(rest)
    this.text = text
  }
}

export { MessageFooter }
