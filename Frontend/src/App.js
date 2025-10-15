import { useState } from "react";
import GoalForm from "./components/GoalForm";
import Planner from "./components/Planner";
import api from "./api/client";

export default function App() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function handleGenerate({ goalTitle }) {
    setErr(""); setLoading(true);
    try {
      const { data } = await api.post("/api/plan", { goalTitle });
      setPlan(data);
    } catch (e) {
      setErr(e?.response?.data?.error || e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setPlan(null);
    setErr("");
  }

  return (
    <>
      <nav className="navbar navbar-dark" style={{backgroundColor: "rgba(255,255,255,0.06)"}}>
        <div className="container d-flex align-items-center justify-content-between">
          <span className="navbar-brand">Smart Task Planner</span>
          <button className="btn btn-outline-light btn-sm" onClick={reset}>Reset</button>
        </div>
      </nav>

      <main className="container my-4">
        <div className="row g-4">
          <div className="col-lg-5">
            <div className="card glass">
              <div className="card-body">
                <h5 className="card-title mb-3">Create your plan</h5>
                <GoalForm loading={loading} onSubmit={handleGenerate}/>
                {err ? <div className="alert alert-danger mt-3 mb-0">{err}</div> : null}
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="card glass">
              <div className="card-body">
                <Planner plan={plan} loading={loading}/>
              </div>
            </div>
          </div>
        </div>
      </main>

    </>
  );
}
