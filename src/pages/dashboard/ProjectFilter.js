const filterList = ["all", "devlopment", "design", "markiting", "sales"];

export default function ProjectFilter({ currentFilter, changeFilter }) {
  const hanleClick = (newFilter) => {
    changeFilter(newFilter);
  };
  return (
    <div className="project-filter">
      <nav>
        <p>Filter by</p>
        {filterList.map((f) => (
          <button
            key={f}
            onClick={() => hanleClick(f)}
            className={currentFilter === f ? "active" : ""}
          >
            {f}
          </button>
        ))}
      </nav>
    </div>
  );
}
