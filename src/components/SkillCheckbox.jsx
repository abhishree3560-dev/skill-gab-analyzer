export default function SkillCheckbox({ skill, toggleSkill, selected }) {
  return (
    <div className="form-check mb-2">
      <input
        type="checkbox"
        className="form-check-input"
        checked={selected}
        onChange={() => toggleSkill(skill)}
      />
      <label className="form-check-label text-light">
        {skill}
      </label>
    </div>
  );
}