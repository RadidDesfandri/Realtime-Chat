import Image from "next/image";

const EmptyState = () => {
  return (
    <div className="flex h-full items-center justify-center bg-gray-100 px-4 py-10 lg:px-8">
      <div className="text-center flex flex-col items-center">
        <Image
          src={"/emptychat.svg"}
          alt="Empty image"
          width={200}
          height={200}
        />
        <h3 className="font-medium">Select a chat or start a new conversation</h3>
      </div>
    </div>
  );
};

export default EmptyState;
