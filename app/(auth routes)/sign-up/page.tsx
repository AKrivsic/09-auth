'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './SignUpPage.module.css';
import { NewUser } from '@/types/user';

const SignUpPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    setErrorMessage('');

    try {
  const formValues = Object.fromEntries(formData) as unknown as NewUser;
  const res = await register(formValues);
  if (res) {
    setUser(res);
    router.push('/profile');
  }
} catch {
  setErrorMessage(
    'Registration failed. The account may already exist or an error occurred.'
  );
}
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
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
            Register
          </button>
        </div>

        {errorMessage && <p className={css.error}>{errorMessage}</p>}
      </form>
    </main>
  );
};

export default SignUpPage;
