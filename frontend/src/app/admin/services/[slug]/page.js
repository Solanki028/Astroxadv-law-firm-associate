"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/utils/api';
import { FaTrash, FaPlus, FaImage, FaList } from 'react-icons/fa';
import ImageUpload from '@/components/ImageUpload';

export default function AdminServiceDetail() {
    const { slug } = useParams();
    const [service, setService] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    // Core Expertise Add State
    const [newItem, setNewItem] = useState({
        title: '',
        description: '',
        imageUrl: '',
        tools: ''
    });
    const [addingItem, setAddingItem] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(`/services/${slug}`);
                setService(res.data.service);
                setItems(res.data.items);
            } catch (error) {
                console.error('Error fetching service:', error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchData();
    }, [slug]);

    const handleServiceUpdate = async () => {
        setSaving(true);
        setMessage('');
        try {
            await api.put(`/services/${slug}`, service);
            setMessage('Service details updated!');
        } catch (error) {
            setMessage('Error updating service.');
        } finally {
            setSaving(false);
        }
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        if (!newItem.imageUrl.trim() || !newItem.title.trim()) {
            setMessage('Error: Title and Image are required for Core Expertise items.');
            return;
        }

        setAddingItem(true);
        try {
            const toolsArray = newItem.tools 
                ? newItem.tools.split(',').map(t => t.trim()).filter(t => t) 
                : [];
                
            const payload = {
                title: newItem.title.trim(),
                description: newItem.description.trim(),
                imageUrl: newItem.imageUrl.trim(),
                tools: toolsArray,
                year: ''
            };
            
            const res = await api.post(`/services/${slug}/items`, payload);
            setItems([...items, res.data]);
            setNewItem({ title: '', description: '', imageUrl: '', tools: '' });
            setMessage('Expertise item added successfully!');
        } catch (error) {
            console.error(error);
            setMessage('Error adding expertise item.');
        } finally {
            setAddingItem(false);
        }
    };

    const handleDeleteItem = async (id) => {
        if (!confirm('Are you sure you want to delete this expertise item?')) return;
        try {
            await api.delete(`/services/items/${id}`);
            setItems(items.filter(item => item._id !== id));
            setMessage('Expertise item deleted.');
        } catch (error) {
            setMessage('Error deleting item.');
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;
    if (!service) return <div className="p-8">Practice Area not found.</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-brand-red mb-8">Edit Practice Area: {service.title}</h1>

            {message && (
                <div className={`mb-6 p-4 rounded ${message.includes('Error') ? 'bg-red-900/30 text-red-400' : 'bg-green-900/30 text-green-400'}`}>
                    {message}
                </div>
            )}

            {/* Edit Service Details */}
            <div className="bg-brand-gray p-6 rounded-lg border border-brand-dark mb-8">
                <h2 className="text-xl font-bold text-brand-text mb-6 border-b border-gray-700 pb-2">Main Content</h2>
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-brand-text mb-2">Title</label>
                        <input
                            type="text"
                            value={service.title || ''}
                            onChange={(e) => setService({ ...service, title: e.target.value })}
                            className="w-full px-4 py-3 bg-brand-dark border border-brand-dark rounded text-brand-text"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-brand-text mb-2">Short Description (Grid View)</label>
                        <textarea
                            value={service.description || ''}
                            onChange={(e) => setService({ ...service, description: e.target.value })}
                            rows="2"
                            className="w-full px-4 py-3 bg-brand-dark border border-brand-dark rounded text-brand-text"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-brand-text mb-2 flex justify-between">
                            <span>Detailed Content (HTML/Rich Text) <br/> <span className="text-xs text-brand-muted font-normal">(Use &lt;p&gt;, &lt;h3&gt;, etc. for styling)</span></span>
                        </label>
                        <textarea
                            value={service.detailedContent || ''}
                            onChange={(e) => setService({ ...service, detailedContent: e.target.value })}
                            rows="10"
                            className="w-full px-4 py-3 bg-brand-dark border border-brand-dark rounded text-brand-text font-mono text-sm leading-relaxed"
                        ></textarea>
                    </div>
                    <div>
                        <ImageUpload
                            label="Hero Image for Detail Page"
                            currentImage={service.heroImage}
                            onUpload={(url) => setService({ ...service, heroImage: url })}
                        />
                    </div>
                    <button
                        onClick={handleServiceUpdate}
                        disabled={saving}
                        className={`w-full py-3 bg-brand-red text-white font-bold rounded hover:bg-red-800 transition-colors mt-4 ${saving ? 'opacity-50' : ''}`}
                    >
                        {saving ? 'Saving...' : 'Save Main Details'}
                    </button>
                </div>
            </div>

            {/* Core Expertise Management */}
            <div className="bg-brand-gray p-6 rounded-lg border border-brand-dark mb-8">
                <h2 className="text-xl font-bold text-brand-text mb-6 border-b border-gray-700 pb-2 flex items-center">
                    <FaList className="mr-2" /> Core Expertise (Sub-Services)
                </h2>

                {/* Add Item Form */}
                <div className="mb-10 p-6 bg-brand-dark rounded-lg border border-gray-700">
                    <h3 className="text-lg font-bold text-brand-red mb-4 border-b border-gray-700 pb-2">Add New Expertise Item</h3>
                    <form onSubmit={handleAddItem} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-brand-text mb-1">Title</label>
                                <input
                                    type="text"
                                    value={newItem.title}
                                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                    className="w-full px-4 py-2 bg-[#1a1c23] border border-gray-700 rounded text-brand-text focus:border-brand-red outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-brand-text mb-1">Tools / Keywords (comma separated)</label>
                                <input
                                    type="text"
                                    value={newItem.tools}
                                    onChange={(e) => setNewItem({ ...newItem, tools: e.target.value })}
                                    placeholder="e.g. Due Diligence, Compliance, RERA"
                                    className="w-full px-4 py-2 bg-[#1a1c23] border border-gray-700 rounded text-brand-text focus:border-brand-red outline-none"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-brand-text mb-1">Description</label>
                                <textarea
                                    value={newItem.description}
                                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                    rows="2"
                                    className="w-full px-4 py-2 bg-[#1a1c23] border border-gray-700 rounded text-brand-text focus:border-brand-red outline-none"
                                    required
                                ></textarea>
                            </div>
                            <div className="md:col-span-2 mt-2">
                                <ImageUpload
                                    label="Upload Thumbnail Image"
                                    onUpload={(url) => setNewItem({ ...newItem, imageUrl: url })}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={addingItem || !newItem.imageUrl}
                            className={`px-6 py-2 bg-brand-red text-white font-bold rounded hover:bg-red-800 transition-colors ${addingItem || !newItem.imageUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {addingItem ? 'Adding...' : 'Add Expertise Item'}
                        </button>
                        {!newItem.imageUrl && <p className="text-xs text-brand-muted mt-2">An image must be uploaded before adding.</p>}
                    </form>
                </div>

                {/* Expertise Grid */}
                {items.length === 0 ? (
                    <div className="text-center py-12 text-brand-muted bg-brand-dark rounded-lg border border-dashed border-gray-700">
                        No expertise items added yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item) => (
                            <div key={item._id} className="relative group bg-[#1a1c23] rounded-lg overflow-hidden border border-brand-dark hover:border-brand-red transition-all flex flex-col">
                                <div className="h-40 overflow-hidden relative">
                                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-4 flex flex-col flex-grow">
                                    <h4 className="font-bold text-brand-text mb-1">{item.title}</h4>
                                    <p className="text-xs text-brand-muted mb-3 flex-grow">{item.description}</p>
                                    <div className="flex justify-between items-center mt-auto border-t border-gray-700 pt-3">
                                        <span className="text-xs text-brand-red font-semibold">{item.tools?.length || 0} Tools</span>
                                        <button
                                            onClick={() => handleDeleteItem(item._id)}
                                            className="text-red-500 hover:text-red-400 text-sm flex items-center gap-1"
                                            title="Delete Item"
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
