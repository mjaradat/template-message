import type { IMessageComponent } from './i-message-component'

interface IMessageBody extends IMessageComponent {
  text: string
}

export type { IMessageBody }
