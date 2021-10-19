import 'twin.macro';
import React, { useEffect, useState } from 'react';
import { Modal } from './Modal';
import { CountDownComponent } from './CountDown';


export const IdleTime = () => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [timeLeftTrigger, setTimeLeftTrigger] = useState<any>(undefined);
    const handleStayActive = () => {
        setModalOpen(false);
      };
    function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('profilePic');
    localStorage.removeItem('isLoggedIn');

    // redirect to sign in page
    window.location.replace(
        `${window.location.protocol}///signin?next=${encodeURIComponent(
        window.location.href,
        )}`,
    );
    }
    return (
        <div>
          {isModalOpen && (
            <Modal show={isModalOpen} modalClosed={() => setModalOpen(false)}>
              <div className="sessionexpiry">
                <>
                  <CountDownComponent setTimeLeftTrigger={setTimeLeftTrigger} />
                  <p>Do you want to renew your session ?</p>
                  <div className="btn_section flex">
                    <button
                      className="button btn-primary large"
                      onClick={handleStayActive}
                    >
                      Stay Signed In
                    </button>
                    <button
                      className="button btn-primary large"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </>
              </div>
            </Modal>
          )}
        </div>
      );
};

