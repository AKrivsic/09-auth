'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMe, updateUser } from '@/lib/api/clientApi';
import { UpdateUserProps } from '@/types/user';
import Image from 'next/image';
import css from './EditProfilePage.module.css';
import { useAuthStore } from '@/lib/store/authStore';

const EditProfile = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    getMe().then((user) => {
      setUsername(user.username ?? '');
      setEmail(user.email ?? '');
      setAvatar(user.avatar ?? '');
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data: UpdateUserProps = { username };
      const updated = await updateUser(data);
      if (updated) {
        setUser(updated); 
        router.push('/profile'); 
      }
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={avatar || '/default-avatar.png'}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form onSubmit={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={css.input}
              required
            />
          </div>

          <p>Email: {email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" onClick={handleCancel} className={css.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;

