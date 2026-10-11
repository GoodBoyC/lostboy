import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, FileImage, X } from 'lucide-react';
import { proofScreenshots } from '../data/portfolio';
import { Reveal, SectionLabel } from './Reveal';

type LoadedProof = (typeof proofScreenshots)[number];

export default function ProofOfWork() {
  const [availableProofs, setAvailableProofs] = useState<LoadedProof[]>([]);
  const [checkingFolder, setCheckingFolder] = useState(true);
  const [selectedProof, setSelectedProof] = useState<LoadedProof | null>(null);
  const viewerRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function checkProofs() {
      const results = await Promise.all(proofScreenshots.map(async (proof) => {
        try {
          const response = await fetch(proof.src, { method: 'HEAD' });
          const contentType = response.headers.get('content-type') || '';
          return response.ok && contentType.startsWith('image/') ? proof : null;
        } catch {
          return null;
        }
      }));

      if (cancelled) return;
      setAvailableProofs(results.filter((proof): proof is LoadedProof => proof !== null));
      setCheckingFolder(false);
    }

    void checkProofs();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const dialog = viewerRef.current;
    if (!dialog) return;
    if (selectedProof && !dialog.open) dialog.showModal();
    else if (!selectedProof && dialog.open) dialog.close();
  }, [selectedProof]);

  return (
    <section className="proof section-shell" id="proof" aria-labelledby="proof-title">
      <div className="proof-inner">
        <Reveal className="proof-heading-row">
          <SectionLabel number="04">SELECTED SCREENSHOTS</SectionLabel>
          <div className="proof-heading-copy">
            <h2 id="proof-title">The work.<br />In the wild.</h2>
            <p>A closer look at the work behind the growth.</p>
          </div>
        </Reveal>

        {availableProofs.length > 0 ? (
          <div className="proof-grid" aria-label="Portfolio work screenshots">
            {availableProofs.map((proof, index) => (
              <Reveal key={proof.id} className={`proof-figure-wrap ${index === 0 ? 'proof-featured' : ''}`} delay={index * 0.05}>
                <figure className="proof-figure">
                  <button type="button" className="proof-open" onClick={() => setSelectedProof(proof)} aria-label={`Open proof screenshot ${proof.label}`}>
                    <span className="proof-image-stage">
                      <img className="proof-image" src={proof.src} alt={`Proof of work screenshot ${proof.label}`} loading="lazy" />
                      <span className="proof-zoom" aria-hidden="true"><span>VIEW PROOF</span><ArrowUpRight size={17} /></span>
                    </span>
                    <span className="proof-caption"><span>WORK / {proof.label}</span><ArrowUpRight size={15} aria-hidden="true" /></span>
                  </button>
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className={`proof-empty ${checkingFolder ? 'is-checking' : ''}`}>
            <FileImage className="proof-empty-icon" size={31} strokeWidth={1.3} aria-hidden="true" />
            <div className="proof-empty-copy">
              <p className="eyebrow">{checkingFolder ? 'OPENING THE ARCHIVE' : 'READY FOR YOUR SCREENSHOTS'}</p>
              <p>{checkingFolder ? 'Checking the proof-of-work folder.' : 'Add your screenshot proofs and they will appear here automatically.'}</p>
            </div>
            <span className="proof-folder">public/images/proof-of-work/</span>
            {!checkingFolder && <span className="proof-filenames">01.png &middot; 02.png &middot; 03.png &middot; ... &middot; 06.png</span>}
          </div>
        )}
      </div>

      <dialog
        ref={viewerRef}
        className="proof-viewer"
        aria-label={selectedProof ? `Work proof ${selectedProof.label}` : 'Work proof image'}
        onCancel={(event) => { event.preventDefault(); setSelectedProof(null); }}
        onClick={(event) => { if (event.target === event.currentTarget) setSelectedProof(null); }}
      >
        <button type="button" className="proof-viewer-close" onClick={() => setSelectedProof(null)} aria-label="Close full-size screenshot"><X size={23} /></button>
        {selectedProof && (
          <figure className="proof-viewer-figure">
            <img src={selectedProof.src} alt={`Full-size proof of work screenshot ${selectedProof.label}`} />
            <figcaption className="eyebrow">WORK / {selectedProof.label}</figcaption>
          </figure>
        )}
      </dialog>
    </section>
  );
}