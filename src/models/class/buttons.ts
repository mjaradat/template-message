import { ButtonTypeEnum } from '../enum/ButtonTypeEnum'
import { MessageComponent } from './message-component'
import type { IMessageButton, IMessageButtons } from '../interface/i-buttons'
import type { TMessageComponentValue } from '../type/t-message-component-value'

// button component class
class MessageButton implements IMessageButton {
  type!: ButtonTypeEnum
  text!: string
  value!: TMessageComponentValue | undefined

  constructor({ type = ButtonTypeEnum.none, text = '', value } = {} as IMessageButton) {
    this.type = type
    this.text = text
    this.value = value ? { ...value } : value
  }
}

// buttons component class
class MessageButtons extends MessageComponent {
  buttons: IMessageButton[] = []
  constructor({ buttons, ...rest } = {} as IMessageButtons) {
    super(rest)
    this.buttons = buttons?.map(b => new MessageButton(b))
  }
}

export { MessageButton, MessageButtons }
