import React, { useState, useEffect } from "react";

const ClassForm = ({ onSubmit, editingClass, teachers }) => {
  console.log("hhhhhhh",editingClass)
  const [className, setClassName] = useState(editingClass ? editingClass.name : "");
  const [year, setYear] = useState(editingClass ? editingClass.year : "");
  const [studentFees, setStudentFees] = useState(editingClass ? editingClass.studentFees : "");
  const [teacherId, setTeacherId] = useState(editingClass && editingClass.teacher ? editingClass.teacher._id : "");
  
  useEffect(() => {
    if (editingClass) {
      setClassName(editingClass.name);
      setYear(editingClass.year);
      setStudentFees(editingClass.studentFees);
      setTeacherId(editingClass.teacher ? editingClass.teacher._id : "");
    }
  }, [editingClass]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const classData = {
      name: className,
      year,
      studentFees,
      teacher: teacherId,
    };
    onSubmit(classData);
    resetForm();
  };

  const resetForm = () => {
    setClassName("");
    setYear("");
    setStudentFees("");
    setTeacherId("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg mb-8">
      <input
        type="text"
        placeholder="Class Name"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        className="border-2 border-blue-400 p-4 w-full rounded-lg text-lg"
        required
      />
      <input
        type="text"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="border-2 border-blue-400 p-4 w-full rounded-lg text-lg mt-4"
        required
      />
      <input
        type="number"
        placeholder="Student Fees"
        value={studentFees}
        onChange={(e) => setStudentFees(e.target.value)}
        className="border-2 border-blue-400 p-4 w-full rounded-lg text-lg mt-4"
        required
      />
      <select
        value={teacherId}
        onChange={(e) => setTeacherId(e.target.value)}
        className="border-2 border-blue-400 p-4 w-full rounded-lg text-lg mt-4"
        required
      >
        <option value="">Select Teacher</option>
        {teachers && teachers.map((teacher) => (
          <option key={teacher.id} value={teacher.id}>
            {teacher.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="w-full mt-6 bg-gradient-to-r from-teal-400 to-cyan-500 text-white py-3 px-8 rounded-lg text-lg font-semibold shadow-lg transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all duration-300"
      >
        {editingClass ? "Update Class" : "Add Class"}
      </button>
    </form>
  );
};

export default ClassForm;
