import React, { useState } from "react";

const StudentList = ({ students, onEdit, onDelete }) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of students per page

  // Pagination logic
  const indexOfLastStudent = currentPage * itemsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(students.length / itemsPerPage);

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
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentStudents.map((student) => (
          <div
            key={student._id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
          >
            <h3 className="text-2xl font-semibold text-gray-800">
              {student.name}
            </h3>
            <p className="text-gray-600 mt-2">Gender: {student.gender}</p>
            <p className="text-gray-600 mt-2">DOB: {student.dob}</p>
            <p className="text-gray-600 mt-2">
              Contact: {student.contactDetails}
            </p>
            <p className="text-gray-600 mt-2">Fees Paid: {student.feesPaid}</p>
            <p className="text-gray-600 mt-2">Class: {student.class.name}</p>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => onEdit(student)}
                className="bg-yellow-500 p-3 rounded-full text-white hover:bg-yellow-600 transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(student._id)}
                className="bg-red-500 p-3 rounded-full text-white hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <button onClick={prevPage} disabled={currentPage === 1} className="bg-gray-500 text-white py-2 px-4 rounded-lg">
          Previous
        </button>
        <button onClick={nextPage} disabled={currentPage === totalPages} className="bg-gray-500 text-white py-2 px-4 rounded-lg">
          Next
        </button>
      </div>
    </div>
  );
};

export default StudentList;
