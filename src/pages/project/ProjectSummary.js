import Avatar from "../../components/Avatar";

export default function ProjectSummary({ project }) {
  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p className="due-date">
          {" "}
          project due to {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        <h4>project is assigned to</h4>
        <div className="assigned-users">
          {project.assinedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
