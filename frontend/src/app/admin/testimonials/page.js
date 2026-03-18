"use client";
import React, { useState, useEffect } from 'react';
import api from '@/utils/api';
import { FaTrash, FaEdit, FaPlus, FaTimes } from 'react-icons/fa';

export default function AdminTestimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        quote: '',
        rating: 5,
        isActive: true
    });

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const res = await api.get('/testimonials/admin/all');
            setTestimonials(res.data);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenForm = (testimonial = null) => {
        if (testimonial) {
            setFormData({
                name: testimonial.name,
                role: testimonial.role,
                quote: testimonial.quote || testimonial.content || '',
                rating: testimonial.rating,
                isActive: testimonial.isActive
            });
            setIsEditing(true);
            setCurrentId(testimonial._id);
        } else {
            setFormData({ name: '', role: '', quote: '', rating: 5, isActive: true });
            setIsEditing(false);
            setCurrentId(null);
        }
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setFormData({ name: '', role: '', quote: '', rating: 5, isActive: true });
        setIsEditing(false);
        setCurrentId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (isEditing) {
                await api.put(`/testimonials/${currentId}`, formData);
            } else {
                await api.post('/testimonials', formData);
            }
            fetchTestimonials();
            handleCloseForm();
        } catch (error) {
            console.error('Error saving testimonial:', error);
            alert('Failed to save testimonial');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            try {
                await api.delete(`/testimonials/${id}`);
                fetchTestimonials();
            } catch (error) {
                console.error('Error deleting testimonial:', error);
                alert('Failed to delete testimonial');
            }
        }
    };

    if (loading) return <div className="p-8 text-white">Loading testimonials...</div>;

    return (
        <div className="relative">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-brand-red">Manage Testimonials</h1>
                    <p className="text-sm text-brand-muted mt-1">Add, edit, or remove client reviews</p>
                </div>
                <button
                    onClick={() => handleOpenForm()}
                    className="flex items-center space-x-2 bg-brand-red text-white px-4 py-2 rounded hover:bg-red-800 transition-colors shadow-lg"
                >
                    <FaPlus /> <span>Add New Testimonial</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-brand-muted italic">No testimonials found. Add some to display on the site.</div>
                ) : (
                    testimonials.map((testimonial) => (
                        <div key={testimonial._id} className="relative bg-brand-gray border border-brand-dark p-6 rounded-lg hover:border-brand-red transition-all group flex flex-col">
                            {/* Action Buttons */}
                            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <button
                                    onClick={() => handleOpenForm(testimonial)}
                                    className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                    title="Edit"
                                >
                                    <FaEdit size={12} />
                                </button>
                                <button
                                    onClick={() => handleDelete(testimonial._id)}
                                    className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                    title="Delete"
                                >
                                    <FaTrash size={12} />
                                </button>
                            </div>

                            <div className="flex justify-between items-start mb-4 pr-16">
                                <div>
                                    <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                                    <p className="text-sm text-brand-muted">{testimonial.role}</p>
                                </div>
                                <div className="flex text-law-gold">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i}>★</span>
                                    ))}
                                </div>
                            </div>
                            
                            <p className="text-gray-300 italic text-sm leading-relaxed mb-6 flex-grow">
                                "{testimonial.quote || testimonial.content}"
                            </p>
                            
                            <div className="mt-auto pt-3 border-t border-brand-dark">
                                <span className={`text-xs font-bold uppercase tracking-wider ${testimonial.isActive ? 'text-green-500' : 'text-red-500'}`}>
                                    {testimonial.isActive ? '● Active' : '● Hidden'}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal Form */}
            {showForm && (
                <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4 animate-fade-in-up">
                    <div className="bg-brand-gray border border-brand-dark text-white p-8 rounded-xl max-w-lg w-full relative">
                        <button
                            onClick={handleCloseForm}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <FaTimes size={20} />
                        </button>

                        <h2 className="text-2xl font-bold mb-6 text-brand-red">
                            {isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Client Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 bg-brand-dark border border-brand-dark rounded text-white focus:outline-none focus:border-brand-red"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Role / Company</label>
                                <input
                                    type="text"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full px-4 py-2 bg-brand-dark border border-brand-dark rounded text-white focus:outline-none focus:border-brand-red"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Quote</label>
                                <textarea
                                    value={formData.quote}
                                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                                    className="w-full px-4 py-2 bg-brand-dark border border-brand-dark rounded text-white focus:outline-none focus:border-brand-red"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="5"
                                        value={formData.rating}
                                        onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                                        className="w-full px-4 py-2 bg-brand-dark border border-brand-dark rounded text-white focus:outline-none focus:border-brand-red"
                                        required
                                    />
                                </div>
                                <div className="flex-1 flex items-center mt-5">
                                    <label className="flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.isActive}
                                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                            className="w-5 h-5 rounded border-gray-400 text-brand-red focus:ring-brand-red bg-brand-dark"
                                        />
                                        <span className="ml-2 text-sm">Visible on site</span>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className={`w-full py-3 mt-6 bg-brand-red text-white font-bold rounded hover:bg-red-800 transition-colors ${submitting ? 'opacity-50' : ''}`}
                            >
                                {submitting ? 'Saving...' : 'Save Testimonial'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
