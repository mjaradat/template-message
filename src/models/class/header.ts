import { BrandFormatEnum } from '../enum/BrandFormatEnum'

import { MessageComponent } from './message-component'

import type { IMessageHeader } from '../interface/i-header'
import type { TMessageComponentValue } from '../type/t-message-component-value'

// header component class
class MessageHeader extends MessageComponent {
  format!: BrandFormatEnum
  value!: TMessageComponentValue | undefined
  constructor({ format = BrandFormatEnum.none, value, ...rest } = {} as IMessageHeader) {
    super(rest)
    this.format = format
    this.value = value
  }
}

export { MessageHeader }
