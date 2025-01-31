import React, { useState, useEffect } from "react";
import axios from "axios";

const TeacherForm = ({ onSubmit, editingTeacher }) => {
  const [name, setName] = useState(editingTeacher ? editingTeacher.name : "");
  const [contactDetails, setContactDetails] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    if (editingTeacher) {
      setName(editingTeacher.name);
      setContactDetails(editingTeacher.contactDetails);
      setGender(editingTeacher.gender);
      setDob(editingTeacher.dob);
      setSalary(editingTeacher.salary);
    }
  }, [editingTeacher]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const teacherData = {
      name,
      contactDetails,
      gender,
      dob,
      salary,
    };
    onSubmit(teacherData);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setContactDetails("");
    setGender("");
    setDob("");
    setSalary("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-2 border-blue-400 p-4 w-full rounded-lg text-lg"
          required
        />
    
        <input
          type="text"
          placeholder="Contact Details"
          value={contactDetails}
          onChange={(e) => setContactDetails(e.target.value)}
          className="border-2 border-blue-400 p-4 w-full rounded-lg text-lg"
          required
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border-2 border-blue-400 p-4 w-full rounded-lg text-lg"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="border-2 border-blue-400 p-4 w-full rounded-lg text-lg"
          required
        />
        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="border-2 border-blue-400 p-4 w-full rounded-lg text-lg"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full mt-6 bg-gradient-to-r from-teal-400 to-cyan-500 text-white py-3 px-8 rounded-lg text-lg font-semibold shadow-lg transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all duration-300"
      >
        {editingTeacher ? "Update Teacher" : "Add Teacher"}
      </button>
    </form>
  );
};

export default TeacherForm;
