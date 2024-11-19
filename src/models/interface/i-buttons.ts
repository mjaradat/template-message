import { ButtonTypeEnum } from '../enum/ButtonTypeEnum'
import type { TMessageComponentValue } from '../type/t-message-component-value'
import type { IMessageComponent } from './i-message-component'

interface IMessageButton {
  type: ButtonTypeEnum
  text: string
  value: TMessageComponentValue
}

interface IMessageButtons extends IMessageComponent {
  buttons: IMessageButton[]
}

export type { IMessageButtons, IMessageButton }
