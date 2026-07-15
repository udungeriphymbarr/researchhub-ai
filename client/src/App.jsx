import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import TopicGenerator from "./pages/TopicGenerator/TopicGenerator";
import ResearchQuestions from "./pages/ResearchQuestions/ResearchQuestions";
import ChapterOutline from "./pages/ChapterOutline/ChapterOutline";
import History from "./pages/History/History";
import Profile from "./pages/Profile/Profile";
import Projects from "./pages/Projects/Projects";
import ProjectDetails from "./pages/Projects/ProjectDetails";

import ProblemStatement from "./pages/ResearchWriter/ProblemStatement";
import Objectives from "./pages/ResearchWriter/Objectives";
import Methodology from "./pages/ResearchWriter/Methodology";
import Significance from "./pages/ResearchWriter/Significance";
import LiteratureReview from "./pages/ResearchWriter/LiteratureReview";
import Abstract from "./pages/ResearchWriter/Abstract";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/landing/Footer";
import GuestRoute from "./components/auth/GuestRoute";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Subscription from "./pages/Subscription/Subscription";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUpload from "./pages/admin/AdminUpload";
import AdminProducts from "./pages/admin/AdminProducts";
import EditProduct from "./pages/admin/EditProduct";
import AdminProtectedRoute from "./components/auth/AdminProtectedRoute";

function App() {
  return (
    <>
    <ScrollToTop />
      <Navbar />

      <Routes>
        {/* Public Routes */}

        <Route path="/" element={<Home />} />

        

<Route
  path="/login"
  element={
    <GuestRoute>
      <Login />
    </GuestRoute>
  }
/>

<Route
  path="/signup"
  element={
    <GuestRoute>
      <Signup />
    </GuestRoute>
  }
/>

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route

    path="/subscription"

    element={
        <ProtectedRoute>
            <Subscription />
        </ProtectedRoute>
    }

/>

<Route
    path="/payment-success"
    element={<PaymentSuccess/>}
/>

        <Route
          path="/topic-generator"
          element={
            <ProtectedRoute>
              <TopicGenerator />
            </ProtectedRoute>
          }
        />

        <Route
          path="/research-questions"
          element={
            <ProtectedRoute>
              <ResearchQuestions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chapter-outline"
          element={
            <ProtectedRoute>
              <ChapterOutline />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/:id"
          element={
            <ProtectedRoute>
              <ProjectDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/problem-statement"
          element={
            <ProtectedRoute>
              <ProblemStatement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/objectives"
          element={
            <ProtectedRoute>
              <Objectives />
            </ProtectedRoute>
          }
        />

        <Route
          path="/methodology"
          element={
            <ProtectedRoute>
              <Methodology />
            </ProtectedRoute>
          }
        />

        <Route
          path="/significance"
          element={
            <ProtectedRoute>
              <Significance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/literature-review"
          element={
            <ProtectedRoute>
              <LiteratureReview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/abstract"
          element={
            <ProtectedRoute>
              <Abstract />
            </ProtectedRoute>
          }
        />
<Route
  path="/admin"
  element={
    <AdminProtectedRoute>
      <AdminLayout />
    </AdminProtectedRoute>
  }
>

    <Route index element={<AdminDashboard />} />

    <Route
        path="products"
        element={<AdminProducts />}
    />

    <Route
        path="upload"
        element={<AdminUpload />}
    />

    <Route
    path="edit/:id"
    element={<EditProduct />}
/>

</Route>

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route 
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        <Route
          path="/verify-email/:token"
          element={<VerifyEmail />}
        />

      </Routes>

      <Footer />

      <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
  draggable
  theme="colored"
/>
    </>
  );
}

export default App;