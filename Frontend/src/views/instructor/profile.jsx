import { useNavigate } from "react-router-dom";

const InstructorDashboard = () => {
  const navigate = useNavigate();

  const instructor = {
    name: "Manish Adtani",
    email: "manish@example.com",
    bio: "Full Stack Developer | MERN Expert | CourseCamp Instructor",
    courses: [], // Replace with real course data
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      {/* Instructor Overview Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg p-8 mb-10">
        <h2 className="text-3xl font-bold">{instructor.name}</h2>
        <p className="text-sm mt-1 opacity-90">{instructor.email}</p>
        <p className="mt-4 max-w-2xl text-md">{instructor.bio}</p>

        <button
          className="mt-6 bg-white text-blue-600 hover:bg-gray-100 font-semibold py-2 px-6 rounded-lg shadow transition duration-300"
          onClick={() => navigate("/instructor/add-course")}
        >
          ➕ Add New Course
        </button>
      </section>

      {/* Courses Display */}
      <section>
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">
          Your Courses
        </h3>

        {instructor.courses.length === 0 ? (
          <div className="text-center text-gray-500 mt-12 text-lg">
            No courses yet. Click <span className="font-semibold text-blue-600">"Add New Course"</span> to start creating!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructor.courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold text-gray-800">{course.title}</h4>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {course.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default InstructorDashboard;
