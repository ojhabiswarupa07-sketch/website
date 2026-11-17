import { motion, useReducedMotion } from 'motion/react';
import { Award, ExternalLink, Pencil, Plus, Trash2 } from 'lucide-react';
import { CertificateItem } from '../types/portfolio';

interface CertificatesSectionProps {
  certificates: CertificateItem[];
  onAddCertificate: () => void;
  onEditCertificate: (certificate: CertificateItem) => void;
  onDeleteCertificate: (id: string) => void;
}

export function CertificatesSection({
  certificates,
  onAddCertificate,
  onEditCertificate,
  onDeleteCertificate,
}: CertificatesSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="certificates" className="border-b border-white/10 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-violet-300">05. Certificates</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white [text-wrap:balance] sm:text-4xl">
              Certifications &amp; workshops
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              Space dedicated to verified course completions, technical workshops, and
              hackathon credentials as I earn them.
            </p>
          </div>

          <button
            type="button"
            onClick={onAddCertificate}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 px-4 py-2 text-xs font-semibold text-white transition-all duration-150 hover:from-purple-500 hover:to-violet-500 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Add Certificate</span>
          </button>
        </div>

        {certificates.length === 0 ? (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#0A0A0E] px-6 py-14 text-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-950/30 text-violet-300">
              <Award className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-white">
              Ready for upcoming certificates
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400">
              No certificates have been added yet. Add course completions, programming
              certifications, or technical workshop credentials anytime using the button
              below.
            </p>
            <button
              type="button"
              onClick={onAddCertificate}
              className="mt-6 inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-white/15 bg-[#050507] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:border-violet-400/50 hover:bg-violet-950/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <Plus className="h-3.5 w-3.5 text-violet-300" aria-hidden="true" />
              <span>Add First Certificate</span>
            </button>
          </motion.div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert, index) => (
              <motion.article
                key={cert.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(index * 0.04, 0.2),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0A0A0E] p-6 transition-colors hover:border-violet-500/45"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium text-violet-300">
                        {cert.issuer}
                        {cert.issueDate ? ` · ${cert.issueDate}` : ''}
                      </p>
                      <h3 className="mt-1.5 font-display text-lg font-semibold text-white">
                        {cert.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => onEditCertificate(cert)}
                        aria-label={`Edit ${cert.title}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                      >
                        <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteCertificate(cert.id)}
                        aria-label={`Remove ${cert.title}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-rose-500/10 hover:text-rose-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  {cert.notes ? (
                    <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                      {cert.notes}
                    </p>
                  ) : null}
                </div>

                {cert.credentialUrl ? (
                  <div className="mt-5 border-t border-white/10 pt-4">
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-300 transition-colors hover:text-violet-200"
                    >
                      <span>View Credential</span>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                ) : null}
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
