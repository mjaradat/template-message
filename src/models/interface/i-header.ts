import { BrandFormatEnum } from '../enum/BrandFormatEnum'
import type { TMessageComponentValue } from '../type/t-message-component-value'
import type { IMessageComponent } from './i-message-component'

interface IMessageHeader extends IMessageComponent {
  format: BrandFormatEnum
  value: TMessageComponentValue
  resetValue(key: keyof TMessageComponentValue): void
}

export type { IMessageHeader }
