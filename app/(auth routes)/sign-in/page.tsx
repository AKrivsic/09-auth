'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './SignInPage.module.css';
import { NewUser } from '@/types/user';

const SignInPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    setErrorMessage('');

    try {
  const formValues = Object.fromEntries(formData) as unknown as NewUser;
  const res = await login(formValues);
  if (res) {
    setUser(res);
    router.push('/profile');
  }
} catch {
  setErrorMessage('Incorrect email or password.');
}
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {errorMessage && <p className={css.error}>{errorMessage}</p>}
      </form>
    </main>
  );
};

export default SignInPage;
