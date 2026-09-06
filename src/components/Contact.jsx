import { createElement, useRef, useState } from "react";
import { content } from "../Content";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import { HiOutlineExternalLink, HiOutlineClipboardCopy, HiCheck } from "react-icons/hi";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import useSpotlight from "../hooks/useSpotlight";

// EmailJS public credentials — safe to expose client-side, overridable via .env
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_wgxskzq";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_weexp5v";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "_UZn_qjMMTxP6n1Ax";

const fieldClass =
  "w-full rounded-xl border border-line bg-canvas/60 px-4 py-3 text-sm text-content " +
  "placeholder:text-content-dim transition-colors duration-300 focus:border-accent/60";

const Contact = () => {
  const { Contact: contact } = content;
  const form = useRef(null);
  const onSpotlight = useSpotlight();
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success("Email address copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy. Use the link instead.");
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    if (sending) return;

    setSending(true);
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY);
      form.current.reset();
      toast.success("Message sent — thanks for reaching out!");
    } catch (error) {
      console.error(error);
      toast.error("Could not send the message. Please email me directly.");
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
          eyebrow="Contact"
          title={contact.title}
          subtitle={contact.intro}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Channels */}
          <Reveal direction="right" className="flex flex-col">
            <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-content-dim">
              {contact.subtitle}
            </h3>

            <div className="mt-3 flex flex-col gap-2.5">
            {contact.social_media.map((item) => (
              <a
                key={item.label}
                href={item.link}
                target={item.link.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                onMouseMove={onSpotlight}
                className="card card-hover spotlight group flex items-center gap-3.5 p-3.5"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-overlay text-base text-accent-soft transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:text-accent-cyan">
                  {createElement(item.icon)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[0.62rem] uppercase tracking-[0.18em] text-content-dim">
                    {item.label}
                  </span>
                  <span className="block truncate text-sm font-medium text-content">
                    {item.text}
                  </span>
                </span>
                {item.label === "Email" ? (
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label="Copy email address"
                    title="Copy email address"
                    onClick={(e) => {
                      e.preventDefault();
                      copyEmail(item.text);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        copyEmail(item.text);
                      }
                    }}
                    className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-lg border border-line text-content-dim transition-colors duration-300 hover:border-accent/50 hover:text-accent"
                  >
                    {copied ? <HiCheck className="text-accent" /> : <HiOutlineClipboardCopy />}
                  </span>
                ) : (
                  <HiOutlineExternalLink className="shrink-0 text-content-dim transition-colors duration-300 group-hover:text-accent" />
                )}
              </a>
            ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal direction="left" delay={0.08} className="flex flex-col">
            <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-content-dim">
              {contact.formTitle}
            </h3>

            <div className="glass mt-3 flex flex-1 flex-col rounded-3xl p-6 sm:p-8">
            <form ref={form} onSubmit={sendEmail} className="flex flex-1 flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="from_name"
                    className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-content-dim"
                  >
                    Your name
                  </label>
                  <input
                    id="from_name"
                    type="text"
                    name="from_name"
                    autoComplete="name"
                    placeholder="Your Name"
                    required
                    className={fieldClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="user_email"
                    className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-content-dim"
                  >
                    Email address
                  </label>
                  <input
                    id="user_email"
                    type="email"
                    name="user_email"
                    autoComplete="email"
                    placeholder="you@gmail.com"
                    required
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <label
                  htmlFor="message"
                  className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-content-dim"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell me about the project, role or idea…"
                  required
                  className={`${fieldClass} min-h-[9rem] flex-1 resize-none`}
                />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button type="submit" disabled={sending} className="btn-primary group">
                  {sending ? "Sending…" : "Send message"
                  }
                  {!sending && (
                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                  )}
                </button>
                <p className="text-xs text-content-dim">
                  Usually replies within a day or two.
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
