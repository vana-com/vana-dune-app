"use client";

import { useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
export function CustomModal(prop: any) {
	const { children, showModal, closeModal, confirmModal, minH, isCloseOnOverlayClick } = prop;
	const [open, setOpen] = useState(false);
	const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true);


	useEffect(() => {
		setOpen(showModal);
		if (isCloseOnOverlayClick == false) {
			setCloseOnOverlayClick(false)
		}
	}, [showModal, isCloseOnOverlayClick]);

	const openModal = () => {
		setOpen(true);
	};

	const handleCloseModal = () => {
		setOpen(false);
		closeModal(false);
	};

	const handleConfirmModal = () => {
		setOpen(false);
		confirmModal();
	};

	// for css, loof for the global.css file
	const customClass = {
		overlay: 'customOverlay',
		modal: 'customModal',
	}

	return (
		<div>
			<Modal
				closeOnOverlayClick={closeOnOverlayClick}
				showCloseIcon={false}
				open={open} onClose={handleCloseModal}
				center={true}
				classNames={customClass}
			>
				<div
					style={{
						minHeight: minH ? minH : ''
					}}
					className={`modal-body-wrap relative`}>
					{children}
				</div>
			</Modal>
		</div>
	)
}