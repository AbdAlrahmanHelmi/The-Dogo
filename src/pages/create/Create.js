import "./Create.css";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useCollection } from "../../hooks/useCollection";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "./../../hooks/useFirestore";
import { useHistory } from "react-router-dom";
const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

export default function Create() {
  const history = useHistory();
  const { addDocument, response } = useFirestore("projects");
  const { documents } = useCollection("users");
  const [users, setUsers] = useState([]);
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [categoty, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (!categoty) {
      setFormError("please select a project category");
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError("please select a project assign");
      return;
    }

    const createBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };
    const assinedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });

    const project = {
      name,
      details,
      categoty: categoty.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createBy,
      assinedUsersList,
    };
    await addDocument(project);
    if (!response.error) {
      history.push("/");
    }
  };

  return (
    <div className="create-form">
      <h2 className="page-title">Create a New Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>project Name</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>project Details</span>
          <textarea
            type="text"
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Set Due Date</span>
          <input
            type="date"
            required
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project Category</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assigned to</span>
          <Select
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>
        <button className="btn">Add Project</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}
