import React from "react";
import { IoClose } from "react-icons/io5";
import TeacherForm from "./TeacherForm";

const TeacherModal = ({ isOpen, onClose, onSubmit, editingTeacher, classes }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
        >
          <IoClose />
        </button>
        {editingTeacher ? (
          <>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Edit Teacher</h3>
            <TeacherForm onSubmit={onSubmit} editingTeacher={editingTeacher} classes={classes} />
          </>
        ) : (
          <>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add New Teacher</h3>
            <TeacherForm onSubmit={onSubmit} editingTeacher={null} classes={classes} />
          </>
        )}
      </div>
    </div>
  );
};

export default TeacherModal;
