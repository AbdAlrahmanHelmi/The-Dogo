import "./Dashboard.css";
import { useCollection } from "../../hooks/useCollection";
import ProjectList from "../../components/ProjectList";
import ProjectFilter from "./ProjectFilter";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Dashboard() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("projects");
  const [currentFilter, setCurrentFilter] = useState("all");
  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };
  const projects = documents
    ? documents.filter((document) => {
        switch (currentFilter) {
          case "all":
            return true;
          case "mine":
            let assignetToMe = false;
            document.assignedUserList.forEach((u) => {
              if (user.uid === u.id) {
                assignetToMe = true;
              }
            });
            return assignetToMe;
          case "devlopment":
          case "design":
          case "sales":
          case "markiting":
            return document.category === currentFilter;
          default:
            return true;
        }
      })
    : null;
  return (
    <div>
      <h2 className="page-title">Dashbord</h2>
      {error && <p className="error">{error}</p>}
      {documents && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {projects && <ProjectList projects={projects} />}
    </div>
  );
}
