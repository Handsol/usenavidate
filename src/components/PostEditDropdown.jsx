import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid';
import { useAuthUser } from '../supabase/SupabaseAuth';

const PostEditDropDown = ({ post }) => {
  const { user, loading } = useAuthUser();

  if (loading) return null;

  console.log('🔍 로그인한 사용자 ID:', user?.id);
  console.log('🔍 게시글 작성자 ID:', post?.users_id);

  return (
    user?.id === post.users_id && (
      <Menu>
        <MenuButton>
          <img src="/post-edit.png" alt="게시글 옵션" className="w-8 h-8" />
        </MenuButton>
        <MenuItems className="w-52 bg-white text-palette3 shadow-md rounded-lg p-2">
          <MenuItem>
            <button className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100">
              <PencilIcon className="w-5 h-5 text-palette3" />
              게시글 수정
            </button>
          </MenuItem>
          <MenuItem>
            <button className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100">
              <TrashIcon className="w-5 h-5 text-palette3" />
              게시글 삭제
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    )
  );
};

export default PostEditDropDown;
