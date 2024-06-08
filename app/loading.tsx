import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex items-center justify-center p-72">
      <Image src={"spinner.svg"} width={200} height={200} alt="loading..." />
    </div>
  );
};

export default Loading;
