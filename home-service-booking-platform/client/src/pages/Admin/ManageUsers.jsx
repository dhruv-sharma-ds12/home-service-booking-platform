import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await apiRequest("/users");

      setUsers(data.users || data);
    } catch (error) {
      console.error("Fetch users error:", error);
      setError(error.message || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    try {
      await apiRequest(`/users/${id}`, {
        method: "DELETE",
      });

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== id)
      );
    } catch (error) {
      console.error("Delete user error:", error);
      alert(error.message || "Failed to delete user.");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <p className="text-orange-500 font-semibold">
            TRUEFIX ADMIN
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mt-1">
            Manage Users
          </h1>

          <p className="text-gray-600 mt-2">
            View and manage registered TrueFix users.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">
            {error}
          </div>
        )}

        {/* USER COUNT */}
        <div className="bg-white rounded-xl shadow p-5 mb-6">
          <p className="text-gray-500 text-sm">
            Total Registered Users
          </p>

          <p className="text-3xl font-bold text-blue-900 mt-1">
            {users.length}
          </p>
        </div>

        {/* USERS TABLE */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

          <div className="p-6 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-blue-900">
                Registered Users
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Customer and administrator accounts.
              </p>
            </div>

            <button
              onClick={fetchUsers}
              className="bg-blue-900 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-800"
            >
              Refresh
            </button>
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="p-10 text-center">
              <div className="w-10 h-10 mx-auto border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>

              <p className="text-gray-500 mt-4">
                Loading users...
              </p>
            </div>
          ) : users.length === 0 ? (
            /* EMPTY */
            <div className="p-10 text-center">
              <div className="text-5xl mb-4">
                👤
              </div>

              <h3 className="text-xl font-semibold text-gray-800">
                No Users Found
              </h3>

              <p className="text-gray-500 mt-2">
                Registered users will appear here.
              </p>
            </div>
          ) : (
            /* TABLE */
            <div className="overflow-x-auto">

              <table className="w-full min-w-[800px]">

                <thead className="bg-gray-50">
                  <tr>

                    <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">
                      Name
                    </th>

                    <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">
                      Email
                    </th>

                    <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">
                      Phone
                    </th>

                    <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">
                      Role
                    </th>

                    <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y">

                  {users.map((user) => (
                    <tr key={user._id}>

                      {/* NAME */}
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-800">
                          {user.name}
                        </p>
                      </td>

                      {/* EMAIL */}
                      <td className="px-5 py-4">
                        <p className="text-gray-700">
                          {user.email}
                        </p>
                      </td>

                      {/* PHONE */}
                      <td className="px-5 py-4">
                        <p className="text-gray-700">
                          {user.phone}
                        </p>
                      </td>

                      {/* ROLE */}
                      <td className="px-5 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      {/* ACTION */}
                      <td className="px-5 py-4">

                        {user.role !== "admin" && (
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold hover:bg-red-200"
                          >
                            Delete
                          </button>
                        )}

                        {user.role === "admin" && (
                          <span className="text-gray-400 text-sm">
                            Protected
                          </span>
                        )}

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}

export default ManageUsers;