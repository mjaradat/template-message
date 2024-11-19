export const splitPhoneNumber = (phoneNumber: string): { countryCode: string; localNumber: string } => {
  // +962788833786 and 00962788833786
  const phoneRegex = /^(?:\+|00)(\d{1,3})(.*)$/

  const match = phoneNumber.match(phoneRegex)
  if (match) {
    const countryCode = `+${match[1]}`
    const localNumber = match[2].trim()
    return { countryCode, localNumber }
  }

  // Return default values if input doesn't match the format
  return { countryCode: '', localNumber: '' }
}
