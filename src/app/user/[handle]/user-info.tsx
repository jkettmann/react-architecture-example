import { useGetUser } from "@/hooks/useGetUser";

type UserInfoProps = {
  handle: string;
};

export function UserInfo({ handle }: UserInfoProps) {
  const user = useGetUser(handle);

  if (user.isError) {
    return <div>An error occurred</div>;
  }
  if (!user.data) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex gap-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="w-48 h-48 rounded-full"
        src={user.data.data.attributes.avatar}
        alt={`${user.data.data.attributes.handle}'s avatar`}
      />
      <div>
        <h2 className="text-xl font-bold">
          @{user.data.data.attributes.handle}
        </h2>
        <p className="">
          {user.data.data.attributes.info || "Shush! I'm a ghost."}
        </p>
      </div>
    </section>
  );
}
