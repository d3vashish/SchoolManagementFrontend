import { IoClose } from "react-icons/io5";
const ClassInfoModal = ({ isOpen, onClose, classItem }) => {
  if (!isOpen || !classItem) return null;

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
          Class Information
        </h3>
        <p>
          <strong>Class Name:</strong> {classItem.name}
        </p>
        <p>
          <strong>Year:</strong> {classItem.year}
        </p>
        <p>
          <strong>Fees:</strong> {classItem.studentFees}
        </p>
        <p>
          <strong>Teacher:</strong>{" "}
          {classItem.teacher ? classItem.teacher.name : "Not assigned"}
        </p>
        <p>
          <strong>Students:</strong>{" "}
          {Array.isArray(classItem.students) && classItem.students.length > 0
            ? `${classItem.students.length} - ${classItem.students
                .map((student) => student.name)
                .join(", ")}`
            : "No students"}
        </p>
      </div>
    </div>
  );
};

export default ClassInfoModal;
