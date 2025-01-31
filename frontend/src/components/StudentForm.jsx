import React, { useState } from "react";
import { FaTimes } from "react-icons/fa"; // Import the close icon from react-icons

const StudentForm = ({ onSubmit, editingStudent, onClose, classes }) => {
  const [studentName, setStudentName] = useState(
    editingStudent ? editingStudent.name : ""
  );
  const [gender, setGender] = useState(
    editingStudent ? editingStudent.gender : "Male" // Default to Male if not editing
  ); 
  const [dob, setDob] = useState(editingStudent ? editingStudent.dob : "");
  const [contactDetails, setContactDetails] = useState(
    editingStudent ? editingStudent.contactDetails : ""
  );
  const [feesPaid, setFeesPaid] = useState(
    editingStudent ? String(editingStudent.feesPaid) : "false"
  ); // Default to unpaid
  const [selectedClass, setSelectedClass] = useState("");

  const handleSubmit = (e) => {
    console.log(selectedClass)
    e.preventDefault();
    const studentData = {
      name: studentName,
      gender: gender,
      dob,
      contactDetails,
      feesPaid: feesPaid === "true", // Convert string to boolean
      class: selectedClass,
    };
    onSubmit(studentData);
    resetForm();
  };

  const resetForm = () => {
    setStudentName("");
    setGender("Male"); // Reset to default
    setDob("");
    setContactDetails("");
    setFeesPaid("false");
    setSelectedClass("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg relative w-96">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
        >
          <FaTimes size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4">
          {editingStudent ? "Edit Student" : "Add Student"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="border-2 border-blue-400 p-3 w-full rounded-lg text-lg"
            required
          />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border-2 border-blue-400 p-3 w-full rounded-lg text-lg mt-4 bg-white"
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="border-2 border-blue-400 p-3 w-full rounded-lg text-lg mt-4"
            required
          />

          <input
            type="text"
            placeholder="Contact Details"
            value={contactDetails}
            onChange={(e) => setContactDetails(e.target.value)}
            className="border-2 border-blue-400 p-3 w-full rounded-lg text-lg mt-4"
            required
          />

          {/* Select Input for Fees Paid */}
          <select
            value={feesPaid}
            onChange={(e) => setFeesPaid(e.target.value)}
            className="border-2 border-blue-400 p-3 w-full rounded-lg text-lg mt-4 bg-white"
            required
          >
            <option value="true">Paid</option>
            <option value="false">Unpaid</option>
          </select>

          {/* Select Input for Class */}
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border-2 border-blue-400 p-3 w-full rounded-lg text-lg mt-4 bg-white"
            required
          >
            <option value="">Select Class</option>
            {classes.map((classItem) => (
              <option key={classItem._id} value={classItem._id}>
                {classItem.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full mt-6 bg-gradient-to-r from-teal-400 to-cyan-500 text-white py-3 px-8 rounded-lg text-lg font-semibold shadow-lg hover:scale-105 transition-all duration-300"
          >
            {editingStudent ? "Update Student" : "Add Student"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
