import { useState } from "react";
import RoleList from "./RoleList";
import AddRole from "./AddRole";
import EditRole from "./EditRole";

export default function RolesPage() {
  const [page, setPage] = useState("list"); // list | add | edit
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Admin",
      description: "Admin all permissions",
      permissions: [],
      active: true,
    },
    {
      id: 2,
      name: "Instructor",
      description: "Instructor permissions",
      permissions: [],
      active: true,
    },
  ]);

  const [selectedRole, setSelectedRole] = useState(null);

  const openAdd = () => setPage("add");

  const openEdit = (role) => {
    setSelectedRole(role);
    setPage("edit");
  };

  return (
    <div>
      {page === "list" && (
        <RoleList
          roles={roles}
          onAdd={openAdd}
          onEdit={openEdit}
          setRoles={setRoles}
        />
      )}

      {page === "add" && (
        <AddRole
          onBack={() => setPage("list")}
          onCreate={(newRole) => {
            setRoles([...roles, { id: Date.now(), ...newRole }]);
            setPage("list");
          }}
        />
      )}

      {page === "edit" && (
        <EditRole
          role={selectedRole}
          onBack={() => setPage("list")}
          onUpdate={(updatedRole) => {
            setRoles(
              roles.map((r) => (r.id === updatedRole.id ? updatedRole : r))
            );
            setPage("list");
          }}
        />
      )}
    </div>
  );
}