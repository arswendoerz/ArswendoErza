import { createElement, useRef } from "react";
import { content } from "../Content";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  const { Contact } = content;
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_wgxskzq',
        'template_weexp5v',
        form.current,
        '_UZn_qjMMTxP6n1Ax'
      )
      .then(
        (result) => {
          console.log(result.text);
          form.current.reset();
          toast.success("Email sent successfully!");
        },
        (error) => {
          console.log(error.text);
          toast.error("Failed to send email.");
        }
      );
  };

  return (
    <section
      className="bg-dark_primary text-white h-[100dvh] overflow-hidden flex flex-col justify-between"
      id="contact"
    >
      <Toaster />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 flex flex-col justify-center">
        {/* Title */}
        <div className="text-center" data-aos="fade-down">
          <h2 className="title !text-white">{Contact.title}</h2>
          <h4 className="subtitle">{Contact.subtitle}</h4>
        </div>

        {/* Form & Social */}
        <div className="flex flex-col md:flex-row gap-10 mt-8">
          {/* Form */}
          <form
            ref={form}
            onSubmit={sendEmail}
            data-aos="fade-up"
            className="flex-1 flex flex-col gap-5"
          >
            <input
              type="text"
              name="from_name"
              placeholder="Name"
              required
              className="border border-slate-600 p-3 rounded bg-white text-black"
            />
            <input
              type="email"
              name="user_email"
              pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{1,63}$"
              placeholder="Email Id"
              required
              className="border border-slate-600 p-3 rounded bg-white text-black"
            />
            <textarea
              name="message"
              placeholder="Message"
              className="border border-slate-600 p-3 rounded h-32 resize-none bg-white text-black"
              required
            ></textarea>
            <button className="btn self-start bg-white text-dark_primary">
              Submit
            </button>
          </form>

          {/* Social Links */}
          <div className="flex-1 flex flex-col gap-5 justify-center">
            {Contact.social_media.map((content, i) => (
              <div
                key={i}
                data-aos="fade-down"
                data-aos-delay={i * 300}
                className="flex items-center gap-3"
              >
                <h4 className="text-white text-xl">{createElement(content.icon)}</h4>
                <a
                  href={content.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-Poppins underline hover:text-slate-300"
                >
                  {content.text}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-3 text-center bg-white border-t border-slate-700">
        <h6 className="mb-1 text-sm">Arswendo Erza Sadewa</h6>
        <p className="text-xs text-gray-400">All CopyRights Reserved 2025</p>
      </footer>
    </section>
  );
};

export default Contact;
