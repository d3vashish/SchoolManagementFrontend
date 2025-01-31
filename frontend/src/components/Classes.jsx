import React, { useState, useEffect } from "react";
import axios from "axios";
import ClassForm from "./ClassForm";
import ClassList from "./ClassList";
import ClassModal from "./ClassModal";
import ClassInfoModal from "./ClassInfoModal";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [editingClass, setEditingClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of classes per page

  useEffect(() => {
    fetchClasses();
    fetchTeachers();
    fetchStudents();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get("https://schoolmanagementsystem-imyw.onrender.com/api/classes");
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("https://schoolmanagementsystem-imyw.onrender.com/api/teachers");
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get("https://schoolmanagementsystem-imyw.onrender.com/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleSubmit = async (classData) => {
    try {
      if (editingClass) {
        await axios.put(
          `https://schoolmanagementsystem-imyw.onrender.com/api/classes/${editingClass._id}`,
          classData
        );
      } else {
        await axios.post("https://schoolmanagementsystem-imyw.onrender.com/api/classes", classData);
      }
      fetchClasses();
      closeModal();
    } catch (error) {
      console.error("Error saving class:", error);
    }
  };

  const handleEdit = (classItem) => {
    setEditingClass(classItem);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://schoolmanagementsystem-imyw.onrender.com/api/classes/${id}`);
      fetchClasses();
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  const handleSelect = (classItem) => {
    setSelectedClass(classItem);
    setIsInfoModalOpen(true);
  };

  const openModal = () => {
    setEditingClass(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingClass(null);
  };

  const openInfoModal = (classItem) => {
    setSelectedClass(classItem);
    setIsInfoModalOpen(true);
  };

  const closeInfoModal = () => {
    setIsInfoModalOpen(false);
    setSelectedClass(null);
  };

  // Pagination logic
  const indexOfLastClass = currentPage * itemsPerPage;
  const indexOfFirstClass = indexOfLastClass - itemsPerPage;
  const currentClasses = classes.slice(indexOfFirstClass, indexOfLastClass);
  const totalPages = Math.ceil(classes.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r rounded-2xl shadow-2xl">
      <header className="flex items-center justify-between border-b pb-2 mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2 text-white">
          <span className="material-symbols-outlined">class</span>
          Manage Classes
        </h2>
        <button
          onClick={openModal}
          className="bg-teal-500 text-white py-2 px-4 rounded-lg"
        >
          Add Class
        </button>
      </header>

      <ClassList
        classes={currentClasses}
        onEdit={handleEdit}
        onDelete={handleDelete}
        openInfoModal={openInfoModal}
        onSelect={handleSelect}
      />

      <div className="flex justify-between mt-4">
        <button onClick={prevPage} disabled={currentPage === 1} className="bg-gray-500 text-white py-2 px-4 rounded-lg">
          Previous
        </button>
        <button onClick={nextPage} disabled={currentPage === totalPages} className="bg-gray-500 text-white py-2 px-4 rounded-lg">
          Next
        </button>
      </div>

      <ClassModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        editingClass={editingClass}
        teachers={teachers}
        students={students}
      />

      <ClassInfoModal
        isOpen={isInfoModalOpen}
        onClose={closeInfoModal}
        classItem={selectedClass}
      />
    </div>
  );
};

export default Classes;
