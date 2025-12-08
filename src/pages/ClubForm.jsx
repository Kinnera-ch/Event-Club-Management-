import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../context/DataProvider';
import api from '../services/api';

const ClubForm = () => {
    const { addClub, clubs } = useData();
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: '',
        members: 0
    });

    useEffect(() => {
        if (isEdit) {
            const club = clubs.find(c => c.id === id);
            if (club) {
                setFormData(club);
            } else {
                api.get(`/clubs/${id}`).then(res => setFormData(res.data)).catch(console.error);
            }
        }
    }, [id, clubs, isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEdit) {
            await api.put(`/clubs/${id}`, formData);
        } else {
            await addClub(formData);
        }
        navigate('/clubs');
        window.location.reload();
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8">{isEdit ? 'Edit Club' : 'Create Club'}</h1>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input type="url" name="image" value={formData.image} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Members Count</label>
                    <input type="number" name="members" value={formData.members} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-2 border"></textarea>
                </div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    {isEdit ? 'Update Club' : 'Create Club'}
                </button>
            </form>
        </div>
    );
};

export default ClubForm;
