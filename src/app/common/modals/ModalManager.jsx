import React from 'react';
import { useSelector } from 'react-redux';
import TestModal from '../../../features/SandBox/TestModal';
import LoginForm from '../../../features/authentication/LoginForm';

export default function ModalManager() {

    const modalLookup = { TestModal, LoginForm };

    const currentModal = useSelector((state) => state.modals);

    let renderedModal;

    if (currentModal) {
      const { modalType, modalProps } = currentModal;
      const ModalComponent = modalLookup[modalType];
      renderedModal = <ModalComponent {...modalProps} />;
    }
  
    return <span> { renderedModal } </span>;
}