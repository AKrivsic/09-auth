import { fetchServerUser } from '@/lib/api/serverApi';
import css from './ProfilePage.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Profile — NoteHub',
  description: 'View and manage your profile information, settings, and notes.',
  openGraph: {
    title: 'Your Profile — NoteHub',
    description: 'Customize your profile and explore your saved notes.',
    siteName: 'NoteHub',
    images: [
      {
        url: '/op_profile.png',
        width: 1200,
        height: 630,
        alt: 'User Profile Page on NoteHub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Profile — NoteHub',
    description: 'Access your profile and settings in NoteHub.',
    images: ['/op_profile.png'],
  },
};

const ProfilePage = async () => {
  const user = await fetchServerUser();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || '/default-avatar.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username || '—'}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
