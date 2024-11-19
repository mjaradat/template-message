import { BrandFormatEnum } from '../enum/BrandFormatEnum'

import { MessageComponent } from './message-component'

import type { IMessageHeader } from '../interface/i-header'
import type { TMessageComponentValue } from '../type/t-message-component-value'
import { MessageComponentTypeEnum } from '../enum/MessageComponentTypeEnum'

// header component class
class MessageHeader extends MessageComponent {
  format!: BrandFormatEnum
  value!: TMessageComponentValue
  constructor({ format = BrandFormatEnum.none, value = {} } = {} as IMessageHeader) {
    super({ type: MessageComponentTypeEnum.header })
    this.format = format
    this.value = { ...value }
  }

  resetValue(key: keyof TMessageComponentValue): void {
    if (this.value[key] || this.value[key] === '') this.value = {}
  }
}

export { MessageHeader }
