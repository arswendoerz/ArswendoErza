import { createElement, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import { HiOutlineExternalLink, HiOutlineClipboardCopy, HiCheck } from "react-icons/hi";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import useSpotlight from "../hooks/useSpotlight";
import { useContent } from "../hooks/useLanguage";

// EmailJS public credentials — safe to expose client-side, overridable via .env
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_wgxskzq";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_weexp5v";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "_UZn_qjMMTxP6n1Ax";

const fieldClass =
  "w-full rounded-xl border border-line bg-canvas/60 px-4 py-3 text-sm text-content " +
  "placeholder:text-content-dim transition-colors duration-300 focus:border-accent/60";

const Contact = () => {
  const { Contact: contact, ui } = useContent();
  const t = ui.contact;
  const form = useRef(null);
  const onSpotlight = useSpotlight();
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success(t.copied);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(t.copyFailed);
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    if (sending) return;

    setSending(true);
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY);
      form.current.reset();
      toast.success(t.sent);
    } catch (error) {
      console.error(error);
      toast.error(t.sendFailed);
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-line-soft py-24 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[28rem] bg-gradient-to-t from-accent/10 to-transparent"
      />
      <div
        aria-hidden="true"
        className="glow left-1/2 top-10 -z-10 h-80 w-[45rem] -translate-x-1/2 bg-accent-cyan/10 blur-[130px]"
      />

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "rgb(var(--c-surface-2))",
            color: "rgb(var(--c-text))",
            border: "1px solid rgb(var(--c-line))",
            fontSize: "0.85rem",
          },
        }}
      />

      <div className="container-x">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={contact.title}
          subtitle={contact.intro}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Channels */}
          <Reveal direction="right" className="flex flex-col">
            <h3 className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-content-dim">
              {contact.subtitle}
            </h3>

            <div className="mt-3 flex flex-col gap-2.5">
            {/* The card is a plain container: the link stretches over it via
                ::after, and the copy button sits above that overlay as a
                sibling, so no interactive element is nested inside another. */}
            {contact.social_media.map((item) => (
              <div
                key={item.label}
                onMouseMove={onSpotlight}
                className="card card-hover spotlight group flex items-center gap-3.5 p-3.5 focus-within:border-accent/40"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-overlay text-base text-accent-soft transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:text-accent-cyan">
                  {createElement(item.icon)}
                </span>
                <a
                  href={item.link}
                  target={item.link.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="min-w-0 flex-1 after:absolute after:inset-0 after:rounded-2xl"
                >
                  <span className="block font-mono text-[0.72rem] uppercase tracking-[0.18em] text-content-dim">
                    {item.label}
                  </span>
                  <span className="block truncate text-sm font-medium text-content">
                    {item.text}
                  </span>
                </a>
                {item.label === "Email" ? (
                  <button
                    type="button"
                    aria-label={t.copy}
                    title={t.copy}
                    onClick={() => copyEmail(item.text)}
                    className="relative z-10 grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-lg border border-line text-content-dim transition-colors duration-300 hover:border-accent/50 hover:text-accent"
                  >
                    {copied ? <HiCheck className="text-accent" /> : <HiOutlineClipboardCopy />}
                  </button>
                ) : (
                  <HiOutlineExternalLink
                    aria-hidden="true"
                    className="shrink-0 text-content-dim transition-colors duration-300 group-hover:text-accent"
                  />
                )}
              </div>
            ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal direction="left" delay={0.08} className="flex flex-col">
            <h3 className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-content-dim">
              {contact.formTitle}
            </h3>

            <div className="glass mt-3 flex flex-1 flex-col rounded-3xl p-6 sm:p-8">
            <form ref={form} onSubmit={sendEmail} className="flex flex-1 flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="from_name"
                    className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-content-dim"
                  >
                    {t.name}
                  </label>
                  <input
                    id="from_name"
                    type="text"
                    name="from_name"
                    autoComplete="name"
                    placeholder={t.namePlaceholder}
                    required
                    className={fieldClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="user_email"
                    className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-content-dim"
                  >
                    {t.email}
                  </label>
                  <input
                    id="user_email"
                    type="email"
                    name="user_email"
                    autoComplete="email"
                    placeholder={t.emailPlaceholder}
                    required
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <label
                  htmlFor="message"
                  className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-content-dim"
                >
                  {t.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder={t.messagePlaceholder}
                  required
                  className={`${fieldClass} min-h-[9rem] flex-1 resize-none`}
                />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button type="submit" disabled={sending} className="btn-primary group">
                  {sending ? t.sending : t.send}
                  {!sending && (
                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                  )}
                </button>
                <p className="text-xs text-content-dim">
                  {t.replyTime}
                </p>
              </div>
            </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
