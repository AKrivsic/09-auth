'use client';

import { useRouter } from 'next/navigation';
import css from './Modal.module.css';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ children }: Props) {
  const router = useRouter();
  const close = () => router.back();

   return (
    <div className={css.backdrop} onClick={close}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
        {/* <button onClick={close}>Close</button> */}
      </div>
    </div>
  );
};
