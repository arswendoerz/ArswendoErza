import { useState, useEffect, useRef } from "react";
import { content } from "../Content";
import { motion, useInView } from "framer-motion";

const Hero = () => {
  const { hero } = content;

  const [typedText, setTypedText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const typingSpeed = 100;
  const indexRef = useRef(0);
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, { once: true, threshold: 0.3 });

  useEffect(() => {
    const title = hero.title;
    setTypedText("");
    indexRef.current = 0;

    const typingInterval = setInterval(() => {
      const currentIndex = indexRef.current;
      if (currentIndex < title.length) {
        const nextChar = title.charAt(currentIndex);
        setTypedText((prev) => prev + nextChar);
        indexRef.current += 1;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [hero.title]);

  useEffect(() => {
    if (isInView) setIsVisible(true);
  }, [isInView]);

  return (
    <section id="home" className="overflow-hidden" ref={sectionRef}>
      <div className="min-h-screen flex flex-col-reverse md:flex-row items-center md:items-end justify-center relative">
        {/* Background Title */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute inset-y-0 right-0 w-full md:w-4/12 bg-primaryLinear -z-10"
        >
          <h1 className="rotate-90 md:block hidden absolute top-1/2 right-[10%] -translate-y-1/2 text-[#EAF2FA] text-[clamp(3rem,11vw,7rem)] leading-none font-bold">
            {hero.firstName}{" "}
            <span className="text-dark_primary">{hero.LastName}</span>
          </h1>
        </motion.div>

        {/* First Column (Text) */}
        <div className="w-full max-w-xl px-4 sm:px-8 pt-8 pb-16 md:pt-10 z-10">
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark_primary min-h-[3.5rem] text-center md:text-left">
            {typedText}
            <span className="border-r-2 border-dark_primary animate-pulse ml-1" />
          </h2>

          {/* Tombol Contact Me */}
          <div className="mt-6 flex justify-center md:justify-start">
            <a
              href="#contact"
              className="btn transition duration-300 ease-in-out hover:bg-primary hover:scale-105 hover:shadow-lg">
              {hero.btnText}
            </a>
          </div>

          {/* Konten */}
          <div className="flex flex-col gap-6 mt-10">
            {hero.hero_content.map((content, i) => (
              <div
                key={i}
                style={{ transitionDelay: `${i * 100}ms` }}
                className={`flex items-start gap-4 transform transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-primary">
                  {content.count}
                </h3>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  {content.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Second Column (Image) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full md:w-1/2 h-[24rem] md:h-[60rem]"
        >
          <img
            src={hero.image}
            alt="..."
            className="h-full w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
