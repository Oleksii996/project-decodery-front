'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/store/authStore';
//import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import styles from './UserBar.module.css';
import { logoutUser } from '@/features/auth/api';
import { clear } from 'console';
import { useRouter } from 'next/navigation';

const UserBar = ({ onClose }: { onClose?: () => void }) => {
  //const { user, logout, isLoading } = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const userInfo = useAuthStore(s => s.userInfo);

  const clearAuthUser = useAuthStore(s => s.clearAuthUser);

  const handleLogout = async () => {
    await logoutUser();
    clearAuthUser();

    router.push('/auth/login');
    router.refresh();

    //await logout();
    // setShowModal(false);
    //if (onClose) onClose();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperContent}>
        <div className={styles.userInfo}>
          <Image
            src={userInfo?.avatar || '/default.png'}
            alt="Avatar"
            className={styles.avatar}
            width={40}
            height={40}
          />
          <div className={styles.textData}>
            <p className={styles.userName}>{userInfo?.name}</p>
            <p className={styles.userEmail}>{userInfo?.email}</p>
          </div>
        </div>

        <button
          className={styles.logoutBtn}
          //onClick={() => setShowModal(true)}
          onClick={handleLogout}
          //disabled={isLoading}
        >
          {'Вид'}
        </button>

        {/* {showModal && (
        <ConfirmationModal
          title="Ви впевнені, що хочете вийти?"
          confirmButtonText="Вийти"
          cancelButtonText="Скасувати"
          onConfirm={handleLogout}
          onCancel={() => setShowModal(false)}
        />
      )} */}
      </div>
    </div>
  );
};

export default UserBar;
