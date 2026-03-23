import { useState } from "react"

import Image from "../layouts/Images"

function ProfileImage({ user, big = false }) {
    const [imgError, setImgError] = useState(false)

    const initial = user?.name?.[0]?.toUpperCase() || "U"

    if (user?.profilePicture && !imgError) {
        return (
            <Image
                src={user.profilePicture}
                alt={`${user.name} profile`}
                width={big ? "80px" : undefined}
                height={big ? "80px" : undefined}
                className="rounded-full"
                onError={() => setImgError(true)}
            />
        )
    }

    return (
        <span
            className={
                big
                    ? "w-24 h-24 rounded-full bg-gray-500 flex items-center justify-center text-3xl font-bold"
                    : "text-lg"
            }
        >
            {initial}
        </span>
    )
}

export default ProfileImage