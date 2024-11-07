import getConversations from "../actions/getConversation";
import getUsers from "../actions/getUser";
import Sidebar from "../component/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversation = await getConversations();
  const users = await getUsers()

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversation} users={users}/>
        {children}
      </div>
    </Sidebar>
  );
}
