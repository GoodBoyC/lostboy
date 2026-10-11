import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, ArrowUpRight, Check, Copy, Download, RotateCcw, X } from 'lucide-react';
import { profile, services } from '../data/portfolio';

type ProjectDraft = {
  name: string;
  email: string;
  project: string;
  service: string;
  budget: string;
  goal: string;
};

type ProjectDialogProps = {
  open: boolean;
  onClose: () => void;
  initialService: string;
};

const storageKey = 'growth-operator-project-draft-v1';
const emptyDraft: ProjectDraft = {
  name: '',
  email: '',
  project: '',
  service: '',
  budget: '',
  goal: '',
};

function readDraft(): ProjectDraft {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (!saved || typeof saved !== 'object') return emptyDraft;
    const cleanDraft = { ...emptyDraft };
    for (const key of Object.keys(emptyDraft) as (keyof ProjectDraft)[]) {
      const value = (saved as Record<string, unknown>)[key];
      if (typeof value === 'string') cleanDraft[key] = value;
    }
    return cleanDraft;
  } catch {
    return emptyDraft;
  }
}

function makeBrief(draft: ProjectDraft) {
  const service = services.find((item) => item.id === draft.service)?.shortTitle || 'Growth strategy';
  return [
    'LET\'S BUILD MOMENTUM',
    'Web3 growth project brief',
    '',
    `Name: ${draft.name.trim()}`,
    `Email: ${draft.email.trim()}`,
    `Project: ${draft.project.trim()}`,
    `Looking for: ${service}`,
    `Budget: ${draft.budget || 'Let\'s discuss'}`,
    '',
    'THE GOAL',
    draft.goal.trim(),
  ].join('\n');
}

