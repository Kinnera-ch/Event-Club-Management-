import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [eventsRes, clubsRes] = await Promise.all([
                api.get('/events'),
                api.get('/clubs')
            ]);
            setEvents(eventsRes.data);
            setClubs(clubsRes.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addEvent = async (newEvent) => {
        const res = await api.post('/events', newEvent);
        setEvents([...events, res.data]);
    };

    const deleteEvent = async (id) => {
        await api.delete(`/events/${id}`);
        setEvents(events.filter(e => e.id !== id));
    };

    const addClub = async (newClub) => {
        const res = await api.post('/clubs', newClub);
        setClubs([...clubs, res.data]);
    };

    const deleteClub = async (id) => {
        await api.delete(`/clubs/${id}`);
        setClubs(clubs.filter(c => c.id !== id));
    };

    return (
        <DataContext.Provider value={{ events, clubs, loading, addEvent, deleteEvent, addClub, deleteClub }}>
            {children}
        </DataContext.Provider>
    );
};
