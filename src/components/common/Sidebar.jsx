// src/components/common/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return null;

  const linkClass =
    'hover:text-blue-400 transition duration-150 ease-in-out';
  const activeClass = 'text-blue-500 font-semibold';

  return (
    <aside className="w-64 bg-gray-800 text-white flex-shrink-0 p-5 space-y-4 h-screen sticky top-0">
      <h2 className="text-2xl font-bold mb-6">EMS</h2>
      <nav className="flex flex-col space-y-3 text-lg">
        <NavLink
          to={`/${user.role}`}
          className={({ isActive }) => (isActive ? activeClass : linkClass)}
        >
          🏠 Dashboard
        </NavLink>

        {user.role === 'admin' && (
          <>
            <NavLink to="/reports" className={({ isActive }) => (isActive ? activeClass : linkClass)}>
              📈 Reports
            </NavLink>
            <NavLink to="/users" className={({ isActive }) => (isActive ? activeClass : linkClass)}>
              👥 Manage Users
            </NavLink>
          </>
        )}

        {user.role === 'manager' && (
          <>
            <NavLink to="/my-employees" className={({ isActive }) => (isActive ? activeClass : linkClass)}>
              👷 Employees
            </NavLink>
            {/* <NavLink to="/my-tasks" className={({ isActive }) => (isActive ? activeClass : linkClass)}>
              📝 Manage Tasks
            </NavLink> */}
          </>
        )}

        {/* {user.role === 'employee' && (
          <NavLink to="/my-tasks" className={({ isActive }) => (isActive ? activeClass : linkClass)}>
            ✅ My Tasks
          </NavLink>
        )} */}

        {/* <NavLink to="/settings" className={({ isActive }) => (isActive ? activeClass : linkClass)}>
          ⚙️ Settings
        </NavLink> */}
      </nav>
    </aside>
  );
};

export default Sidebar;
