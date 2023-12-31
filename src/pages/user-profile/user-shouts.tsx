import { LoadingSpinner } from "@/components/loading-spinner";
import { ShoutList } from "@/components/shout-list";
import { useGetShoutsByUser } from "@/hooks/use-get-shouts-by-user";
import { useGetUser } from "@/hooks/use-get-user";

type UserShoutsProps = {
  handle: string;
};

export function UserShouts({ handle }: UserShoutsProps) {
  const user = useGetUser(handle);
  const shouts = useGetShoutsByUser(handle);

  if (shouts.isError || user.isError) {
    return <div>An error occurred</div>;
  }
  if (!shouts.data || !user.data) {
    return <LoadingSpinner />;
  }

  return (
    <ShoutList
      shouts={shouts.data.data}
      images={shouts.data.included}
      users={[user.data.data]}
    />
  );
}
