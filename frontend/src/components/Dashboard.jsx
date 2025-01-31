import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const Dashboard = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [teacherGenderData, setTeacherGenderData] = useState([0, 0]); // [maleCount, femaleCount]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classResponse = await axios.get(
          "https://schoolmanagementsystem-imyw.onrender.com/api/classes"
        );
        const studentResponse = await axios.get(
          "https://schoolmanagementsystem-imyw.onrender.com/api/students"
        );
        const teacherResponse = await axios.get(
          "https://schoolmanagementsystem-imyw.onrender.com/api/teachers"
        );

        console.log(teacherResponse.data);

        setClasses(classResponse.data);
        setStudents(studentResponse.data);
        setTeachers(teacherResponse.data);
        const maleCount = teacherResponse.data.filter(
          (teacher) => teacher.gender === "Male"
        ).length;
        const femaleCount = teacherResponse.data.filter(
          (teacher) => teacher.gender === "Female"
        ).length;
        setTeacherGenderData([maleCount, femaleCount]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Calculate total teacher salary
  const totalTeacherSalary = teachers.reduce((acc, teacher) => {
    return acc + (teacher.salary || 0); // assuming salary is a number
  }, 0);

  // Calculate total student fees
  const totalStudentFees = students.reduce((acc, student) => {
    // Find the class the student belongs to

    const studentClass = student.class.studentFees;

    if (studentClass) {
      // Add the class fee to the total student fees
      return acc + (studentClass || 0); // assuming fee is a number
    }
    return acc;
  }, 0);

  return (
    <div id="webcrumbs">
      <div className="w-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-2xl shadow-2xl p-8 space-y-8 backdrop-blur-sm">
        <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 relative">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Analytics & Reports
            </h1>
            <p className="text-sm opacity-60 animate-pulse">
              Real-time insights and statistics
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 border border-gray-100 group">
            <h2 className="text-2xl font-semibold mb-6 group-hover:translate-x-2 transition-transform duration-300">
              Class Analytics
            </h2>
            <div className="space-y-6">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <p className="text-sm opacity-60">Teachers</p>
                  <p className="text-3xl font-bold mt-1">{teachers.length}</p>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-purple-50/30 p-4 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <p className="text-sm opacity-60">Students</p>
                  <p className="text-3xl font-bold mt-1">{students.length}</p>
                </div>
              </div>
              <Chart
                type="pie"
                height={250}
                series={teacherGenderData}
                options={{
                  labels: ["Male", "Female"],
                  toolbar: { show: false },
                  theme: { mode: "light" },
                  legend: { position: "bottom" },
                }}
              />
            </div>
          </section>

          <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 border border-gray-100 group">
            <h2 className="text-2xl font-semibold mb-6 group-hover:translate-x-2 transition-transform duration-300">
              Financial Analytics
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gradient-to-br from-gray-50 to-green-50/30 p-4 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm opacity-60">Teacher Salaries</p>
                      <p className="text-3xl font-bold mt-1">
                        ${totalTeacherSalary}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm opacity-60">Student Fees</p>
                      <p className="text-3xl font-bold mt-1">
                        ${totalStudentFees}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Chart
                type="area"
                height={250}
                series={[
                  {
                    name: "Revenue",
                    data: [30, 40, 35, 50, 49, 60, 70],
                  },
                ]}
                options={{
                  xaxis: {
                    categories: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                    ],
                  },
                  toolbar: { show: false },
                  stroke: { curve: "smooth" },
                  fill: {
                    type: "gradient",
                    gradient: {
                      shadeIntensity: 1,
                      opacityFrom: 0.7,
                      opacityTo: 0.3,
                    },
                  },
                }}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
