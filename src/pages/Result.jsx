import { useLocation, Link } from "react-router-dom";
import jobSkills from "../data/jobSkills";
import SkillBadge from "../components/SkillBadge";
import { motion } from "framer-motion";

// 🔥 Chart
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Result() {

  const location = useLocation();

  const jobRole = location.state?.jobRole || "";
  const selectedSkills = location.state?.selectedSkills || [];

  // ✅ Case-insensitive role match
  const roleKey = Object.keys(jobSkills).find(
    key => key.toLowerCase() === jobRole.toLowerCase()
  );

  const requiredSkills = roleKey ? jobSkills[roleKey] : [];

  const missingSkills = requiredSkills.filter(
    skill => !selectedSkills.includes(skill)
  );

  const percent =
    requiredSkills.length > 0
      ? (selectedSkills.length / requiredSkills.length) * 100
      : 0;

  // 🔥 Chart Data
  const chartData = {
    labels: ["Matched", "Missing"],
    datasets: [
      {
        data: [
          selectedSkills.length,
          missingSkills.length
        ],
        backgroundColor: ["#ff4d4d", "#444"]
      }
    ]
  };

  return (
    <div className="container mt-5">

      {/* 🔥 Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >

        <div className="card p-4 shadow-lg bg-dark text-light">

          <h3 className="text-center mb-4 text-danger">
            Analysis Result
          </h3>

          {!jobRole && (
            <p className="text-danger">
              No data found. Go back and try again.
            </p>
          )}

          {/* Required */}
          <h5>Required Skills</h5>
          {requiredSkills.length === 0 ? (
            <p className="text-warning">No skills available</p>
          ) : (
            requiredSkills.map((s,i)=>(
              <SkillBadge key={i} text={s} type="required"/>
            ))
          )}

          {/* Your */}
          <h5 className="mt-3">Your Skills</h5>
          {selectedSkills.length === 0 ? (
            <p className="text-warning">No skills selected</p>
          ) : (
            selectedSkills.map((s,i)=>(
              <SkillBadge key={i} text={s} type="have"/>
            ))
          )}

          {/* Missing */}
          <h5 className="mt-3">Missing Skills</h5>
          {missingSkills.length === 0 ? (
            <p className="text-success">No missing skills 🎉</p>
          ) : (
            missingSkills.map((s,i)=>(
              <SkillBadge key={i} text={s} type="missing"/>
            ))
          )}

          {/* Percentage */}
          <h5 className="mt-4 text-danger">
            Match: {percent.toFixed(0)}%
          </h5>

          <div className="progress mb-4">
            <div
              className="progress-bar bg-danger"
              style={{ width: `${percent}%` }}
            ></div>
          </div>

          {/* 🔥 Chart */}
          <div className="mt-4">
            <Pie data={chartData} />
          </div>

          <Link to="/" className="btn btn-secondary w-100 mt-4">
            Analyze Again
          </Link>

        </div>

      </motion.div>

    </div>
  );
}