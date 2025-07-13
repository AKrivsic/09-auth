'use client';

import css from './ErrorText.module.css';

type Props = {
  message: string;
};

const ErrorText = ({ message }: Props) => {
  return <p className={css.error}>{message}</p>;
};

export default ErrorText;
