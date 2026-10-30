'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { NOTICE_EVENT, type NoticeDetail,} from './notice';

type Notice = {
  id: number;
  message: string;
};

export default function CornerWidgets() {
  const [visible, setVisible] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);

  const noticeIdRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const nextVisible = window.scrollY > 300;

      setVisible((current) =>
        current === nextVisible ? current : nextVisible
      );
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleNotice = (event: Event) => {
      const { detail } = event as CustomEvent<NoticeDetail>;

      if (!detail?.message) return;

      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }

      noticeIdRef.current += 1;

      setNotice({
        id: noticeIdRef.current,
        message: detail.message,
      });

      timeoutRef.current = setTimeout(() => {
        setNotice(null);
        timeoutRef.current = null;
      }, 4000);
    };

    window.addEventListener(NOTICE_EVENT, handleNotice);

    return () => {
      window.removeEventListener(
        NOTICE_EVENT,
        handleNotice
      );

      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const dismissNotice = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setNotice(null);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <div className="scrollUp font-space">
      <div className="sr-only" role="status" aria-live="polite">
        {notice && (
          <span key={notice.id}>{notice.message}</span>
        )}
      </div>

      <AnimatePresence initial={false}>
        {notice && (
          <motion.div
            key="notice"
            className="notice"
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 6,
            }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: reduceMotion ? 0 : 4,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.18,
              ease: 'easeOut',
            }}
          >
            <span
              className="notice__spark"
              aria-hidden="true"
            >
              ✦
            </span>

            <p className="notice__message">
              {notice.message}
            </p>

            <button
              type="button"
              className="notice__close"
              onClick={dismissNotice}
              aria-label="Dismiss project message"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        aria-hidden={!visible}
        tabIndex={visible ? 0 : -1}
        className={`scrollUpButton stampEffect bg-(--blackbean)/85 text-(--ivory) ${
          visible ? 'is-visible' : ''
        }`}
      >
        <span aria-hidden="true">↑</span>
      </button>
    </div>
  );
}