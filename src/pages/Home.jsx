import { useData } from '../context/DataProvider';

const Home = () => {
    const { events, clubs } = useData();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Event Club Management</h1>
                <p className="text-xl text-gray-600">Discover amazing events and join exciting clubs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Featured Events</h2>
                    <p className="text-gray-600 mb-4">Check out the latest events happening around you.</p>
                    <div className="space-y-4">
                        {events.slice(0, 2).map(event => (
                            <div key={event.id} className="border-b pb-2">
                                <h3 className="font-semibold">{event.title}</h3>
                                <p className="text-sm text-gray-500">{event.date}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Popular Clubs</h2>
                    <p className="text-gray-600 mb-4">Join clubs that match your interests.</p>
                    <div className="space-y-4">
                        {clubs.slice(0, 2).map(club => (
                            <div key={club.id} className="border-b pb-2">
                                <h3 className="font-semibold">{club.name}</h3>
                                <p className="text-sm text-gray-500">{club.members} members</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
