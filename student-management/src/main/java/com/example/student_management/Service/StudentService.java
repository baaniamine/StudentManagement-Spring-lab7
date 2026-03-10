package com.example.student_management.Service;

import com.example.student_management.model.Student;
import com.example.student_management.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public Student save(Student student) {
        return studentRepository.save(student);
    }

    // Now used by the update endpoint in the controller
    public Optional<Student> findById(Integer id) {
        return studentRepository.findById(id);
    }

    public List<Student> findAll() {
        return studentRepository.findAll();
    }

    public boolean delete(Integer id) {
        Optional<Student> student = studentRepository.findById(id);
        if (student.isPresent()) {
            studentRepository.delete(student.get());
            return true;
        } else return false;
    }

    public long count() {
        return studentRepository.count();
    }

    // New: update an existing student by ID
    public Optional<Student> update(Integer id, Student updatedData) {
        Optional<Student> existing = studentRepository.findById(id);
        if (existing.isPresent()) {
            Student student = existing.get();
            student.setNom(updatedData.getNom());
            student.setPrenom(updatedData.getPrenom());
            student.setDateNaissance(updatedData.getDateNaissance());
            return Optional.of(studentRepository.save(student));
        }
        return Optional.empty();
    }
}
