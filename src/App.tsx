import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, Check, ImagePlus, Menu, Minus, Plus, TrendingUp, X } from 'lucide-react';
import ProjectDialog from './components/ProjectDialog';
import ProofOfWork from './components/ProofOfWork';
import { impactStats, processSteps, profile, services } from './data/portfolio';
import { Reveal, SectionLabel } from './components/Reveal';

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#impact', label: 'Impact' },
  { href: '#proof', label: 'Proof of work' },
  { href: '#approach', label: 'My approach' },
];

function Asterisk({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" aria-hidden="true" className={className}>
      {[0, 45, 90, 135].map((rotation) => <rect key={rotation} x="43" y="4" width="14" height="92" transform={`rotate(${rotation} 50 50)`} />)}
    </svg>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [openService, setOpenService] = useState<string | null>(services[0].id);
  const [activeStep, setActiveStep] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [inquiryService, setInquiryService] = useState('');
  const [avatarUnavailable, setAvatarUnavailable] = useState(false);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: '-15% 0px -55% 0px' });
    document.querySelectorAll('main > section[id]').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function onEscape(event: globalThis.KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, [menuOpen]);

  function openInquiry(service = '') {
    setMenuOpen(false);
    setInquiryService(service);
    setDialogOpen(true);
  }

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % processSteps.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + processSteps.length) % processSteps.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = processSteps.length - 1;
    else return;
    event.preventDefault();
    setActiveStep(nextIndex);
    tabsRef.current[nextIndex]?.focus();
  }

  const currentStep = processSteps[activeStep];

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label={`${profile.name} home`} onClick={() => setMenuOpen(false)}>
          <Asterisk className="brand-star" />
          <span>{profile.name}<span className="wordmark-dot">.</span></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => <a key={item.href} href={item.href} className={activeSection === item.href.slice(1) ? 'nav-link active' : 'nav-link'}>{item.label}</a>)}
        </nav>
        <button type="button" className="header-cta" onClick={() => openInquiry()}>Let's talk <ArrowUpRight size={17} /></button>
        <button type="button" ref={menuButtonRef} className="mobile-menu-toggle icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X size={25} /> : <Menu size={25} />}</button>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
              {navItems.map((item, index) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}><span className="eyebrow">0{index + 1}</span>{item.label}<ArrowUpRight size={22} /></a>)}
              <button type="button" onClick={() => openInquiry()}>Let's work together <ArrowUpRight size={22} /></button>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="hero" id="top" aria-labelledby="hero-title">
          <motion.img className="hero-image" src="/images/growth-studio.jpg" alt="A vintage computer with an electric-lime screen in a sunlit creative studio" fetchPriority="high" initial={{ scale: 1.035 }} animate={{ scale: 1 }} transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1] }} />
          <div className="hero-wash" aria-hidden="true" />
          <motion.div className="hero-content" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}>
            <motion.p className="hero-eyebrow eyebrow" variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}><span className="tiny-cross" aria-hidden="true">+</span> CULTURE-LED. COMMUNITY-FIRST.</motion.p>
            <motion.h1 id="hero-title" variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}>LOST<br />BOY<span className="hero-period">.</span></motion.h1>
            <motion.p className="hero-role eyebrow" variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>WEB3 GROWTH OPERATOR</motion.p>
            <motion.p className="hero-description" variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>{profile.description}</motion.p>
            <motion.div className="hero-actions" variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
              <button type="button" className="button button-lime" onClick={() => openInquiry()}>Let's build momentum <ArrowUpRight size={20} /></button>
              <a className="hero-secondary" href="#expertise">Explore my expertise <ArrowDown size={16} /></a>
            </motion.div>
          </motion.div>
        </section>

        <section className="expertise section-shell" id="expertise" aria-labelledby="expertise-title">
          <Reveal className="section-heading-row">
            <SectionLabel number="01">WHAT I DO</SectionLabel>
            <div className="section-heading-copy">
              <h2 id="expertise-title">Good projects.<br />The right people.</h2>
              <p>From the first impression to an active community.<br className="desktop-break" /> Here's where I come in.</p>
            </div>
          </Reveal>
          <div className="services-list">
            {services.map((service, index) => {
              const expanded = openService === service.id;
              return (
                <Reveal key={service.id} delay={index * 0.06} className={`service-item ${expanded ? 'is-open' : ''}`}>
                  <h3>
                    <button type="button" className="service-toggle" id={`service-toggle-${service.id}`} aria-expanded={expanded} aria-controls={`service-detail-${service.id}`} onClick={() => setOpenService(expanded ? null : service.id)}>
                      <span className="service-number">/{service.number}</span>
                      <span className="service-name">{service.title}</span>
                      <span className="service-note">{service.note}</span>
                      <span className="service-toggle-icon">{expanded ? <Minus size={23} /> : <Plus size={23} />}</span>
                    </button>
                  </h3>
                  <motion.div className="service-region" id={`service-detail-${service.id}`} role="region" aria-labelledby={`service-toggle-${service.id}`} aria-hidden={!expanded} inert={!expanded} initial={false} animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }} transition={{ duration: 0.32, ease: 'easeInOut' }}>
                    <div className="service-detail">
                      <div className="service-description"><p>{service.description}</p><button type="button" className="text-link" onClick={() => openInquiry(service.id)}>{service.cta} <ArrowUpRight size={17} /></button></div>
                      <ul className="deliverables">{service.deliverables.map((item) => <li key={item}><span aria-hidden="true">+</span>{item}</li>)}</ul>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="about section-shell" id="about" aria-labelledby="about-title">
          <div className="about-symbol-column">
            <SectionLabel number="02">THE PERSON. THE MINDSET.</SectionLabel>
            <motion.div className={`about-symbol ${avatarUnavailable ? 'is-awaiting-avatar' : ''}`} initial={{ rotate: -25, opacity: 0 }} whileInView={{ rotate: 0, opacity: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}>
              {avatarUnavailable ? (
                <div className="avatar-placeholder" aria-label="Your avatar goes here. Add your photo as public/images/avatar.jpg.">
                  <ImagePlus size={37} strokeWidth={1.3} aria-hidden="true" />
                  <span className="eyebrow">YOUR AVATAR</span>
                  <code>public/images/avatar.jpg</code>
                </div>
              ) : (
                <img className="about-avatar" src={profile.avatar} alt={`Portrait of ${profile.name}`} onError={() => setAvatarUnavailable(true)} />
              )}
            </motion.div>
            <span className="about-side-note eyebrow">INTERNET CULTURE. HUMAN CONNECTION.</span>
          </div>
          <Reveal className="about-copy">
            <h2 id="about-title">There's a person<br />behind every<br /><span>wallet.</span></h2>
            <p className="about-lead">I'm a Web3 growth operator. I connect the dots between creators, projects, and the people who make them matter.</p>
            <p>My work brings together KOL growth, community acquisition, and culture-led promotion. Not growth for the screenshot. Growth that gives people a reason to show up, get involved, and stick around.</p>
            <div className="about-signoff"><span className="signoff-line" /><span className="eyebrow">LESS NOISE. MORE MEANING.</span></div>
          </Reveal>
        </section>

        <section className="impact section-shell" id="impact" aria-labelledby="impact-title">
          <div className="impact-inner">
            <Reveal className="impact-heading">
              <SectionLabel number="03">GROWTH, IN NUMBERS</SectionLabel>
              <h2 id="impact-title" className="sr-only">Web3 growth results</h2>
            </Reveal>
            <div className="impact-grid">
              {impactStats.map((stat, index) => (
                <motion.article
                  key={stat.id}
                  className="impact-stat"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="impact-stat-top">
                    <p className="impact-stat-label">{stat.label}</p>
                    <TrendingUp className="impact-trend" size={27} strokeWidth={2} aria-hidden="true" />
                  </div>
                  <h3 className="impact-stat-value">{stat.value}<span>+</span></h3>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <ProofOfWork />

        <section className="approach section-shell" id="approach" aria-labelledby="approach-title">
          <Reveal className="section-heading-row">
            <SectionLabel number="05">HOW I THINK. HOW I WORK.</SectionLabel>
            <div className="section-heading-copy">
              <h2 id="approach-title">A playbook.<br />Not a shot in the dark.</h2>
              <p>No copy-paste campaigns. A thoughtful process<br className="desktop-break" /> built around your people and your next move.</p>
            </div>
          </Reveal>
          <Reveal className="process">
            <div className="process-tabs" role="tablist" aria-label="The growth process">
              {processSteps.map((step, index) => (
                <button key={step.id} ref={(element) => { tabsRef.current[index] = element; }} type="button" role="tab" id={`process-tab-${step.id}`} aria-selected={activeStep === index} aria-controls="process-panel" tabIndex={activeStep === index ? 0 : -1} className={`process-tab ${activeStep === index ? 'selected' : ''}`} onClick={() => setActiveStep(index)} onKeyDown={(event) => handleTabKey(event, index)}>
                  <span className="process-tab-number">{step.number}</span><span>{step.name}</span><ArrowUpRight size={20} />
                </button>
              ))}
            </div>
            <div id="process-panel" className="process-panel" role="tabpanel" aria-labelledby={`process-tab-${currentStep.id}`} tabIndex={0}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={currentStep.id} className="process-panel-inner" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -7 }} transition={{ duration: 0.2 }}>
                  <div className="process-title"><p className="eyebrow">{currentStep.label}</p><h3>{currentStep.title.split('\n').map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h3><p className="process-takeaway">{currentStep.takeaway}</p></div>
                  <div className="process-description"><p>{currentStep.description}</p><ul>{currentStep.outputs.map((output) => <li key={output}><Check size={16} strokeWidth={1.7} />{output}</li>)}</ul></div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
          <div className="approach-bottom"><span className="eyebrow">THE GOAL ISN'T JUST TO GET SEEN. IT'S TO GET PEOPLE INVOLVED.</span><ArrowRight size={20} /></div>
        </section>

        <section className="contact section-shell" id="contact" aria-labelledby="contact-title">
          <Reveal>
            <SectionLabel number="06">YOUR NEXT CHAPTER</SectionLabel>
            <div className="contact-main">
              <h2 id="contact-title">LET'S BUILD<br />WHAT'S NEXT<span>.</span></h2>
              <div className="contact-copy">
                <p>A new project. An ambitious community.<br />A bigger vision. Let's give it momentum.</p>
                <div className="contact-actions">
                  <button type="button" className="contact-button" aria-label="Start a conversation" onClick={() => openInquiry()}><span>Start a conversation</span><span className="contact-arrow"><ArrowUpRight strokeWidth={1.3} /></span></button>
                  <div className="contact-socials" aria-label="Contact Lost Boy directly">
                    <a href={profile.xUrl} target="_blank" rel="noopener noreferrer">X / Twitter <ArrowUpRight size={14} /></a>
                    <a href={profile.telegramUrl} target="_blank" rel="noopener noreferrer">Telegram <ArrowUpRight size={14} /></a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <div className="footer-top"><a className="wordmark footer-wordmark" href="#top" aria-label={`${profile.name} home`}><Asterisk className="brand-star" /><span>{profile.name}<span className="wordmark-dot">.</span></span></a><p>Built for the culture. Focused on growth.</p><a className="back-to-top" href="#top">Back to top <ArrowUp size={16} /></a></div>
        <div className="footer-bottom"><p>&copy; {new Date().getFullYear()} {profile.name}</p><p>WEB3 GROWTH & COMMUNITY</p><button type="button" onClick={() => openInquiry()}>Good things start with a conversation <ArrowUpRight size={14} /></button></div>
      </footer>
      <ProjectDialog open={dialogOpen} onClose={() => setDialogOpen(false)} initialService={inquiryService} />
    </MotionConfig>
  );
}
