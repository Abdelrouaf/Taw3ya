import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import logo from "../../assets/logo.png";

const socials = [
  { icon: faTwitter, label: "Twitter" },
  { icon: faInstagram, label: "Instagram" },
  { icon: faFacebook, label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="inline-flex items-center gap-2">
              <img src={logo} alt="" className="h-9 w-9" loading="lazy" />
              <span className="font-serif text-2xl font-semibold text-foreground">
                Taw<span className="text-primary">3</span>ya
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Read, listen, and reflect on the Holy Quran and daily remembrance — beautifully designed for clarity and calm.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socials.map((s) => (
                <a key={s.label} href="#" aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                  <FontAwesomeIcon icon={s.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Explore</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link to="/" className="text-muted-foreground transition-colors hover:text-primary">Quran</Link></li>
              <li><Link to="/azkar" className="text-muted-foreground transition-colors hover:text-primary">Azkar</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">About</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="#" className="text-muted-foreground transition-colors hover:text-primary">Our mission</a></li>
              <li><a href="#" className="text-muted-foreground transition-colors hover:text-primary">Contact</a></li>
              <li><a href="#" className="text-muted-foreground transition-colors hover:text-primary">Privacy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Stay in touch</h3>
            <p className="mt-4 text-sm text-muted-foreground">Get a weekly verse and reflection.</p>
            <form className="mt-3 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="you@example.com" aria-label="Email address"
                className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary" />
              <button type="submit" className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                Send
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Taw3ya. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
