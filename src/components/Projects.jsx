import { useState, useEffect } from "react";
import { content } from "../Content";

const Projects = () => {
  const { Projects } = content;

  // State untuk jumlah item per page
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);

  // Update itemsPerPage saat resize window
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(2); // mobile < md: 2 item per page
      } else {
        setItemsPerPage(4); // laptop dan desktop: 4 item per page (2x2 grid)
      }
    };

    handleResize(); // cek saat pertama kali mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(Projects.project_content.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProjects = Projects.project_content.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const openModal = (project) => {
    setActiveProject(project);
    setIsOpen(true);
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const openZoomModal = (image) => {
    setZoomedImage(image);
  };

  const closeZoomModal = () => {
    setZoomedImage(null);
  };

  return (
    <section className="bg-bg_light_primary" id="projects">
      <div className="container mx-auto px-5 pt-14 min-h-screen flex flex-col justify-start">
        {/* Title & Subtitle */}
        <div>
          <h2 className="title" data-aos="fade-down">
            {Projects.title}
          </h2>
          <h4 className="subtitle" data-aos="fade-down">
            {Projects.subtitle}
          </h4>
          <br />
        </div>

        {/* Project Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 w-full"
          data-aos="fade-up"
        >
          {visibleProjects.map((project, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-5 border-b-8 border-[#FAF9FD] h-fit shadow"
            >
              <img
                src={project.image}
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
        </div>

        {/* Pagination Controls */}
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
          <div className="bg-white w-full max-w-screen-lg sm:w-[90%] h-[90vh] rounded-xl p-4 sm:p-6 relative overflow-hidden flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-2xl font-bold text-gray-700 hover:text-black"
            >
              ×
            </button>

            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center">
              {activeProject.title}
            </h3>

            {/* Scrollable Image Container */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {Array.isArray(activeProject.images) ? (
                  activeProject.images.map((image, idx) => (
                    <img
                      key={idx}
                      src={image}
                      alt={`Project Image ${idx + 1}`}
                      className="w-full h-40 sm:h-48 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => openZoomModal(image)}
                    />
                  ))
                ) : (
                  <img
                    src={activeProject.image}
                    alt="Project Image"
                    className="w-full h-40 sm:h-48 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => openZoomModal(activeProject.image)}
                  />
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
            {/* Close Button */}
            <button
              onClick={closeZoomModal}
              className="absolute top-2 right-2 text-2xl font-bold text-white hover:text-gray-300"
            >
              ×
            </button>
            <img
              src={zoomedImage}
              alt="Zoomed Project Image"
              className="w-full h-full object-contain rounded-md"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;