"use client";
import React, { useState, useEffect } from 'react';
import api from '@/utils/api';

export default function AdminBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        _id: '',
        title: '',
        content: '',
        image: '',
        isPublished: false
    });
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await api.get('/blogs/admin/all');
            setBlogs(res.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching blogs:', error);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append('image', file);

        setIsUploading(true);
        try {
            const res = await api.post('/upload', uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setFormData({ ...formData, image: res.data.imageUrl });
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image. Check console for details.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData._id) {
                await api.put(`/blogs/${formData._id}`, formData);
            } else {
                await api.post('/blogs', formData);
            }
            fetchBlogs();
            setIsEditing(false);
            resetForm();
        } catch (error) {
            console.error('Error saving blog:', error);
            alert('Failed to save blog. Check console for details.');
        }
    };

    const handleEdit = (blog) => {
        setFormData(blog);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            try {
                await api.delete(`/blogs/${id}`);
                fetchBlogs();
            } catch (error) {
                console.error('Error deleting blog:', error);
            }
        }
    };

    const resetForm = () => {
        setFormData({ _id: '', title: '', content: '', image: '', isPublished: false });
        setIsEditing(false);
    };

    if (loading) return <div className="p-8 text-white">Loading blogs...</div>;

    return (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 w-full max-w-6xl mx-auto text-gray-900">
            <div className="flex justify-between items-center mb-8 border-b pb-4 border-gray-200">
                <h1 className="text-3xl font-bold text-[#0A1628]" style={{ fontFamily: 'var(--font-cormorant)' }}>Blog Management</h1>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-[#0A1628] hover:bg-[#C9A84C] text-white px-6 py-2 transition-colors font-medium text-sm"
                        style={{ fontFamily: 'var(--font-inter)' }}
                    >
                        + Create New Post
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="bg-[#F8F4EE] p-8 border border-gray-200 mb-8 rounded">
                    <h2 className="text-2xl font-bold text-[#0A1628] mb-6" style={{ fontFamily: 'var(--font-cormorant)' }}>
                        {formData._id ? 'Edit Post' : 'Create New Post'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-[#0A1628] uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-inter)' }}>Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 bg-white focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#0A1628] uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-inter)' }}>Featured Image</label>
                            <input
                                type="file"
                                onChange={handleImageUpload}
                                disabled={isUploading}
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-[#0A1628] file:text-white hover:file:bg-[#C9A84C] transition-colors"
                            />
                            {isUploading && <p className="text-sm text-[#C9A84C] mt-2">Uploading image...</p>}
                            {formData.image && (
                                <div className="mt-4">
                                    <img src={formData.image} alt="Preview" className="h-40 w-auto object-cover border border-gray-200 shadow-sm" />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#0A1628] uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-inter)' }}>Content * (HTML supported)</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                                required
                                rows="12"
                                className="w-full px-4 py-3 border border-gray-300 bg-white focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] font-mono text-sm"
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="isPublished"
                                id="isPublished"
                                checked={formData.isPublished}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-[#C9A84C] bg-white border-gray-300 rounded focus:ring-[#C9A84C]"
                            />
                            <label htmlFor="isPublished" className="ml-2 text-sm font-semibold text-[#0A1628] uppercase tracking-wider" style={{ fontFamily: 'var(--font-inter)' }}>
                                Publish immediately
                            </label>
                        </div>

                        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-semibold uppercase tracking-wider"
                                style={{ fontFamily: 'var(--font-inter)' }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-[#0A1628] text-white hover:bg-[#C9A84C] transition-colors text-sm font-semibold uppercase tracking-wider"
                                style={{ fontFamily: 'var(--font-inter)' }}
                            >
                                Save Post
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b-2 border-[#0A1628]">
                                <th className="py-4 px-4 font-bold text-[#0A1628] uppercase text-xs tracking-wider" style={{ fontFamily: 'var(--font-inter)' }}>Title</th>
                                <th className="py-4 px-4 font-bold text-[#0A1628] uppercase text-xs tracking-wider" style={{ fontFamily: 'var(--font-inter)' }}>Status</th>
                                <th className="py-4 px-4 font-bold text-[#0A1628] uppercase text-xs tracking-wider" style={{ fontFamily: 'var(--font-inter)' }}>Date</th>
                                <th className="py-4 px-4 font-bold text-[#0A1628] uppercase text-xs tracking-wider text-right" style={{ fontFamily: 'var(--font-inter)' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="py-8 text-center text-gray-500 italic">No blog posts found. Create your first post!</td>
                                </tr>
                            ) : (
                                blogs.map((blog) => (
                                    <tr key={blog._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-4 font-medium text-[#0A1628]">{blog.title}</td>
                                        <td className="py-4 px-4">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${blog.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {blog.isPublished ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</td>
                                        <td className="py-4 px-4 text-right">
                                            <button
                                                onClick={() => handleEdit(blog)}
                                                className="text-[#C9A84C] hover:text-[#0A1628] font-semibold text-sm mr-4 transition-colors uppercase tracking-wider"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(blog._id)}
                                                className="text-red-500 hover:text-red-700 font-semibold text-sm transition-colors uppercase tracking-wider"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
