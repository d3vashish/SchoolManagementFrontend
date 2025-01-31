import React from "react";

const TeacherInfoModal = ({ isOpen, onClose, teacher, classes }) => {
  if (!isOpen || !teacher) return null;

  
  const assignedClassNames = teacher.assignedClasses?.map((cls) => cls.name) || [];

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Teacher Info</h2>

        <div className="mb-4">
          <strong className="text-gray-600">Name:</strong>
          <p className="text-gray-900">{teacher.name}</p>
        </div>

        <div className="mb-4">
          <strong className="text-gray-600">Gender:</strong>
          <p className="text-gray-900">{teacher.gender}</p>
        </div>

        <div className="mb-4">
          <strong className="text-gray-600">Date of Birth:</strong>
          <p className="text-gray-900">
            {new Date(teacher.dob).toLocaleDateString()}
          </p>
        </div>

        <div className="mb-4">
          <strong className="text-gray-600">Contact Details:</strong>
          <p className="text-gray-900">{teacher.contactDetails}</p>
        </div>

        <div className="mb-4">
          <strong className="text-gray-600">Salary:</strong>
          <p className="text-gray-900">${teacher.salary}</p>
        </div>

        <div className="mb-4">
          <strong className="text-gray-600">Assigned Classes:</strong>
          <ul className="list-disc pl-5">
            {assignedClassNames.length > 0 ? (
              assignedClassNames.map((className, index) => (
                <li key={index} className="text-gray-900">
                  {className}
                </li>
              ))
            ) : (
              <p className="text-gray-900">No classes assigned</p>
            )}
          </ul>
        </div>

        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TeacherInfoModal;
