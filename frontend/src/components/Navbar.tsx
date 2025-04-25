
import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/userContext';

// Import the ThemeContext we defined earlier

type Props = {}

const Navbar = (props: Props) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`flex justify-between items-center px-4 py-4 md:px-20 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-slate-200 text-gray-900'}`}>
      <Link 
        to="/" 
        className="text-3xl font-bold hover:text-blue-600 transition-all"
      >
        Techlib
      </Link>
      
      <div className="flex items-center gap-6 font-semibold">
        <ul className='flex gap-4 md:gap-6'>
          <li>
            <Link 
              to="/explore" 
              className="hover:underline underline-offset-4 transition-all"
            >
              Explore
            </Link>
          </li>
          <li>
            <Link 
              to="/collection" 
              className="hover:underline underline-offset-4 transition-all"
            >
              Collection
            </Link>
          </li>            
          <li>
            <Link 
              to="/profile" 
              className="hover:underline underline-offset-4 transition-all"
            >
              Profile
            </Link>
          </li>
          
        </ul>

        <button 
          onClick={toggleTheme}
          className={`ml-4 p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'}`}
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? (
            <span>🌞</span> // Sun icon for light mode
          ) : (
            <span>🌙</span> // Moon icon for dark mode
          )}
        </button>
      </div>
    </nav>
  )
}

export default Navbar