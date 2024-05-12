import { UseOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { ApiAlert } from "./api-alert";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}
export const ApiList: React.FC<ApiListProps> = ({
  entityName,
  entityIdName,
}) => {
  // DECLARING HOOKS AND VARIABLES
  const params = useParams();
  const origin = UseOrigin();

  return (
    <>
      <ApiAlert
        title="GET"
        variant="public"
        description={`${origin}/api/${params.storeId}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${origin}/api/${params.storeId}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="POST"
        variant="admin"
        description={`${origin}/api/${params.storeId}/${entityName}`}
      />
      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${origin}/api/${params.storeId}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="DELETE"
        variant="admin"
        description={`${origin}/api/${params.storeId}/${entityName}/{${entityIdName}}`}
      />
    </>
  );
};
