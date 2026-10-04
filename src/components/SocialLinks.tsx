import { socialLinks } from "@/data/contacts"

export default function SocialLinks() {
  return (
    <div className="social-links" role="group" aria-label="Социальные сети">
      {socialLinks.map(({ name, href }) => (
        <a href={href} key={name} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      ))}
    </div>
  )
}
