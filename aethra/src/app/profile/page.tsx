'use client';
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();

  return (
    <div className="text-center text-3xl mt-30 text-white">
      Welcome to your Profile {session?.user.name}
    </div>
  );
}

export default Profile;