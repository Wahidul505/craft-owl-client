import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import RequireAdmin from "./Pages/Auth/RequireAdmin";
import RequireAuth from "./Pages/Auth/RequireAuth";
import RequireUser from "./Pages/Auth/RequireUser";
import AddReview from "./Pages/Dashboard/AddReview";
import AddTool from "./Pages/Dashboard/AddTool";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ManageOrders from "./Pages/Dashboard/ManageOrders";
import ManageTools from "./Pages/Dashboard/ManageTools";
import ManageUsers from "./Pages/Dashboard/ManageUsers";
import MyOrders from "./Pages/Dashboard/MyOrders";
import MyProfile from "./Pages/Dashboard/MyProfile";
import Landing from "./Pages/Home/Landing";
import Purchase from "./Pages/Purchase/Purchase";
import Footer from "./Pages/Shared/Footer";
import NavBar from "./Pages/Shared/NavBar";

function App() {
  return (
    <div className="px-10">
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* dashboard routes  */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route element={<RequireAuth />}>
            <Route index element={<MyProfile />} />
          </Route>
          <Route element={<RequireUser />}>
            <Route path="my-orders" element={<MyOrders />} />
            <Route path="add-review" element={<AddReview />} />
          </Route>
          <Route element={<RequireAdmin />}>
            <Route path="manage-orders" element={<ManageOrders />} />
            <Route path="add-tool" element={<AddTool />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="manage-tools" element={<ManageTools />} />
          </Route>
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/purchase/:id" element={<Purchase />} />
        </Route>
      </Routes>
      <Footer />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;
