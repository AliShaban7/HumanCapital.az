// Map company names to logo paths
export const getCompanyLogo = (companyName: string): string | null => {
  const logoMap: { [key: string]: string } = {
    'Kontakt Home': '/images/kontakt-home-yeni-logo.png',
    'Birbank': '/images/birbank.png',
    'Azercell': '/images/azercell_logo-cropped.svg',
    'Pasha Bank': '/images/pasha_logo.png',
    'PASHA Bank': '/images/pasha_logo.png',
  }
  
  // Case-insensitive matching
  const normalizedName = companyName.toLowerCase()
  for (const [key, value] of Object.entries(logoMap)) {
    if (normalizedName.includes(key.toLowerCase())) {
      return value
    }
  }
  
  return null
}

