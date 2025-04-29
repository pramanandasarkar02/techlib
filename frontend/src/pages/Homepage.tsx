
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/themeContext";





type Props = {};

const Homepage = (props: Props) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const navigateExplore = () => {
    navigate("/explore");
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Discover & Share Knowledge
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          A free and open source platform to discover and share a wide range of documents.
        </p>
        <button
          onClick={navigateExplore}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-lg transition-colors duration-300"
        >
          Get Started
        </button>
      </main>

      {/* Footer */}
      <footer className={`py-6 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Document Sharing Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;