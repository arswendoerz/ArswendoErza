import { useState, useEffect } from "react";
import { content } from "../Content";
import { AnimatePresence, motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const Projects = () => {
  const { Projects } = content;

  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    AOS.init({ duration: 800 });
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(4);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    AOS.refresh(); // ⬅️ Ini menyegarkan AOS saat currentPage berubah
  }, [currentPage]);

  const totalPages = Math.ceil(Projects.project_content.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProjects = Projects.project_content.slice(startIndex, startIndex + itemsPerPage);

  const openModal = (project) => {
    setActiveProject(project);
    setIsOpen(true);
  };

  const prevPage = () => {
    setDirection(-1);
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const nextPage = () => {
    setDirection(1);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const openZoomModal = (image) => setZoomedImage(image);
  const closeZoomModal = () => setZoomedImage(null);

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

  return (
    <section className="bg-bg_light_primary" id="projects">
      <div className="container mx-auto px-5 pt-14 min-h-screen flex flex-col justify-start">
        <div>
          <h2 className="title" data-aos="fade-down">
            {Projects.title}
          </h2>
          <h4 className="subtitle" data-aos="fade-down">
            {Projects.subtitle}
          </h4>
          <br />
        </div>

        {/* Project Grid with Animation + AOS inside */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={direction}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 w-full group"
          >
            {visibleProjects.map((project, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="bg-white rounded-3xl p-5 border-b-8 border-[#FAF9FD] h-fit shadow 
                           group-hover:blur-sm hover:!blur-none transition duration-300"
              >
                <img
                  src={
                    Array.isArray(project.images)
                      ? project.images[0]
                      : project.image
                  }
                  alt={project.title}
                  className="w-full h-40 sm:h-48 object-cover rounded-md mb-3"
                />
                <div className="flex flex-col gap-1">
                  <h5 className="font-bold font-Poppins">{project.title}</h5>
                  <button
                    onClick={() => openModal(project)}
                    className="font-bold text-gray-600 self-end text-sm"
                  >
                    READ MORE
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mb-8">
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

      {/* Modal */}
      {isOpen && activeProject && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-screen-lg sm:w-auto h-[90vh] rounded-xl p-4 sm:p-6 relative overflow-hidden flex flex-col">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-2xl font-bold text-gray-700 hover:text-black"
            >
              ×
            </button>

            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center">
              {activeProject.title}
            </h3>

            {/* Scrollable Images with Hover Blur */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 group">
                {Array.isArray(activeProject.images) ? (
                  activeProject.images.map((image, idx) => (
                    <div
                      key={idx}
                      className="w-full overflow-hidden rounded-md bg-gray-100 
                                 group-hover:blur-sm hover:!blur-none transition duration-300"
                    >
                      <img
                        src={image}
                        alt={`Project Image ${idx + 1}`}
                        className="w-full h-auto max-h-[60vh] object-contain cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => openZoomModal(image)}
                      />
                    </div>
                  ))
                ) : (
                  <div className="w-full overflow-hidden rounded-md bg-gray-100">
                    <img
                      src={activeProject.image}
                      alt="Project Image"
                      className="w-full h-auto max-h-[60vh] object-contain cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => openZoomModal(activeProject.image)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Zoom Modal */}
      {zoomedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4">
          <div className="relative max-w-[90%] max-h-[90%]">
            <button
              onClick={closeZoomModal}
              className="absolute top-2 right-2 text-2xl font-bold text-white hover:text-gray-300"
            >
              ×
            </button>
            <img
              src={zoomedImage}
              alt="Zoomed Project Image"
              className="max-w-full max-h-full object-contain rounded-md"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
