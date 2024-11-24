import { PostSliceTypes } from "@/app/types/slice_types/postSliceTypes";
import { PostTile } from ".";

interface PostsListPropsTypes {
  posts: PostSliceTypes[];
  updateIsPostDeleted: () => void;
}

const PostsList = ({ posts, updateIsPostDeleted }: PostsListPropsTypes) => {
  return (
    <div className="w-full h-full flex-1 flex flex-col justify-items-start gap-y-2 relative">
      {posts?.map((post: any, index: number) => {
        // return index;
        const { _id, postTitle, postDescription, postImage } = post;
        const { caption, links } = postImage;
        return (
          <PostTile
            key={`Post Tile ${_id}`}
            caption={caption}
            description={postDescription}
            id={_id}
            mainImageLink={links.original}
            title={postTitle}
            updateIsPostDeleted={updateIsPostDeleted}
          />
        );
      })}
    </div>
  );
};

export default PostsList;
