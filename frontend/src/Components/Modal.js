import React, { useState } from 'react';
import '../Modal.css';
import { useKeycloak } from '@react-keycloak/web';
import axios from 'axios';

const Modal = ({ username }) => {
    const [modal, setModal] = useState(false);
    const { keycloak } = useKeycloak();

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                `http://localhost:8088/api/v1/keycloak/delete-user/${username}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${keycloak.token}`,
                    },
                }
            );
            console.log(response.data);
            toggleModal(); // Close modal after successful deletion
        } catch (error) {
            console.error('Error deleting user:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <>
            <button className="ml-auto button_minus" onClick={toggleModal}></button>
            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h2 className='font-kanit text-lg text-red-700 py-2'>Warning</h2>
                        <p className='font-kanit text-lg py-2'>
                            Are you sure you want to delete this user?
                        </p>
                        <div className='flex items-center justify-around'>
                            <button onClick={handleDelete} className='rounded-lg border-4 bg-red-700 text-white w-[50px]'>Yes</button>
                            <button onClick={toggleModal} className='rounded-lg border-4 bg-red-700 text-white w-[50px]'>No</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
