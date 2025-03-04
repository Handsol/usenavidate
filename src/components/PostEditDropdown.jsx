import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid';
import { useAuthUser } from '../supabase/SupabaseAuth';

const PostEditDropDown = ({ post }) => {
  const { user, loading } = useAuthUser();

  if (loading) return null;

  return (
    user?.id === post.users_id && (
      <Menu>
        <MenuButton>
          <img src="/post-edit.png" alt="게시글 옵션" className="w-8 h-8" />
        </MenuButton>
        <MenuItems
          transition
          anchor="bottom end"
          className="w-64 origin-top-right rounded-xl border border-white/5 bg-white p-2 text-lg text-palette3 transition-all duration-200 ease-out transform translate-y-5 opacity-0 data-[open]:translate-y-0 data-[open]:opacity-100 [--anchor-gap:10px] focus:outline-none"
        >
          <MenuItem>
            <button className="group flex w-full items-center gap-3 rounded-lg py-2 px-4 hover:bg-gray-100">
              <PencilIcon className="size-6 fill-palette3" />
              게시글 수정
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group flex w-full items-center gap-3 rounded-lg py-2 px-4 hover:bg-gray-100">
              <TrashIcon className="size-6 fill-palette3" />
              게시글 삭제
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    )
  );
};

export default PostEditDropDown;
