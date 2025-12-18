import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import { DashboardLayout, Layout1 } from "./components/layout/layouts";
import MotivationCard from "./components/MotivationCard";
import Contact from "./pages/Contact";
import CourseDetails from "./pages/CourseDetails";
import Courses from "./pages/Courses";
import TechElevatorPage from "./pages/TechElevator";
import TechElevatorSalesPage from "./pages/TechElevatorSales";
import TechElevatorWebinar from "./pages/TechElevatorWebinar";
import TechElevatorPaymentConfirmation from "./pages/TechElevatorPaymentConfirmation";
import TechElevatorJoinWebinar from "./pages/TechElevatorJoinWebinar";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import NotFound from "./pages/NotFound";
import FreeCourses from "./pages/FreeCourses";
import Podcasts from "./pages/Podcasts";
import Login from "./pages/auth/Login";
import { AuthProvider } from "./contexts/AuthContext";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Timetable from "./pages/dashboard/Timetable";
import Catalog from "./pages/dashboard/Catalog";
import Certifications from "./pages/dashboard/Certifications";
import HelpCenter from "./pages/dashboard/HelpCenter";
import Lessons from "./pages/dashboard/Lessons";
import Settings from "./pages/dashboard/Settings";
import Payments from "./pages/Payments";
import { PaymentSuccess } from "./pages/PaymentSuccess";
import { PaymentFailed } from "./pages/PaymentFailed";
import TechXplore from "./pages/TechXplore";
import Events from "./pages/Events";
import { HelmetProvider } from "react-helmet-async";
import MetaPixel from "./components/MetaPixel";
import TechSeries from "./pages/TechSeries";
import LessonDetails from "./pages/dashboard/LessonDetails";
import { WatchedVideosProvider } from "./contexts/WatchedVideosContext";
import { ProgressTrackingProvider } from "./contexts/ProgressTrackingContext";
import ForgetPassword from "./pages/auth/ForgetPassword";
import MasterClass from "./pages/MasterClass";
import MetaPixelNew from "./components/MetaPixelNew";
import MasterClass2 from "./pages/MasterClass2";
import CourseAdminStudents from "./pages/dashboard/CourseAdminStudents";
import CourseAdminStudentProgress from "./pages/dashboard/CourseAdminStudentEngagement";
import CourseAdminDashboard from "./pages/dashboard/CourseAdminDashboard";
import AIJoin from "./pages/MasterGoogleAlert";
import TechRoadmap from "./pages/TechRoadMap";
import TechElevatorMaster from "./pages/TechElevatorMaster";
import ChangeRequests from "./pages/dashboard/ChangeRequests";
import { SessionNotification } from "./components/SessionNotification";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ClassroomPage from "./pages/dashboard/ClassroomPage";
import AssignmentDetails from "./pages/dashboard/AssignmentDetails";
import AssignmentSubmissions from "./pages/dashboard/AssignmentSubmissions";

const queryClient = new QueryClient();

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <MetaPixel />
      <MetaPixelNew />
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <ProgressTrackingProvider>
              <WatchedVideosProvider>
                <BrowserRouter>
                  <SessionNotification />
                  <Routes>
                    {/* Group 1 with Layout1 */}
                    <Route element={<Layout1 />}>
                      <Route path="/" element={<Home />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/courses/" element={<Courses />} />
                      <Route
                        path="/courses/:courseID"
                        element={<CourseDetails />}
                      />

                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:blogId" element={<BlogDetails />} />
                      <Route path="/free-courses" element={<FreeCourses />} />
                      <Route path="/podcasts" element={<Podcasts />} />
                      <Route path="/techxplore" element={<TechXplore />} />
                      <Route path="/tech-series" element={<TechSeries />} />
                      <Route path="/events" element={<Events />} />
                      <Route
                        path="/free-masterclass"
                        element={<MasterClass />}
                      />
                      <Route
                        path="/free-masterclass2"
                        element={<MasterClass2 />}
                      />
                    </Route>

                    <Route path="/master-google-alert" element={<AIJoin />} />
                    <Route
                      path="/tech-elevator-master"
                      element={<TechElevatorMaster />}
                    />

                    <Route path="/tech-roadmap" element={<TechRoadmap />} />
                    <Route
                      path="/tech-elevator"
                      element={<TechElevatorPage />}
                    />

                    <Route
                      path="/tech-elevator-sales"
                      element={<TechElevatorSalesPage />}
                    />

                    <Route
                      path="/tech-elevator-webinar"
                      element={<TechElevatorWebinar />}
                    />

                    <Route
                      path="/tech-elevator-payment-confirmation"
                      element={<TechElevatorPaymentConfirmation />}
                    />

                    <Route
                      path="/tech-elevator-join-webinar"
                      element={<TechElevatorJoinWebinar />}
                    />

                    {/* Group 2 with dashboard Layout */}
                    <Route element={<DashboardLayout />}>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/dashboard/catalog" element={<Catalog />} />
                      <Route
                        path="/dashboard/timetable"
                        element={<Timetable />}
                      />
                      <Route
                        path="/dashboard/certifications"
                        element={<Certifications />}
                      />
                      <Route
                        path="/dashboard/help-center"
                        element={<HelpCenter />}
                      />
                      <Route path="/dashboard/lessons" element={<Lessons />} />
                      <Route
                        path="/dashboard/lessons/:courseID"
                        element={<LessonDetails />}
                      />
                      <Route
                        path="/dashboard/settings"
                        element={<Settings />}
                      />
                      <Route
                        path="/change-requests"
                        element={<ChangeRequests />}
                      />

                      {/* New Course Admin Routes */}
                      <Route
                        path="/dashboard/course-admin"
                        element={<CourseAdminDashboard />}
                      />
                      <Route
                        path="/dashboard/course-admin/:courseId/students"
                        element={<CourseAdminStudents />}
                      />
                      <Route
                        path="/dashboard/course-admin/:courseId/student/:studentId"
                        element={<CourseAdminStudentProgress />}
                      />

                      <Route
                        path="/dashboard/classroom"
                        element={<ClassroomPage />}
                      />

                      <Route
                        path="/dashboard/assignments/:assignmentId"
                        element={<AssignmentDetails />}
                      />

                      <Route
                        path="/dashboard/assignments/:assignmentId/submissions"
                        element={<AssignmentSubmissions />}
                      />
                    </Route>

                    {/* Group 3 for auth pages */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                      path="/forget-password"
                      element={<ForgetPassword />}
                    />
                    <Route path="/payments/:courseId" element={<Payments />} />
                    <Route
                      path="/payment/success"
                      element={<PaymentSuccess />}
                    />
                    <Route path="/payment/failed" element={<PaymentFailed />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <MotivationCard />
                </BrowserRouter>
              </WatchedVideosProvider>
            </ProgressTrackingProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
