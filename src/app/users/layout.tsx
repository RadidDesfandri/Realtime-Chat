import getUsers from "../actions/getUser";
import Sidebar from "../component/sidebar/Sidebar";
import UserList from "./component/UserList";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  );
}
