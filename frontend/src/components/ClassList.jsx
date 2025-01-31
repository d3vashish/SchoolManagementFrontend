import React from "react";

const ClassList = ({ classes, onEdit, onDelete, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {classes.map((classItem) => (
        <div
          key={classItem._id}
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
          onClick={() => onSelect(classItem)} // Open info modal on click
        >
          <h3 className="text-2xl font-semibold text-gray-800">
            {classItem.name}
          </h3>
          <p className="text-gray-600 mt-2">Year: {classItem.year}</p>
          <p className="text-gray-600 mt-2">Fees: {classItem.studentFees}</p>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => onEdit(classItem)}
              className="bg-yellow-500 p-3 rounded-full text-white hover:bg-yellow-600 transition duration-300"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(classItem._id)}
              className="bg-red-500 p-3 rounded-full text-white hover:bg-red-600 transition duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClassList;
