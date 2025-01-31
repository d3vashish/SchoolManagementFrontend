import React from "react";
import { IoClose } from "react-icons/io5";
import ClassForm from "./ClassForm";

const ClassModal = ({
  isOpen,
  onClose,
  onSubmit,
  editingClass,
  teachers,
  students,
}) => {
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
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          {editingClass ? "Edit Class" : "Add New Class"}
        </h3>
        <ClassForm 
          onSubmit={onSubmit} 
          editingClass={editingClass} 
          teachers={teachers} // Pass teachers prop here
        />
      </div>
    </div>
  );
};

export default ClassModal;
