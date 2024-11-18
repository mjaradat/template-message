import { BrandFormatEnum } from '../enum/BrandFormatEnum'
import { ButtonTypeEnum } from '../enum/ButtonTypeEnum'
import { LanguageEnum } from '../enum/LanguageEnum'
import { MessageCategoryEnum } from '../enum/MessageCategoryEnum'
import { MessageComponentTypeEnum } from '../enum/MessageComponentTypeEnum'
import { TMessageComponentValue } from '../type/t-message-component-value'

const templateMessageJSON = {
  language: LanguageEnum.en, // Language for the template: "en_US" for English or "ar_SA": for Arabic,
  name: 'template_name', // The name identifier for the template.
  category: MessageCategoryEnum.marketing, // Category of the template: either "MARKETING" or  "UTILITY",
  components: [
    {
      type: MessageComponentTypeEnum.header,
      format: BrandFormatEnum.image, // Options: "IMAGE" or "TEXT".
      value: {
        url: 'image_url' // Required if format is "IMAGE". Example: { "url": "https://example.com/image.jpg" }
      }
      // If format is "TEXT", use "value": { "text": "header_text" } instead.
    },
    {
      type: MessageComponentTypeEnum.body,
      text: 'body_text' // Required: Main content of the message. Example: "Welcome to our service!"
    },
    {
      type: MessageComponentTypeEnum.footer,
      text: 'footer_text' // Optional: Footer text, such as disclaimers or    additional notes.
      // Example: "Terms and conditions apply."
    },
    {
      type: MessageComponentTypeEnum.buttons,
      buttons: [
        {
          type: ButtonTypeEnum.url, // Options: "URL" or "CALL".
          text: 'button_text', // Button display text. Example: "Visit our  site" or "Contact Us".
          value: {
            url: 'https://arabot.io' // Required if type is "URL". Example: { "url": "https://arabot.io" }
          } as TMessageComponentValue
          // If type is "CALL", use "value": { "phone_number": "+96279XXXXXXX"    } instead.
        }
      ]
    }
  ]
}

export { templateMessageJSON }
