function filterCoursesBySearch(courses, search) {
  if (!search || search === "all") return courses;

  return courses.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase())
  );
}

function sendCourseResponse(res, data, message) {
  res.status(200).json({
    message,
    data
  });
}

export {
  filterCoursesBySearch,
  sendCourseResponse,
}