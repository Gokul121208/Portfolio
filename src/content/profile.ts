export const profile = {
  name: "Gokul M" as const,
  identities: ["Digital Marketer", "Forex & Futures Trader", "Content Creator", "Founder"],
  email: "gokulamurugan40@gmail.com",
  phone: "+91 9159348778",
  whatsapp: "919159348778",
  agency: "The Moments Lab AI Marketing Agency",
  education: [
    { degree: "B.Tech Information Technology", status: "Graduate" },
    { degree: "MBA Marketing", status: "Currently pursuing" },
  ],
  skills: [
    "Performance Ads", "Short-form Video", "Copywriting", "Funnel Building",
    "Marketing Automation", "Web Development", "Brand Storytelling", "Market Analysis",
  ],
  // PLACEHOLDER numbers: replace with real figures.
  stats: [
    { label: "Brands grown", value: 4, suffix: "+", placeholder: true as const },
    { label: "Videos produced", value: 120, suffix: "+", placeholder: true as const },
    { label: "Leads generated", value: 1500, suffix: "+", placeholder: true as const },
    { label: "Months in market", value: 24, suffix: "", placeholder: true as const },
  ],
  // PLACEHOLDER links: replace with real profiles.
  socials: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
  ],
};
