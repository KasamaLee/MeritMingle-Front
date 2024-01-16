import { useAuth } from '../hooks/use-auth'
import RegisterInput from '../features/auth/RegisterInput'
import { useState } from 'react'
import Modal from '../components/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import ProfileInfoForm from '../features/auth/ProfileInfoForm';
import PasswordForm from '../features/auth/PasswordForm';


export default function Profile() {

  const { authUser, updateProfileInfo } = useAuth()
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [isOpenPasswordModal, setIsOpenPasswordModal] = useState(false)

  return (
    <div className='container p-24'>
      <h4 className='text-3xl text-center'>Your Profile</h4>
      <div className='flex flex-col gap-8 p-16 shadow-lg rounded-xl'>

        <div className='grow flex justify-between'>
          <div className='flex flex-col gap-4'>
            <div>
              <span className='text-gray-400'>ชื่อ-สกุล</span>
              <p>{authUser.firstName} {authUser.lastName}</p>
            </div>

            <div>
              <span className='text-gray-400'>e-mail</span>
              <p>{authUser.email}</p>
            </div>

            <div>
              <span className='text-gray-400'>mobile</span>
              <p>{authUser.mobile ? (authUser.mobile) : ('none')}</p>
            </div>
          </div>

          <div
            className='cursor-pointer text-gray-500 hover:text-blue-500 active:text-blue-500 flex gap-2'
            onClick={() =>{ setIsOpenEditModal(true)}}
          >
            <span>แก้ไข</span>
            <FontAwesomeIcon icon={faEdit} size='xl' />
          </div>
        </div>

        <div
          className='grow flex flex-col gap-1'
          onClick={() => setIsOpenPasswordModal(true)}
        >
          <span className='text-gray-400'>password</span>
          <div className='flex gap-2 justify-between'>
            <FontAwesomeIcon icon={faEyeSlash} size='lg' />
            <div className='cursor-pointer text-gray-500 hover:text-blue-500 active:text-blue-500 flex gap-2'>
              <span>แก้ไข</span>
              <FontAwesomeIcon icon={faEdit} size='xl' />
            </div>
          </div>
        </div>
      </div>

      <Modal open={isOpenEditModal} onCloseModal={() => setIsOpenEditModal(false)}>
        <ProfileInfoForm setIsOpenEditModal={setIsOpenEditModal}></ProfileInfoForm>
      </Modal>

      <Modal open={isOpenPasswordModal} onCloseModal={() => setIsOpenPasswordModal(false)}>
        <PasswordForm></PasswordForm>
      </Modal>

    </div>
  )
}
