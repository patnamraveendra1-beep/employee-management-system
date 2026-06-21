import { useEffect, useState } from "react";
import Login from "./Login";

function App() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    salary: ""
  });

  const [editId, setEditId] = useState(null);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  // ================= PROTECT ROUTE =================
  if (!token) {
    return <Login />;
  }

  // ================= FETCH =================
  useEffect(() => {
    fetch("http://16.171.0.64:5000/api/employees", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setEmployees(data);
        else setEmployees([]);
      })
      .catch((err) => console.log(err));
  }, []);

  // ================= INPUT =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= ADD / UPDATE =================
  const handleAdd = () => {
    if (editId) {
      fetch(`http://16.171.0.64:5000/api/employees/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      })
        .then((res) => res.json())
        .then((data) => {
          alert("Employee Updated");

          setEmployees(
            employees.map((emp) =>
              emp._id === editId ? data : emp
            )
          );

          setEditId(null);
          setForm({ name: "", email: "", department: "", salary: "" });
        });

    } else {
      fetch("http://16.171.0.64:5000/api/employees/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      })
        .then((res) => res.json())
        .then((data) => {
          alert("Employee Added Successfully");
          setEmployees([...employees, data]);
          setForm({ name: "", email: "", department: "", salary: "" });
        });
    }
  };

  // ================= DELETE =================
  const handleDelete = (id) => {
    fetch(`http://16.171.0.64:5000/api/employees/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then(() => {
        alert("Employee Deleted");
        setEmployees(employees.filter((emp) => emp._id !== id));
      });
  };

  // ================= EDIT =================
  const handleEdit = (emp) => {
    setForm(emp);
    setEditId(emp._id);
  };

  // ================= SEARCH =================
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.department.toLowerCase().includes(search.toLowerCase())
  );

  // ================= DASHBOARD =================
  const totalEmployees = employees.length;

  const totalSalary = employees.reduce(
    (sum, emp) => sum + Number(emp.salary || 0),
    0
  );

  const departments = [...new Set(employees.map(e => e.department))].length;

  return (
    <div className="container mt-4">

      {/* HEADER + LOGOUT */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Employee Management System</h2>

        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* DASHBOARD */}
      <div className="row mb-4 text-center">

        <div className="col-md-4">
          <div className="card bg-primary text-white p-3">
            <h5>Total Employees</h5>
            <h3>{totalEmployees}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-success text-white p-3">
            <h5>Total Salary</h5>
            <h3>{totalSalary}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-warning text-dark p-3">
            <h5>Departments</h5>
            <h3>{departments}</h3>
          </div>
        </div>

      </div>

      {/* FORM */}
      <div className="card p-3 mb-4 shadow">
        <h5>{editId ? "Edit Employee" : "Add Employee"}</h5>

        <input className="form-control mb-2" name="name"
          value={form.name} onChange={handleChange} placeholder="Name" />

        <input className="form-control mb-2" name="email"
          value={form.email} onChange={handleChange} placeholder="Email" />

        <input className="form-control mb-2" name="department"
          value={form.department} onChange={handleChange} placeholder="Department" />

        <input className="form-control mb-2" name="salary"
          value={form.salary} onChange={handleChange} placeholder="Salary" />

        <button
          className={editId ? "btn btn-primary" : "btn btn-success"}
          onClick={handleAdd}
        >
          {editId ? "Update Employee" : "Add Employee"}
        </button>
      </div>

      {/* SEARCH */}
      <input
        className="form-control mb-3"
        placeholder="Search by name or department..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <div className="card shadow">
        <div className="card-body">

          <table className="table table-hover table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <tr key={emp._id}>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>
                    <td>{emp.salary}</td>

                    <td>
                      <button className="btn btn-warning btn-sm"
                        onClick={() => handleEdit(emp)}>
                        Edit
                      </button>

                      <button className="btn btn-danger btn-sm ms-2"
                        onClick={() => handleDelete(emp._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Employees Found
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}

export default App;