import { User } from "@prisma/client";
import Image from "next/image";

const PostAuthor = ({ author }: { author: User }) => {
  return (
    <div>
      <div className="flex flex-col gap-3 rounded-3xl border-1 border-t-4 border-gray-600 border-t-violet-950 p-3">
        <div className="flex items-center gap-2">
          <Image
            src={"/author.png"}
            height={50}
            width={50}
            alt={"author profile picture's placeholder"}
          />
          <div>
            <p className="text-sm text-gray-600">
              {author.name && author.email}
            </p>
          </div>
        </div>
        <div>
          <p>LOCATION</p>
          <h3>{author.location}</h3>
        </div>
        <div>
          <p>EDUCATION</p>
          <h3>{author.education}</h3>
        </div>
        <div>
          <p>JOINED</p>
          <h3>{author.createdAt.toISOString()}</h3>
        </div>
      </div>
    </div>
  );
};

export default PostAuthor;
