import Image from "next/image";
import {
  ArrowRight,
  BatteryCharging,
  Camera,
  CheckCircle,
  Clock,
  DeviceMobile,
  Drop,
  InstagramLogo,
  MapPin,
  Phone,
  Quotes,
  ShieldCheck,
  SpeakerHigh,
  Wrench,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { Navigation } from "@/components/navigation";
import { Reveal } from "@/components/reveal";
import { ServiceExplorer } from "@/components/service-explorer";
import { BeforeAfter } from "@/components/before-after";
import { BookingFlow } from "@/components/booking-flow";
import { HeroImageStack } from "@/components/hero-image-stack";
import { BookServiceOverlay } from "@/components/book-service-overlay";

function ResponsiveCopy({ desktop, mobile }: { desktop: string; mobile: string }) {
  return (
    <>
      <span className="copy-desktop">{desktop}</span>
      <span className="copy-mobile">{mobile}</span>
    </>
  );
}

const popularServices = [
  {
    name: "Battery replacement",
    description: "Restore dependable power and battery health.",
    service: "battery",
    icon: BatteryCharging,
    image: "/images/service-battery.webp",
    imageAlt: "Technician replacing a smartphone battery",
  },
  {
    name: "Camera repair",
    description: "Fix focus, shake, lens, or camera faults.",
    service: "camera",
    icon: Camera,
    image: "/images/service-camera.webp",
    imageAlt: "Technician positioning a smartphone camera module",
  },
  {
    name: "Water damage",
    description: "Inspect corrosion and recover key functions.",
    service: "water-damage",
    icon: Drop,
    image: "/images/service-water-damage.webp",
    imageAlt: "Technician treating corrosion inside a smartphone",
  },
  {
    name: "Audio repair",
    description: "Clear calls, speakers, and microphones.",
    service: "speaker",
    icon: SpeakerHigh,
    image: "/images/service-audio.webp",
    imageAlt: "Technician replacing a smartphone speaker module",
  },
];

const faqs = [
  {
    question: "How much will my repair cost?",
    answer:
      "Pricing depends on the device model, fault, and parts required. We diagnose first and explain the available options before repair begins.",
  },
  {
    question: "How long does a repair take?",
    answer:
      "Many common repairs can be completed the same day after assessment. Complex board work, water damage, and parts ordering can take longer.",
  },
  {
    question: "Do repairs include a warranty?",
    answer:
      "Eligible repairs include warranty coverage. The exact term depends on the service and part, and is confirmed before work begins.",
  },
  {
    question: "Can you collect or deliver my device?",
    answer:
      "Delivery support is available. Contact the team to confirm your location, timing, and any applicable travel fee.",
  },
  {
    question: "Do you repair Android phones?",
    answer:
      "Yes. We assess supported Samsung, Google Pixel, Tecno, Infinix, Xiaomi, and other Android models. Parts availability and the final repair option are confirmed after checking the exact model.",
  },
  {
    question: "What if I am not sure what is broken?",
    answer:
      "Book Diagnostic Services. We will inspect the device, identify the fault, and recommend the right next step.",
  },
];

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="top">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <ResponsiveCopy
                desktop="iPhone, iPad & Android Devices Repair, Dar es Salaam"
                mobile="Phone & tablet repair, Dar es Salaam"
              />
            </p>
            <h1 id="hero-title">Repair, perfected.</h1>
            <p className="hero-lede">
              <ResponsiveCopy
                desktop="Precise Apple and Android device repairs, quality parts, clear advice, and warranty-backed service in Mwenge."
                mobile="Quality Apple and Android repairs with clear advice and warranty support."
              />
            </p>
            <div className="hero-actions">
              <a className="button" href="#book">
                Book repair <ArrowRight size={18} />
              </a>
              <a className="button button-secondary" href="#services">
                Browse services
              </a>
            </div>
          </div>

          <HeroImageStack />
        </section>

        <section className="trust-strip" aria-label="Service promises">
          <div className="section-shell trust-grid">
            <div><Wrench size={21} /><span>Free check-up</span></div>
            <div><CheckCircle size={21} /><span>Quality parts</span></div>
            <div><ShieldCheck size={21} /><span>Warranty support</span></div>
            <div><Clock size={21} /><span>Clear time estimates</span></div>
          </div>
        </section>

        <section className="section section-shell" aria-labelledby="services">
          <Reveal className="section-heading">
            <h2 id="services">The repairs customers need most</h2>
            <p>Careful work, clear options, and testing before your device leaves the bench.</p>
          </Reveal>

          <div className="popular-grid">
            <Reveal className="popular-card popular-screen">
              <BookServiceOverlay label="Screen repair" service="screen-repair" device="iPhone" />
              <div className="popular-image">
                <Image
                  src="/images/screen-before.webp"
                  alt="Cracked smartphone screen ready for repair"
                  fill
                  loading="eager"
                  sizes="(max-width: 760px) 100vw, 48vw"
                />
              </div>
              <div className="popular-content">
                <DeviceMobile size={27} />
                <h3>Screen repair</h3>
                <p>Display, glass, touch, color, and flicker issues.</p>
              </div>
            </Reveal>
            {popularServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal
                  className="popular-card popular-service-card"
                  key={service.name}
                  delay={0.04 * index}
                >
                  <BookServiceOverlay label={service.name} service={service.service} device="iPhone" />
                  <div className="popular-service-image">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 1020px) 42vw, 26vw"
                    />
                  </div>
                  <div className="popular-service-content">
                    <Icon size={24} />
                    <div>
                      <h3>{service.name}</h3>
                      <p>{service.description}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="section section-shell service-section" aria-labelledby="all-services-title">
          <Reveal className="section-heading">
            <h2 id="all-services-title">Find the right repair</h2>
            <p>
              <ResponsiveCopy
                desktop="Browse iPhone, iPad, Android, Apple Watch, and MacBook services. Start with a diagnostic if you are unsure."
                mobile="Filter by device or search for the repair you need."
              />
            </p>
          </Reveal>
          <ServiceExplorer />
        </section>

        <section className="section process-section" aria-labelledby="process">
          <div className="section-shell">
            <Reveal className="section-heading compact-heading">
              <p className="eyebrow">A careful repair process</p>
              <h2 id="process">No guesswork. No silent surprises.</h2>
            </Reveal>
            <div className="process-grid">
              <Reveal className="process-item">
                <span><DeviceMobile size={23} /></span>
                <h3>Assess</h3>
                <p>We inspect the device and confirm the real fault.</p>
              </Reveal>
              <Reveal className="process-item" delay={0.05}>
                <span><Quotes size={23} /></span>
                <h3>Explain</h3>
                <p>You receive repair options, timing, and warranty terms.</p>
              </Reveal>
              <Reveal className="process-item" delay={0.1}>
                <span><Wrench size={23} /></span>
                <h3>Repair</h3>
                <p>Our technicians work carefully with quality parts.</p>
              </Reveal>
              <Reveal className="process-item" delay={0.15}>
                <span><CheckCircle size={23} /></span>
                <h3>Test & return</h3>
                <p>Core functions are checked before collection or delivery.</p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section section-shell repair-story" aria-labelledby="repairs">
          <Reveal className="repair-copy">
            <h2 id="repairs">A clean finish you can see</h2>
            <p>
              <ResponsiveCopy
                desktop="Drag the control to compare a damaged screen with its restored finish. Every repair ends with a function check."
                mobile="Drag to compare the damaged screen with the repaired finish."
              />
            </p>
            <div className="repair-checks">
              <span><CheckCircle size={18} weight="fill" /> Display and touch</span>
              <span><CheckCircle size={18} weight="fill" /> Cameras and sensors</span>
              <span><CheckCircle size={18} weight="fill" /> Charging and audio</span>
            </div>
          </Reveal>
          <Reveal className="repair-visual" delay={0.08}>
            <BeforeAfter />
          </Reveal>
        </section>

        <section className="section booking-section" aria-labelledby="book">
          <div className="section-shell booking-layout">
            <Reveal className="booking-copy">
              <p className="eyebrow">Book your visit</p>
              <h2 id="book">
                <ResponsiveCopy
                  desktop="Start with the device. We’ll handle the details."
                  mobile="Choose a device. We’ll handle the rest."
                />
              </h2>
              <p>
                <ResponsiveCopy
                  desktop="Choose an Apple or Android device, service, and preferred date. The team will confirm model support and parts availability by phone or WhatsApp."
                  mobile="Pick a repair. We will confirm availability by phone or WhatsApp."
                />
              </p>
              <div className="booking-contact-note">
                <Phone size={20} />
                <span>
                  Prefer to call? <a href="tel:+255744710046">0744 710 046</a>
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <BookingFlow />
            </Reveal>
          </div>
        </section>

        <section className="section section-shell warranty-layout" aria-labelledby="warranty-title">
          <Reveal className="warranty-panel">
            <div className="warranty-icon"><ShieldCheck size={34} weight="duotone" /></div>
            <div>
              <h2 id="warranty-title">Repair confidence, in writing</h2>
              <p>
                <ResponsiveCopy
                  desktop="Eligible services include warranty coverage. We confirm the part, scope, and warranty terms before the repair starts."
                  mobile="Eligible repairs include confirmed warranty coverage before work starts."
                />
              </p>
            </div>
            <a href="#faq" className="text-link">Read warranty FAQ <ArrowRight size={17} /></a>
          </Reveal>
        </section>

        <section className="section section-shell testimonials" aria-labelledby="testimonials-title">
          <Reveal className="section-heading">
            <h2 id="testimonials-title">Service people remember</h2>
            <p>
              <ResponsiveCopy
                desktop="Clear explanations and careful work are what customers value most."
                mobile="Clear advice. Careful work. No surprises."
              />
            </p>
          </Reveal>
          <div className="testimonial-grid">
            <Reveal className="testimonial-feature">
              <Quotes size={32} weight="fill" />
              <blockquote>“They explained the fault clearly and my phone came back feeling new.”</blockquote>
              <p>Asha M. <span>Screen replacement</span></p>
            </Reveal>
            <div className="testimonial-stack">
              <Reveal className="testimonial-small" delay={0.06}>
                <blockquote>“Fast communication, careful work, and no surprises on collection.”</blockquote>
                <p>Kelvin J. <span>Battery service</span></p>
              </Reveal>
              <Reveal className="testimonial-small" delay={0.1}>
                <blockquote>“The diagnostic helped me understand the best option before paying.”</blockquote>
                <p>Neema R. <span>iPad diagnostic</span></p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section section-shell faq-section" aria-labelledby="faq">
          <Reveal className="faq-intro">
            <h2 id="faq">Good questions, answered clearly</h2>
            <p>Still unsure? Send the team a photo or description of the problem on WhatsApp.</p>
            <a
              className="button button-secondary"
              href="https://wa.me/255744710046"
              target="_blank"
              rel="noreferrer"
            >
              Ask on WhatsApp <WhatsappLogo size={19} weight="fill" />
            </a>
          </Reveal>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="section contact-section" aria-labelledby="contact">
          <div className="section-shell contact-layout">
            <Reveal className="contact-copy">
              <h2 id="contact">Visit, call, or message us</h2>
              <p>
                <ResponsiveCopy
                  desktop="Bring your iPhone, iPad, Android phone, Apple Watch, or MacBook for a professional assessment."
                  mobile="Visit us in Mwenge or contact the team for an assessment."
                />
              </p>
            </Reveal>
            <div className="contact-actions">
              <a href="https://maps.google.com/?q=Mwenge+Nakiete+Pharmacy+Dar+es+Salaam" target="_blank" rel="noreferrer">
                <MapPin size={24} />
                <span><strong>Mwenge</strong><small><ResponsiveCopy desktop="Near Nakiete Pharmacy, Dar es Salaam" mobile="Near Nakiete" /></small></span>
              </a>
              <a href="tel:+255744710046" target="_blank" rel="noreferrer">
                <Phone size={24} />
                <span><strong>0744 710 046</strong><small><ResponsiveCopy desktop="Call for repair support" mobile="Call support" /></small></span>
              </a>
              <a href="https://www.instagram.com/iphone_service_tz/" target="_blank" rel="noreferrer">
                <InstagramLogo size={24} />
                <span><strong>@iphone_service_tz</strong><small><ResponsiveCopy desktop="See recent repair work" mobile="Repair updates" /></small></span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-shell footer-main">
          <a className="brand" href="#top">
            <span className="brand-mark">
              <Image src="/brand-settings.webp" alt="" width={36} height={36} />
            </span>
            <span>iPhone Service <strong>TZ</strong></span>
          </a>
          <p>Professional Apple and Android device repair in Dar es Salaam.</p>
          <div className="footer-links">
            <a href="#services">Services</a>
            <a href="#book">Book repair</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className="section-shell footer-bottom">
          <span>© {new Date().getFullYear()} iPhone Service TZ</span>
          <span>Independent repair service. Apple and Android are trademarks of their respective owners.</span>
        </div>
      </footer>
    </>
  );
}
