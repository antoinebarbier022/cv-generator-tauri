function stripeLocaleCode(locale?: string): string | undefined {
  if (!locale) return locale
  const index = locale.indexOf('-')
  if (index === -1) return locale
  return locale.slice(0, index)
}
