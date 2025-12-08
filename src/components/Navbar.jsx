import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-primary">EventClub</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to="/events" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Events</Link>
                        <Link to="/clubs" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Clubs</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
