'use client';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Profile = async () => {
const session = await getServerSession(authOptions)
console.log(session)

    return (
        <div className="text-center text-3xl mt-30 text-white">Welcome to your Profile{session?.user.name}</div>
    )
}

export default Profile;