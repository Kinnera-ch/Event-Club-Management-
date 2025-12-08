import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../context/DataProvider';
import api from '../services/api';

const EventForm = () => {
    const { addEvent, events } = useData();
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        title: '',
        date: '',
        location: '',
        description: '',
        image: '',
        category: ''
    });

    useEffect(() => {
        if (isEdit) {
            const event = events.find(e => e.id === id);
            if (event) {
                setFormData(event);
            } else {
                // Fetch if not in context (e.g. page refresh)
                api.get(`/events/${id}`).then(res => setFormData(res.data)).catch(console.error);
            }
        }
    }, [id, events, isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEdit) {
            await api.put(`/events/${id}`, formData);
            // We might need to refresh context or update it manually. 
            // For simplicity, we'll just navigate and let context refresh on mount or we should update context.
            // Ideally DataProvider should have updateEvent.
            // Let's just reload window or handle it better. 
            // For now, simple navigation.
        } else {
            await addEvent(formData);
        }
        navigate('/events');
        window.location.reload(); // Force reload to fetch fresh data
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8">{isEdit ? 'Edit Event' : 'Create Event'}</h1>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input type="url" name="image" value={formData.image} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input type="text" name="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border"></textarea>
                </div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    {isEdit ? 'Update Event' : 'Create Event'}
                </button>
            </form>
        </div>
    );
};

export default EventForm;
