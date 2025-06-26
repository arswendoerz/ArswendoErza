import { createElement, useState, useEffect } from "react";
import { content } from "../Content";
import Modal from "react-modal";
import { AnimatePresence, motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "23rem",
    width: "90%",
  },
  overlay: {
    padding: "2rem",
  },
};
Modal.setAppElement("#root");

const Skills = () => {
  const { skills } = content;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectSkill, setSelectSkill] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(6);

  useEffect(() => {
    const updateCardsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsPerPage(5);
      } else if (width < 1024) {
        setCardsPerPage(4);
      } else {
        setCardsPerPage(6);
      }
    };

    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = skills.skills_content.slice(
    indexOfFirstCard,
    indexOfLastCard
  );
  const totalPages = Math.ceil(skills.skills_content.length / cardsPerPage);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const nextPage = () => {
    setDirection(1);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setDirection(-1);
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const slideVariants = {
    initial: (dir) => ({
      opacity: 0,
      x: dir > 0 ? 50 : -50,
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -50 : 50,
      transition: { duration: 0.4 },
    }),
  };

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <section className="min-h-fit bg-bg_light_primary" id="skills">
      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="flex items-center gap-3">
          {selectSkill?.logo &&
            createElement(selectSkill.logo, {
              className: "text-3xl text-blue-600",
            })}
          <h6 className="text-lg font-semibold">{selectSkill?.name}</h6>
        </div>
        <br />
        <ul className="list-decimal px-4 font-Poppins sm:text-sm text-xs !leading-7">
          {selectSkill?.details?.map((item, idx) => (
            <li key={idx}>{item}</li>
          )) || <li>No additional details available.</li>}
        </ul>
        <br />
        <div className="flex justify-end">
          <button onClick={closeModal} className="btn">
            Close
          </button>
        </div>
      </Modal>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="title text-center" data-aos="fade-down">
          {skills.title}
        </h2>
        <h4 className="subtitle text-center" data-aos="fade-down">
          {skills.subtitle}
        </h4>
        <br />

        {/* Cards */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={direction}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 group"
          >
            {currentCards.map((skill, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="bg-white relative w-full p-5 rounded-lg border border-slate-200 shadow-sm hover:shadow-xl 
                transition-all duration-300 ease-out hover:-translate-y-1 cursor-pointer flex items-start gap-4 
                group-hover:blur-sm hover:!blur-none"
              >
                <div>
                  {createElement(skill.logo, {
                    className:
                      "text-4xl text-blue-600 transition-transform duration-200 group-hover:scale-125",
                  })}
                </div>
                <div className="flex-1">
                  <h6 className="text-base sm:text-lg font-semibold">
                    {skill.name}
                  </h6>
                  <p className="italic text-sm text-gray-600">{skill.para}</p>
                </div>
                <div
                  onClick={() => {
                    setSelectSkill(skill);
                    openModal();
                  }}
                  className="text-xl absolute top-3 right-3 cursor-pointer text-slate-500 hover:text-slate-800 transition"
                >
                  {createElement(skills.icon)}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-10 flex-wrap">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="btn disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="btn disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Skills;
