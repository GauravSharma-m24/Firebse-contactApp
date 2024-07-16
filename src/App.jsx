
import './App.css'

import Navbar from './components/Navbar'
import { IoIosSearch, IoMdTrash } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot  } from "firebase/firestore"; 
import { db } from "./config/firebase";
import ContactCard from './components/ContactCard';
import AddandUpdate from './components/AddandUpdate';
import UseDisclose from './hooks/UseDisclose';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import NotFound from './components/NotFound';



function App() {

  const [contacts, setContacts] = useState([])
  const {isOpen, onOpen, onClose}= UseDisclose()

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contact")
        // const contactsSnapshot = await getDocs(contactsRef)

        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            }
          });
          // console.log(contactLists);
          setContacts(contactLists)
          return contactLists
        })

        
      }
      catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, [])

  const filter = (e) => {
    const value = e.target.value
    const contactsRef = collection(db, "contact")
    // const contactsSnapshot = await getDocs(contactsRef)

    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        }
      });

      const filtered = contactLists.filter((contact) => 
        contact.name.toLowerCase().includes(value.toLowerCase()))

      // console.log(contactLists);
      setContacts(filtered)
      return filtered
    })
  }

  return (
    <>
    <div className='mx-auto max-w-[370px]'>
     <Navbar/>
     <div className='flex gap-20'>
     <div className='relative flex items-center'>
     <IoIosSearch className='absolute ml-1 text-3xl text-white' />
      <input  
      className='input rounded-lg h-10 flex-grow' 
      onChange={filter}
      type="text"
      placeholder='Search Contact' />
     </div>
     
     <CiCirclePlus color='white' className='text-5xl cursor-pointer ' onClick={onOpen}/>
     </div>
     <div className='gap-3 flex flex-col mt-4'>
      {contacts.length <= 0 ? (<NotFound/>) :
     ( contacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      )))}
     </div>
    </div>
    <AddandUpdate onClose={onClose} isOpen={isOpen} />
    <ToastContainer position="bottom-center" />
    </>
  )
}

export default App
