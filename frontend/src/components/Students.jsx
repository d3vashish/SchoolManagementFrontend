import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import ClassList from "./ClassList"; // Import ClassList to fetch classes

const Students = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]); // State for classes
  const [editingStudent, setEditingStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
    fetchClasses(); // Fetch classes on component mount
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("https://schoolmanagementsystem-imyw.onrender.com/api/students");
      setStudents(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get("https://schoolmanagementsystem-imyw.onrender.com/api/classes");
      setClasses(response.data); // Set classes state
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const handleSubmit = async (studentData) => {
    try {
      if (editingStudent) {
        await axios.put(
          `https://schoolmanagementsystem-imyw.onrender.com/api/students/${editingStudent._id}`,
          studentData
        );
      } else {
        await axios.post("https://schoolmanagementsystem-imyw.onrender.com/api/students", studentData);
      }
      fetchStudents();
      closeModal();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://schoolmanagementsystem-imyw.onrender.com/api/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const openModal = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r rounded-2xl shadow-2xl">
      <header className="flex items-center justify-between border-b pb-2 mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2 text-white">
          <span className="material-symbols-outlined">school</span>
          Manage Students
        </h2>
        <button
          onClick={openModal}
          className="bg-teal-500 text-white py-2 px-4 rounded-lg"
        >
          Add Student
        </button>
      </header>

      {/* Student List Section */}
      <StudentList
        students={students}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal for Student Form */}
      {isModalOpen && (
        <StudentForm
          onSubmit={handleSubmit}
          editingStudent={editingStudent} // Pass the correct prop here
          onClose={closeModal}
          classes={classes} // Pass the classes prop
        />
      )}
    </div>
  );
};

export default Students;
