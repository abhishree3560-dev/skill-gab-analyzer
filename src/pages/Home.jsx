import jobSkills from "../data/jobSkills";
import { motion } from "framer-motion";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SkillCheckbox from "../components/SkillCheckbox";

const skillsList = [
  "HTML","CSS","JavaScript","React","Redux","Git","REST API","Node.js"
];

export default function Home() {

  const [jobRole, setJobRole] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);

  const navigate = useNavigate();

  const toggleSkill = (skill) => {
    setSelectedSkills(
      selectedSkills.includes(skill)
        ? selectedSkills.filter(s => s !== skill)
        : [...selectedSkills, skill]
    );
  };

  const analyzeSkills = () => {
    if (!jobRole) {
    alert("Enter job role");
    return;}

    navigate("/result", {
      state: { jobRole, selectedSkills }
 });
     };

  return (
    <div className="container mt-5">

      <div className="card p-4 shadow-lg bg-dark text-light">

        <h3 className="text-center mb-4 text-danger">
          Analyze Your Skills
        </h3>

        <motion.select
  className="form-select mb-3"
  value={jobRole}
  onChange={(e)=>setJobRole(e.target.value)}
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
>
  <option value="">Select Job Role</option>

  {Object.keys(jobSkills).map((role,i)=>(
    <option key={i} value={role}>
      {role}
    </option>
  ))}
</motion.select>

        <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="btn btn-danger mt-4 w-100"
  onClick={analyzeSkills}
>
  Analyze Skills
</motion.button>

{skillsList.map((skill,i) => (
  <motion.div
    key={i}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: i * 0.05 }}
  >
    <SkillCheckbox
      skill={skill}
      selected={selectedSkills.includes(skill)}
      toggleSkill={toggleSkill}
    />
  </motion.div>
))}

      </div>

    </div>
  );
}