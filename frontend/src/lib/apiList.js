export const server = "http://localhost:8000/api";

const apiList = {
  login: `${server}/auth/login`,
  register: `${server}/auth/register`,
  uploadResume: `${server}/upload/resume`,
  uploadProfileImage: `${server}/upload/profile`,
  jobs: `${server}/api/jobs`,
  applications: `${server}/api/applications`,
  rating: `${server}/api/rating`,
  user: `${server}/jobSeekersRoutes/`,
  applicants: `${server}/api/applicants`,
  verify: `${server}/auth/verify-email`,
};

export default apiList;