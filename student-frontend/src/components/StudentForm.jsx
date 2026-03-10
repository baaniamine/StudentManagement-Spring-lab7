import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

const StudentForm = ({ initialData, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        dateNaissance: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                nom: initialData.nom,
                prenom: initialData.prenom,
                dateNaissance: initialData.dateNaissance
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when typing
        if (error) setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await onSubmit(formData);
        } catch (err) {
            console.error("Submit Error:", err);
            setError(err.response?.data?.message || err.message || "Failed to save student. Please make sure the backend is running.");
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content glass-panel">
                <div className="modal-header">
                    <h2>{initialData ? 'Edit Student' : 'Add New Student'}</h2>
                    <button className="btn-icon" onClick={onClose} disabled={loading}>
                        <X size={20} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        {error && (
                            <div className="error-message">
                                <strong>Error:</strong> {error}
                            </div>
                        )}
                        <div className="form-group">
                            <label htmlFor="prenom">First Name (Prénom)</label>
                            <input 
                                type="text" 
                                id="prenom" 
                                name="prenom" 
                                className="input-field" 
                                value={formData.prenom} 
                                onChange={handleChange} 
                                required 
                                placeholder="e.g. John"
                                disabled={loading}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nom">Last Name (Nom)</label>
                            <input 
                                type="text" 
                                id="nom" 
                                name="nom" 
                                className="input-field" 
                                value={formData.nom} 
                                onChange={handleChange} 
                                required 
                                placeholder="e.g. Doe"
                                disabled={loading}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dateNaissance">Date of Birth</label>
                            <input 
                                type="date" 
                                id="dateNaissance" 
                                name="dateNaissance" 
                                className="input-field" 
                                value={formData.dateNaissance} 
                                onChange={handleChange} 
                                required 
                                disabled={loading}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? (
                                <>Saving...</>
                            ) : (
                                <><Save size={18} /> Save Student</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentForm;
