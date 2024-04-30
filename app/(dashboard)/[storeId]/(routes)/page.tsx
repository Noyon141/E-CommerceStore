import db from "@/lib/db";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
    },
  });
  return (
    <div className="">
      <h2>
        Active store: <span className="font-bold">{store?.name}</span>
      </h2>
    </div>
  );
};

export default DashboardPage;
