import React from 'react'
import Modal from './Modal'
import {  ErrorMessage, Field, Form, Formik } from 'formik'
import { db } from '../config/firebase'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import {toast} from "react-toastify"
import * as Yup from "yup"

const SchemaValidation = Yup.object().shape({
  name: Yup.string().required("Please enter Your Name (no special characters or numeric values)"),
  email: Yup.string().email("Invalid Email").required("Please enter Your Email")
}) 

const AddandUpdate = ({isOpen, onClose, isUpdate, contact}) => {

  const addContact = async(contact) => {
    try {
      const contactRef = collection(db, "contact")
      await addDoc(contactRef, contact)
      onClose()
      toast.success("Contact added Successfully")
    }
    catch (error) {
      console.log(error);
    }
  }
  const updateContact = async(contact, id) => {
    try {
      const contactRef = doc(db, "contact", id)
      await updateDoc(contactRef, contact)
      onClose()
      toast.success("Contact updated Successfully")
    }
    catch (error) {
      console.log(error);
    }
  }
  return (
    <div className=''>
    <Modal isOpen={isOpen} onClose={onClose}>
      <Formik
      validationSchema={SchemaValidation}
       initialValues={
        isUpdate
        ? {
        name: contact.name,
        email: contact.email,
       }
      :
      {
        name: "",
        email: "",
      }}
       onSubmit={(values) => {
        // console.log(values);
        isUpdate ?
        updateContact(values, contact.id) :
        addContact(values)
       }}
      >
        <Form className='flex flex-col gap-2'>
            <div className='flex flex-col gap-1'>
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" className=" h-10 border" />
            <div className='text-xs text-red'>
              <ErrorMessage name="name"/>
            </div>
            </div>
            <div className='flex flex-col gap-1'>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" className=" h-10 border" />
            <div className='text-xs text-red'>
              <ErrorMessage name="email"/>
            </div>
            </div>
            <button className='w-20 text-green-200 bg-emerald-950 mt-2 rounded-lg'>
              {isUpdate ? "UPDATE" : "ADD"}
            </button>
        </Form>
      </Formik>
    </Modal>
    </div>
  )
}

export default AddandUpdate