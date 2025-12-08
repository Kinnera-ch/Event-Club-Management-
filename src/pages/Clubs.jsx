import { Link } from 'react-router-dom';
import { useData } from '../context/DataProvider';

const Clubs = () => {
    const { clubs, deleteClub } = useData();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">All Clubs</h1>
                <Link to="/clubs/new" className="bg-primary text-white px-4 py-2 rounded hover:bg-indigo-700">Create Club</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clubs.map(club => (
                    <div key={club.id} className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
                        <img src={club.image} alt={club.name} className="w-full h-48 object-cover" />
                        <div className="p-4 flex-grow">
                            <h2 className="text-xl font-semibold mb-2">{club.name}</h2>
                            <p className="text-gray-600 mb-2">{club.members} Members</p>
                            <p className="text-gray-500 text-sm line-clamp-2">{club.description}</p>
                        </div>
                        <div className="p-4 border-t flex justify-end space-x-2">
                            <Link to={`/clubs/edit/${club.id}`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                            <button onClick={() => deleteClub(club.id)} className="text-red-600 hover:text-red-900">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Clubs;
