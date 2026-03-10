import React, { useEffect, useState } from 'react';
import { studentApi } from '../api/studentApi';
import { Plus, Edit2, Trash2, UserSearch } from 'lucide-react';
import StudentForm from './StudentForm';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);

    const loadStudents = async () => {
        try {
            setLoading(true);
            const data = await studentApi.getAllStudents();
            setStudents(data);
        } catch (error) {
            console.error("Failed to load students", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStudents();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            try {
                await studentApi.deleteStudent(id);
                loadStudents();
            } catch (error) {
                console.error("Failed to delete student", error);
            }
        }
    };

    const handleEdit = (student) => {
        setEditingStudent(student);
        setIsFormOpen(true);
    };

    const handleCreate = () => {
        setEditingStudent(null);
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setEditingStudent(null);
    };

    const handleFormSubmit = async (formData) => {
        if (editingStudent) {
            await studentApi.updateStudent(editingStudent.id, formData);
        } else {
            await studentApi.createStudent(formData);
        }
        closeForm();
        loadStudents();
    };

    return (
        <div className="list-container">
            <div className="list-header">
                <h2>Student Directory</h2>
                <div style={{display: 'flex', gap: '1rem'}}>
                    <div className="stats-pill glass-panel">
                        Total: <strong style={{marginLeft: '0.4rem'}}>{students.length}</strong>
                    </div>
                    <button className="btn-primary" onClick={handleCreate}>
                        <Plus size={18} /> Add Student
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="loading-state glass-panel">
                    <div className="spinner"></div>
                    <p>Loading students...</p>
                </div>
            ) : students.length === 0 ? (
                <div className="empty-state glass-panel">
                    <UserSearch size={48} className="empty-icon" />
                    <h3>No students found</h3>
                    <p>Get started by adding a new student to the directory.</p>
                </div>
            ) : (
                <div className="grid-container">
                    {students.map(student => (
                        <div key={student.id} className="student-card glass-panel">
                            <div className="card-header">
                                <div className="avatar-lg">
                                    {(student.prenom && student.prenom.length > 0) ? student.prenom[0] : ''}
                                    {(student.nom && student.nom.length > 0) ? student.nom[0] : ''}
                                </div>
                                <div className="actions">
                                    <button className="btn-icon edit" onClick={() => handleEdit(student)}>
                                        <Edit2 size={16} />
                                    </button>
                                    <button className="btn-icon delete" onClick={() => handleDelete(student.id)}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                                <h3>{student.prenom} {student.nom}</h3>
                                <div className="info-row">
                                    <span className="label">ID:</span>
                                    <span className="value">#{student.id}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Date of Birth:</span>
                                    <span className="value">{student.dateNaissance}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isFormOpen && (
                <StudentForm 
                    initialData={editingStudent} 
                    onSubmit={handleFormSubmit} 
                    onClose={closeForm} 
                />
            )}
        </div>
    );
};

export default StudentList;
