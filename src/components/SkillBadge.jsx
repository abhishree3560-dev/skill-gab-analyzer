export default function SkillBadge({ text, type }) {

  const color =
    type === "missing"
      ? "danger"
      : type === "have"
      ? "primary"
      : "success";

  return (
    <span className={`badge bg-${color} m-1 px-3 py-2`}>
      {text}
    </span>
  );
}