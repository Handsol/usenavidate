import Swal from 'sweetalert2';

/**
 * Success
 * @param {string} title -> 알림 이름 (성공)
 * @param {string} text -> 알림 내용 (선택)
 */

export const AlertSuccess = (title = 'Success', text = '') => {
  Swal.fire({
    icon: 'success',
    title,
    text,
    customClass: {
      popup: 'swal-custom', // 팝업 스타일링
      icon: 'swal-icon' // 아이콘 스타일링
    }
  });
};

/**
 * Fail
 * @param {string} title -> 경고 제목
 * @param {string} text -> 경고 내용
 */

export const AlertError = (title = 'Error', text = '') => {
  Swal.fire({
    icon: 'error',
    title,
    text
  });
};

/**
 * Check
 * @param {string} title -> 안내 제목
 * @param {string} text -> 안내 내용
 */

export const AlertInfo = (title = 'Info', text = '') => {
  Swal.fire({
    icon: 'info',
    title,
    text
  });
};

/**
 * 실행 여부 확인 === confirm
 * @param {string} title -> 실행 여부 확인할 제목
 * @param {string} text -> 경고 내용
 */

export const AlertCheck = (
  title = 'Warning',
  text = '이 작업은 되돌릴 수 없습니다!',
  confirmButtonText = '삭제',
  confirmedTitle = 'Deleted',
  confirmedText = '삭제되었습니다.'
) => {
  return new Promise((resolve) => {
    Swal.fire({
      icon: 'warning',
      title,
      text,
      showCancelButton: true,
      confirmButtonColor: '#504ba1',
      cancelButtonColor: '#CD2E57',
      confirmButtonText
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: confirmedTitle,
          text: confirmedText,
          icon: 'success'
        });
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};
