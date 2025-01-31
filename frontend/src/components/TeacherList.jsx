import React, { useState, useEffect } from "react";

const TeacherList = ({ teachers, onEdit, onDelete, onSelect }) => {
  const [classes, setClasses] = useState([]); // Classes state to store all class names
  const [selectedClass, setSelectedClass] = useState(""); // State for selected class
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [itemsPerPage] = useState(6); // Number of teachers per page

  // Fetch the classes for each teacher
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classDetails = await Promise.all(
          teachers.map(async (teacher) => {
            const classIds = teacher.assignedClasses || []; // Ensure assignedClasses is defined
            
            return { teacherId: teacher.id, classIds }; // Return teacher ID and class names
          })
        );
        console.log(classDetails)
        // Collect all unique class names
        const allClassNames = [
          ...new Set(classDetails.flatMap((details) => details.classIds.map(classId => classId.name))),
        ];
        setClasses(allClassNames); // Set unique class names to filter
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    if (teachers && teachers.length > 0) {
      fetchClasses();
    }
  }, [teachers]);

  // Filter teachers based on the selected class
  const filteredTeachers = selectedClass
    ? teachers.filter((teacher) => {
      console.log("dadad",teacher)
        const teacherClasses =
          teacher.assignedClasses?.map((classObj) => classObj.name) || [];
       
        return teacherClasses.includes(selectedClass); 
      })
    : teachers;


  const indexOfLastTeacher = currentPage * itemsPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - itemsPerPage;
  const currentTeachers = filteredTeachers.slice(
    indexOfFirstTeacher,
    indexOfLastTeacher
  );
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);

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
      {/* Class filter dropdown */}
      <div className="mb-4">
        <label
          className="block text-white text-lg font-semibold mb-2"
          htmlFor="classFilter"
        >
          Filter by Class
        </label>
        <select
          id="classFilter"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="p-3 rounded-md border-2 border-gray-300 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
        >
          <option value="">All Classes</option>
          {classes.map((className, idx) => (
            <option key={idx} value={className}>
              {className}
            </option>
          ))}
        </select>
      </div>

      {/* Teacher Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTeachers.map((teacher) => {
          const teacherClasses =
            teacher.assignedClasses?.map((classId) => classId) || []; // Get the classes for the current teacher
          return (
            <div
              key={teacher.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
              onClick={() => onSelect(teacher)} // Open modal to show details on card click
            >
              <h3 className="text-2xl font-semibold text-gray-800">
                {teacher.name}
              </h3>
              <p className="text-gray-600 mt-2">{teacher.email}</p>
              <p className="text-gray-600 mt-2">
                {teacherClasses.length > 0
                  ? teacherClasses.join(", ")
                  : "No Class Assigned"}
              </p>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent modal from opening
                    onEdit(teacher);
                  }}
                  className="bg-yellow-500 p-3 rounded-full text-white hover:bg-yellow-600 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent modal from opening
                    onDelete(teacher.id);
                  }}
                  className="bg-red-500 p-3 rounded-full text-white hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white py-2 px-4 rounded-lg"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-500 text-white py-2 px-4 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TeacherList;
