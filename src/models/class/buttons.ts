import { ButtonTypeEnum } from '../enum/ButtonTypeEnum'
import { MessageComponent } from './message-component'
import type { IMessageButton, IMessageButtons } from '../interface/i-buttons'
import type { TMessageComponentValue } from '../type/t-message-component-value'
import { MessageComponentTypeEnum } from '../enum/MessageComponentTypeEnum'

// button component class
class MessageButton implements IMessageButton {
  type!: ButtonTypeEnum
  text!: string
  value!: TMessageComponentValue

  constructor({ type = ButtonTypeEnum.none, text = '', value = {} } = {} as IMessageButton) {
    this.type = type
    this.text = text
    this.value = { ...value }
  }

  resetValue(key: keyof TMessageComponentValue): void {
    if (this.value[key] || this.value[key] === '') this.value = {}
  }
}

// buttons component class
class MessageButtons extends MessageComponent {
  buttons!: IMessageButton[]
  constructor({ buttons = [] } = {} as IMessageButtons) {
    super({ type: MessageComponentTypeEnum.buttons })
    this.buttons = buttons?.map(b => new MessageButton(b))
  }
}

export { MessageButton, MessageButtons }
