'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/store/authStore';
//import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import styles from './UserBar.module.css';

const UserBar = ({ onClose }: { onClose?: () => void }) => {
  const { user, logout, isLoading } = useAuthStore();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowModal(false);
    if (onClose) onClose();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.userInfo}>
        <Image
          src={user?.avatar || '/default.png'}
          alt="Avatar"
          className={styles.avatar}
          width={40}
          height={40}
        />
        <div className={styles.textData}>
          <p className={styles.userName}>{user?.name}</p>
          <p className={styles.userEmail}>{user?.email}</p>
        </div>
      </div>

      <button
        className={styles.logoutBtn}
        onClick={() => setShowModal(true)}
        disabled={isLoading}
      >
        {isLoading ? <span className={styles.loader}></span> : 'Вихід'}
      </button>

      {showModal && (
        <ConfirmationModal
          title="Ви впевнені, що хочете вийти?"
          confirmButtonText="Вийти"
          cancelButtonText="Скасувати"
          onConfirm={handleLogout}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default UserBar;
