import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { IoMdTrash } from 'react-icons/io'
import { MdOutlineEdit } from 'react-icons/md'
import { db } from '../config/firebase'
import UseDisclose from '../hooks/UseDisclose'
import AddandUpdate from './AddandUpdate'
import { toast } from 'react-toastify'

const ContactCard = ({ contact }) => {

  const {isOpen, onOpen, onClose}= UseDisclose()
  const deleteContact = async(id) => {
    try {
      await deleteDoc(doc(db, "contact", id))
      toast.success("Contact deleted Successfully")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <div key={contact.id} 
    className='bg-yellow flex gap-5 items-center rounded-lg p-2 justify-between '>
      <div className='flex gap-1'>
      <HiOutlineUserCircle color='orange' className='text-4xl'/>
      <div>
        <h2 className='font-medium'>{contact.name}</h2>
        <p className='text-sm'>{contact.email}</p>
      </div>
      </div>
      <div className='flex text-2xl items-center'>
        <MdOutlineEdit onClick={onOpen} className='cursor-pointer' color='gray'/>
        <IoMdTrash onClick={() => deleteContact(contact.id)} className='cursor-pointer' color='gray'/>
      </div>
    </div>
    <AddandUpdate contact={contact} isUpdate onClose={onClose} isOpen={isOpen} />
   
    </>
  )
}

export default ContactCard