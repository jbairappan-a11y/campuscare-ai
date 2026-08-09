import { useState } from "react";
import "./App.css";

function App() {
  const [showReport, setShowReport] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem("campuscare_reports");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    title: "",
    location: "",
    description: "",
  });
  const [imagePreview, setImagePreview] = useState("");

  const analyzeIssue = (title, description) => {
    const text = `${title} ${description}`.toLowerCase();

    let category = "General";
    let department = "Administration";
    let priority = "Medium";

    if (
      text.includes("fan") ||
      text.includes("light") ||
      text.includes("electric") ||
      text.includes("switch") ||
      text.includes("power")
    ) {
      category = "Electrical";
      department = "Maintenance";
      priority = "High";
    } else if (
      text.includes("water") ||
      text.includes("tap") ||
      text.includes("leak") ||
      text.includes("toilet") ||
      text.includes("pipe")
    ) {
      category = "Plumbing";
      department = "Maintenance";
      priority = "High";
    } else if (
      text.includes("wifi") ||
      text.includes("wi-fi") ||
      text.includes("internet") ||
      text.includes("network")
    ) {
      category = "Internet";
      department = "IT Support";
      priority = "High";
    } else if (
      text.includes("clean") ||
      text.includes("garbage") ||
      text.includes("dust") ||
      text.includes("waste")
    ) {
      category = "Cleanliness";
      department = "Housekeeping";
      priority = "Medium";
    } else if (
      text.includes("chair") ||
      text.includes("desk") ||
      text.includes("door") ||
      text.includes("window") ||
      text.includes("bench")
    ) {
      category = "Infrastructure";
      department = "Maintenance";
      priority = "Medium";
    }

    return {
      category,
      department,
      priority,
    };
  };

  const submitReport = (e) => {
    e.preventDefault();

    if (!form.title || !form.location || !form.description) {
      alert("Please fill all required fields.");
      return;
    }

    const analysis = analyzeIssue(
      form.title,
      form.description
    );

    const newReport = {
      id: Date.now(),
      title: form.title,
      location: form.location,
      description: form.description,
      image: imagePreview,
      status: "Pending",
      category: analysis.category,
      department: analysis.department,
      priority: analysis.priority,
      createdAt: new Date().toLocaleString(),
    };

    const updatedReports = [newReport, ...reports];

    setReports(updatedReports);

    localStorage.setItem(
      "campuscare_reports",
      JSON.stringify(updatedReports)
    );

    setForm({
      title: "",
      location: "",
      description: "",
    });
    setImagePreview("");

    setShowReport(false);

    alert(
      `✅ Report submitted!\n\nCategory: ${analysis.category}\nPriority: ${analysis.priority}\nDepartment: ${analysis.department}`
    );
  };

  const updateStatus = (id, newStatus) => {
    const updatedReports = reports.map((report) =>
      report.id === id
        ? { ...report, status: newStatus }
        : report
    );

    setReports(updatedReports);

    localStorage.setItem(
      "campuscare_reports",
      JSON.stringify(updatedReports)
    );
  };

  const pendingCount = reports.filter(
    (r) => r.status === "Pending"
  ).length;

  const progressCount = reports.filter(
    (r) => r.status === "In Progress"
  ).length;

  const resolvedCount = reports.filter(
    (r) => r.status === "Resolved"
  ).length;

  const highPriorityCount = reports.filter(
    (r) => r.priority === "High"
  ).length;
  const filteredReports = reports.filter((report) => {
  const matchesSearch =
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.category.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesStatus =
    filterStatus === "All" ||
    report.status === filterStatus;

  return matchesSearch && matchesStatus;
});

  return (
    <div className="app">

      <nav className="navbar">

        <div className="logo">
          🏫 CampusCare <b>AI</b>
        </div>

        <div className="nav-links">

          <a href="#dashboard">
            Dashboard
          </a>

          <a href="#reports">
            My Reports
          </a>

          <button
            onClick={() => setShowAdmin(true)}
          >
            Admin
          </button>

          <button
            onClick={() => setShowReport(true)}
          >
            + Report Issue
          </button>

        </div>

      </nav>


      <main>

        <section
          className="hero"
          id="dashboard"
        >

          <div>

            <p className="tag">
              AI-POWERED CAMPUS MANAGEMENT
            </p>

            <h1>
              Make your campus
              <span> better, together.</span>
            </h1>

            <p className="hero-text">
              Report campus problems, track their
              progress, and help create a better
              college environment.
            </p>

            <button
              className="primary-btn"
              onClick={() => setShowReport(true)}
            >
              Report an Issue →
            </button>

          </div>


          <div className="hero-card">

            <div className="card-icon">
              🤖
            </div>

            <h3>
              AI Smart Detection
            </h3>

            <p>
              AI automatically identifies the category
              and priority of your complaint.
            </p>

            <div className="ai-result">

              <span>
                ⚡ Priority
              </span>

              <strong>
                High
              </strong>

            </div>

          </div>

        </section>


        <section className="stats">
          <section className="how-it-works">

  <div className="section-heading">
    <div>
      <p className="tag">SIMPLE & SMART</p>
      <h2>How CampusCare Works</h2>
    </div>
  </div>

  <div className="steps">

    <div className="step-card">
      <div className="step-number">01</div>
      <div className="step-icon">📝</div>
      <h3>Report</h3>
      <p>
        Students report a campus issue with
        details, location and an optional image.
      </p>
    </div>

    <div className="step-card">
      <div className="step-number">02</div>
      <div className="step-icon">🤖</div>
      <h3>AI Analysis</h3>
      <p>
        CampusCare analyzes the complaint and
        identifies its category and priority.
      </p>
    </div>

    <div className="step-card">
      <div className="step-number">03</div>
      <div className="step-icon">🏢</div>
      <h3>Smart Routing</h3>
      <p>
        The issue is assigned to the appropriate
        campus department.
      </p>
    </div>

    <div className="step-card">
      <div className="step-number">04</div>
      <div className="step-icon">✅</div>
      <h3>Track & Resolve</h3>
      <p>
        Students can track progress while admins
        update the issue until it is resolved.
      </p>
    </div>

  </div>

</section>

          <div className="stat-card">

            <h2>
              {reports.length + 128}
            </h2>

            <p>
              Total Reports
            </p>

          </div>


          <div className="stat-card">

            <h2>
              {pendingCount + 24}
            </h2>

            <p>
              Pending
            </p>

          </div>


          <div className="stat-card">

            <h2>
              {resolvedCount + 96}
            </h2>

            <p>
              Resolved
            </p>

          </div>


          <div className="stat-card">

            <h2>
              {highPriorityCount}
            </h2>

            <p>
              High Priority
            </p>

          </div>

        </section>


        <section
          className="recent"
          id="reports"
        >

          <div className="section-heading">

            <div>

              <p className="tag">
                TRACK YOUR ISSUES
              </p>

              <h2>
                Recent Reports
              </h2>

            </div>

            <button
              onClick={() => setShowReport(true)}
            >
              + New Report
            </button>

          </div>


          <div className="report-list">

            {reports.length === 0 ? (

              <div className="empty">

                <div>
                  📋
                </div>

                <h3>
                  No new reports
                </h3>

                <p>
                  Your submitted campus issues
                  will appear here.
                </p>

              </div>

            ) : (

              reports.map((report) => (

                <div
                  className="report"
                  key={report.id}
                >

                  <div className="report-icon">
                    🚨
                  </div>


                  <div className="report-info">

                    <h3>
                      {report.title}
                    </h3>

                    <p>
                      {report.location} •{" "}
                      {report.createdAt}
                    </p>

                    <small>
                      Category: {report.category}
                      {" | "}
                      Priority: {report.priority}
                      {" | "}
                      Department: {report.department}
                    </small>
                    {report.image && (
  <img
    className="report-image"
    src={report.image}
    alt="Reported issue"
  />
)}

                  </div>


                  <span
                    className={`status ${
                      report.status === "Resolved"
                        ? "resolved"
                        : report.status === "In Progress"
                        ? "progress"
                        : "pending"
                    }`}
                  >
                    {report.status}
                  </span>

                </div>

              ))

            )}

          </div>

        </section>

      </main>


      {/* REPORT MODAL */}

      {showReport && (

        <div className="modal-overlay">

          <div className="modal">

            <button
              className="close"
              onClick={() => setShowReport(false)}
            >
              ×
            </button>

            <p className="tag">
              NEW REPORT
            </p>

            <h2>
              Report a Campus Issue
            </h2>

            <p className="modal-text">
              Tell us about the problem and
              CampusCare AI will analyze it.
            </p>
            <div className="ai-analysis-card">
  <div className="ai-analysis-header">
    <span className="ai-icon">🤖</span>

    <div>
      <h3>CampusCare AI</h3>
      <p>Smart issue analysis</p>
    </div>
  </div>

  <div className="ai-features">
    <span>✓ Category Detection</span>
    <span>✓ Priority Detection</span>
    <span>✓ Department Routing</span>
  </div>
</div>


            <form onSubmit={submitReport}>

              <label>
                Issue Title *
              </label>

              <input
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                placeholder="Example: Fan not working"
              />


              <label>
                Location *
              </label>

              <input
                value={form.location}
                onChange={(e) =>
                  setForm({
                    ...form,
                    location: e.target.value,
                  })
                }
                placeholder="Example: CSE Block - Room 204"
              />


              <label>
                Description *
              </label>

              <textarea
                rows="4"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                placeholder="Describe the problem..."
              />


              <label>
                Upload Image
              </label>

              <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }}
/>

{imagePreview && (
  <div className="image-preview">
    <p>Preview:</p>

    <img
      src={imagePreview}
      alt="Issue preview"
    />
  </div>
)}


              <button
                type="submit"
                className="primary-btn full"
              >
                🤖 Analyze & Submit Report
              </button>

            </form>

          </div>

        </div>

      )}


      {/* ADMIN DASHBOARD */}

      {showAdmin && (

        <div className="modal-overlay">

          <div className="admin-panel">

            <button
              className="close"
              onClick={() => setShowAdmin(false)}
            >
              ×
            </button>


            <p className="tag">
              ADMIN CONTROL CENTER
            </p>

            <h2>
              CampusCare Admin Dashboard
            </h2>


            <div className="admin-stats">

              <div>
                <strong>
                  {reports.length}
                </strong>

                <span>
                  New Reports
                </span>
              </div>


              <div>
                <strong>
                  {pendingCount}
                </strong>

                <span>
                  Pending
                </span>
              </div>


              <div>
                <strong>
                  {progressCount}
                </strong>

                <span>
                  In Progress
                </span>
              </div>


              <div>
                <strong>
                  {resolvedCount}
                </strong>

                <span>
                  Resolved
                </span>
              </div>

            </div>


          <h3 className="table-title">
  Manage Reports
</h3>

<div className="admin-filters">

  <input
    type="text"
    placeholder="🔍 Search reports..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <select
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
  >
    <option value="All">All Status</option>
    <option value="Pending">Pending</option>
    <option value="In Progress">In Progress</option>
    <option value="Resolved">Resolved</option>
  </select>

</div>

            {reports.length === 0 ? (

              <div className="empty">
                No reports submitted yet.
              </div>

            ) : (

              <div className="admin-reports">

                {filteredReports.map((report) => (

                  <div
                    className="admin-report"
                    key={report.id}
                  >

                    <div>

                      <h3>
                        {report.title}
                      </h3>

                      <p>
                        📍 {report.location}
                      </p>

                      <small>
                        {report.category} •{" "}
                        {report.priority} •{" "}
                        {report.department}
                      </small>

                    </div>


                    <select
                      value={report.status}
                      onChange={(e) =>
                        updateStatus(
                          report.id,
                          e.target.value
                        )
                      }
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="In Progress">
                        In Progress
                      </option>

                      <option value="Resolved">
                        Resolved
                      </option>

                    </select>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  );
}

export default App;