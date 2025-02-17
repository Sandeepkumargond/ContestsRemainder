import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  const linkedInURL = "https://www.linkedin.com/in/sandeep-kumar-gond-2b6280290";
  const instaURL = "https://www.instagram.com/sandeepkr_04/";
  const githubURL = "https://github.com/Sandeepkumargond";

  return (
    <footer className="bg-gray-800 text-white mt-5 py-6">
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold mb-4">Connect with me!</p>
        <div className="flex justify-center gap-6">
          <a
            href={linkedInURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-400 transition duration-300"
          >
            <FaLinkedin size={28} />
          </a>
          <a
            href={instaURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-400 transition duration-300"
          >
            <FaInstagram size={28} />
          </a>
          <a
            href={githubURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-300 transition duration-300"
          >
            <FaGithub size={28} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
