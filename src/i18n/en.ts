const titles = {
  templatesTitle: 'Templates',
  newTemplateMessage: 'New Template Message',
  save: 'Save',
  templateDetails: 'Template Details',
  templateDescription: 'Define your template name and language',
  templateName: 'Template Name',
  language: 'Language',
  category: 'Category',
  categoryDescription: 'Choose your message template',
  header: 'Header',
  headerDescription: 'Highlight your brand here, use images or videos, to stand out',
  text: 'Text',
  body: 'Body',
  bodyDescription: 'Enter the text of your message in the language you’ve selected',
  footer: 'Footer',
  footerDescription: 'Use this section for optional details like disclaimers, contact info, or additional context.',
  buttons: 'Buttons',
  buttonsDescription: 'Create buttons that let your customers respond to your message or take an action.',
  buttonType: 'Button Type',
  buttonText: 'Button Text',
  websiteUrl: 'Website URL',
  phoneNumber: 'Phone Number',
  en: 'English (US)',
  ar: 'Arabic (JO)',
  marketing: 'Marketing',
  marketingDescription: 'Promotions, ads, campaigns.',
  utility: 'Utility',
  utilityDescription: 'Tools, utilities, services.',
  none: 'None',
  callToActions: 'Call to actions',
  url: 'Visit Website',
  call: 'Phone Number',
  image: 'Image',
  allowedTypes: 'Allowed types',
  dragDrop: 'Drag and drop an image here',
  selectFile: 'Select File',
  addNewButton: 'Add New Button'
}

const placeholders = {
  templateNamePlaceholder: 'Enter template name...',
  languagePlaceholder: 'Choose a language',
  headerTextPlaceholder: 'Enter header text...',
  footerTextPlaceholder: 'Enter footer text...',
  buttonTypePlaceholder: 'Select Button Type',
  buttonTextPlaceholder: 'Enter button text...',
  websiteUrlPlaceholder: 'https://arabot.io',
  phoneNumberPlaceholder: '7XXX XXXX'
}

const errors = {
  requiredField: 'This field is required',
  fileSize: 'File size exceeds {key} KB.',
  onlyImage: 'Only image files are allowed.'
}

export const en = { ...titles, ...placeholders, ...errors }
