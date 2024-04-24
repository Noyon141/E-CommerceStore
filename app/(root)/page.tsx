import { UserButton } from "@clerk/nextjs";

const Home = () => {
  return (
    <div className="p-4 max-w-4xl lg:max-w-full mx-auto">
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
};

export default Home;
