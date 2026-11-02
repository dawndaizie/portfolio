export const NOTICE_EVENT = 'portfolio:notice';

export type NoticeDetail = {
  message: string;
};

export function showNotice(message: string) {
  window.dispatchEvent(
    new CustomEvent<NoticeDetail>(NOTICE_EVENT, {
      detail: { message },
    })
  );
}