export default function ProjectDialog({ open, onClose, initialService }: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const previewRef = useRef<HTMLTextAreaElement>(null);
  const [draft, setDraft] = useState<ProjectDraft>(readDraft);
  const [step, setStep] = useState<'form' | 'ready'>('form');
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'manual'>('idle');
  const [storageAvailable, setStorageAvailable] = useState(true);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      if (initialService) setDraft((current) => ({ ...current, service: initialService }));
      setStep('form');
      setCopyState('idle');
      if (!dialog.open) dialog.showModal();
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
    if (dialog.open) dialog.close();
  }, [open, initialService]);

  useEffect(() => {
    try {
      const hasValues = Object.values(draft).some(Boolean);
      if (hasValues) localStorage.setItem(storageKey, JSON.stringify(draft));
      else localStorage.removeItem(storageKey);
      setStorageAvailable(true);
    } catch {
      setStorageAvailable(false);
    }
  }, [draft]);

  useEffect(() => {
    if (copyState !== 'copied') return;
    const timer = window.setTimeout(() => setCopyState('idle'), 3000);
    return () => window.clearTimeout(timer);
  }, [copyState]);

  useEffect(() => {
    if (open && step === 'ready') headingRef.current?.focus({ preventScroll: true });
  }, [open, step]);

  function updateField(key: keyof ProjectDraft, value: string) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const goalInput = event.currentTarget.querySelector<HTMLTextAreaElement>('#inquiry-goal');
    if (draft.goal.trim().length < 20) {
      goalInput?.setCustomValidity('Please describe your goal in at least 20 characters, excluding extra spaces.');
      goalInput?.reportValidity();
      return;
    }
    setStep('ready');
    setCopyState('idle');
    dialogRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  }

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(makeBrief(draft));
      setCopyState('copied');
    } catch {
      previewRef.current?.focus();
      previewRef.current?.select();
      setCopyState('manual');
    }
  }

  function downloadBrief() {
    const file = new Blob([makeBrief(draft)], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(file);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${draft.project.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 60) || 'web3-project'}-brief.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function clearDraft() {
    setDraft({ ...emptyDraft });
    setStep('form');
    setCopyState('idle');
    window.requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLInputElement>('#inquiry-name')?.focus());
  }

  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="dialog-content">
        <button type="button" className="dialog-close icon-button" onClick={onClose} aria-label="Close project brief">
          <X size={23} />
        </button>
        <p className="eyebrow dialog-eyebrow">A GOOD CONVERSATION STARTS HERE</p>
        <h2 id="project-dialog-title" ref={headingRef} tabIndex={-1}>{step === 'form' ? "What's your next move?" : 'Your next move, on paper.'}</h2>
        {step === 'form' ? (
          <>
            <p className="dialog-intro">Tell me a little about what you're building. Let's turn the idea into a clear starting point.</p>
            <form onSubmit={handleSubmit} className="project-form">
              <div className="form-row">
                <label htmlFor="inquiry-name">
                  Your name <span aria-hidden="true">*</span>
                  <input id="inquiry-name" name="name" autoComplete="name" placeholder="What should I call you?" value={draft.name} onChange={(event) => updateField('name', event.target.value)} required maxLength={100} pattern=".*\S.*" />
                </label>
                <label htmlFor="inquiry-email">
                  Email address <span aria-hidden="true">*</span>
                  <input id="inquiry-email" name="email" type="email" autoComplete="email" placeholder="you@yourproject.xyz" value={draft.email} onChange={(event) => updateField('email', event.target.value)} required maxLength={150} />
                </label>
              </div>
              <label htmlFor="inquiry-project">
                Project or handle <span aria-hidden="true">*</span>
                <input id="inquiry-project" name="project" placeholder="Your project name, @handle, or website" value={draft.project} onChange={(event) => updateField('project', event.target.value)} required maxLength={200} pattern=".*\S.*" />
              </label>
              <div className="form-row">
                <label htmlFor="inquiry-service">
                  What do you need? <span aria-hidden="true">*</span>
                  <select id="inquiry-service" name="service" value={draft.service} onChange={(event) => updateField('service', event.target.value)} required>
                    <option value="" disabled>Select a focus</option>
                    {services.map((service) => <option key={service.id} value={service.id}>{service.shortTitle}</option>)}
                    <option value="growth-strategy">Let's figure it out together</option>
                  </select>
                </label>
                <label htmlFor="inquiry-budget">
                  Budget <span className="optional">(optional)</span>
                  <select id="inquiry-budget" name="budget" value={draft.budget} onChange={(event) => updateField('budget', event.target.value)}>
                    <option value="">Let's discuss</option>
                    <option value="Under $1,000 USD">Under $1,000 USD</option>
                    <option value="$1,000 - $5,000 USD">$1,000 - $5,000 USD</option>
                    <option value="$5,000 - $10,000 USD">$5,000 - $10,000 USD</option>
                    <option value="$10,000+ USD">$10,000+ USD</option>
                  </select>
                </label>
              </div>
              <label htmlFor="inquiry-goal">
                What's the goal? <span aria-hidden="true">*</span>
                <textarea id="inquiry-goal" name="goal" placeholder="Where are you now, where do you want to go, and when?" value={draft.goal} onChange={(event) => { event.target.setCustomValidity(''); updateField('goal', event.target.value); }} required minLength={20} maxLength={3000} rows={4} />
              </label>
              <p className="form-note">{storageAvailable ? 'Your draft stays in this browser.' : 'Browser storage is unavailable. Your draft lasts for this visit only.'} Nothing is sent. Create a brief to copy or download.</p>
              <button className="button button-dark form-submit" type="submit">Create my project brief <ArrowRight size={19} /></button>
              {Object.values(draft).some(Boolean) && <button className="clear-draft" type="button" onClick={clearDraft}>Clear saved draft</button>}
            </form>
          </>
        ) : (
          <div className="brief-result">
            <p className="dialog-intro">A little clarity goes a long way. Your project brief is ready to take into the conversation.</p>
            <label className="sr-only" htmlFor="brief-preview">Your generated project brief</label>
            <textarea id="brief-preview" ref={previewRef} className="brief-preview" readOnly value={makeBrief(draft)} rows={13} />
            <div className="brief-actions">
              <button type="button" className="button button-dark" onClick={copyBrief}>{copyState === 'copied' ? <Check size={18} /> : <Copy size={18} />}{copyState === 'copied' ? 'Copied to clipboard' : 'Copy brief'}</button>
              <button type="button" className="button button-outline" onClick={downloadBrief}><Download size={18} /> Download .txt</button>
            </div>
            <p className="copy-feedback" role="status" aria-live="polite">{copyState === 'copied' ? 'Your brief is copied and ready to share.' : copyState === 'manual' ? 'Automatic copy is unavailable. Your brief is selected above; use your device\'s copy command.' : ''}</p>
            {profile.email ? (
              <a className="text-link" href={`mailto:${profile.email}?subject=${encodeURIComponent(`Let's build: ${draft.project}`)}&body=${encodeURIComponent(makeBrief(draft))}`}>Open an email with your brief <ArrowUpRight size={18} /></a>
            ) : (
              <div className="dialog-contact">
                <p className="form-note">Nothing has been sent. Copy your brief, then share it in a message. Opening a profile will not send it automatically.</p>
                <div className="dialog-socials">
                  <a className="text-link" href={profile.telegramUrl} target="_blank" rel="noopener noreferrer">Message on Telegram <ArrowUpRight size={17} /></a>
                  <a className="text-link" href={profile.xUrl} target="_blank" rel="noopener noreferrer">Find Lost Boy on X <ArrowUpRight size={17} /></a>
                </div>
              </div>
            )}
            <div className="brief-bottom">
              <button type="button" className="text-link" onClick={() => setStep('form')}>Edit my brief <ArrowUpRight size={16} /></button>
              <button type="button" className="text-link" onClick={clearDraft}><RotateCcw size={14} /> Start fresh</button>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}