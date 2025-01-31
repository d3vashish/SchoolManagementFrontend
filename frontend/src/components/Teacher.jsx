import { useState, useEffect } from "react";
import axios from "axios";
import TeacherForm from "./TeacherForm";
import TeacherList from "./TeacherList";
import TeacherModal from "./TeacherModal";
import TeacherInfoModal from "./TeacherInfoModal";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    fetchTeachers();
    fetchClasses();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("https://schoolmanagementsystem-imyw.onrender.com/api/teachers");
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get("https://schoolmanagementsystem-imyw.onrender.com/api/classes");
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const handleSubmit = async (teacherData) => {
    try {
      if (editingTeacher) {
        await axios.put(
          `https://schoolmanagementsystem-imyw.onrender.com/api/teachers/${editingTeacher._id}`,
          teacherData
        );
      } else {
        await axios.post("https://schoolmanagementsystem-imyw.onrender.com/api/teachers", teacherData);
      }
      fetchTeachers();
      closeModal();
    } catch (error) {
      console.error("Error saving teacher:", error);
    }
  };

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://schoolmanagementsystem-imyw.onrender.com/api/teachers/${id}`);
      fetchTeachers();
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  const openModal = () => {
    setEditingTeacher(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTeacher(null);
  };

  const handleSelect = (teacher) => {
    setSelectedTeacher(teacher);
    setIsInfoModalOpen(true);
  };

  const closeInfoModal = () => {
    setIsInfoModalOpen(false);
    setSelectedTeacher(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r rounded-2xl shadow-2xl">
      <header className="flex items-center justify-between border-b pb-2 mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2 text-white">
          <span className="material-symbols-outlined">class</span>
          Manage Teachers
        </h2>
        <button
          onClick={openModal}
          className="bg-teal-500 text-white py-2 px-4 rounded-lg"
        >
          Add Teacher
        </button>
      </header>

      {/* Teacher List Section */}
      <TeacherList
        teachers={teachers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSelect={handleSelect}
      />

      {/* Modal for Teacher Form */}
      <TeacherModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        editingTeacher={editingTeacher}
        classes={classes}
      />

      {/* Teacher Info Modal */}
      <TeacherInfoModal
        isOpen={isInfoModalOpen}
        onClose={closeInfoModal}
        teacher={selectedTeacher}
        classes={classes} // Pass the classes data here
      />
    </div>
  );
};

export default Teachers;
