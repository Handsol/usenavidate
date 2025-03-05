// utils/DeletePost.js
import supabase from '../supabase/Client';
import { AlertError, AlertSuccess } from '../common/Alert';

export const deletePost = async (postId) => {
  try {
    const { error } = await supabase.from('posts').delete().eq('posts_id', postId);
    if (error) {
      throw error;
    }
    AlertSuccess('게시글이 삭제되었습니다.');
    return true;
  } catch (err) {
    AlertError(`게시글 삭제 실패: ${err.message}`);
    return false;
  }
};
