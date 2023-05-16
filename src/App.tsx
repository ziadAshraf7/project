import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/login';
import Result from './pages/result';
import Search from './pages/search';
import Adminstration from './pages/adminstration';
import Edit from './pages/edit';
import useAuth from './custom hooks/useAuth';
import MainContext from './contexts/app';
import { useTranslation } from 'react-i18next';
import { addDoc, collection } from '@firebase/firestore';
import { db } from './firebase/src/app';
import { employees, floors, offices } from './firebase/data';





function App() {
  const { t, i18n } = useTranslation();


  const {
    getOffices,
    getEmployees,
    getFloorByEmployee,
    getEmployee,
    login,
    getFloors,
    updateFloor,
    getFloor,
    updateEmployee,
    updateOffice,
    deleteOffice,
    deleteEmployee,
    deleteFloor,
    add,
    addFloor,
    getOffice,
    getFloorByOffice,
    getFloorName,
    user
  } = useAuth()


  useEffect(() => {
    if (localStorage.getItem("lang") == "ar") {
      i18n.changeLanguage("ar")
    } else {
      i18n.changeLanguage("en")
    }
  }, [])





  // useEffect(() => {

  //   (async () => {

  //     // const myCollectionRef1 = collection(db, 'employees');
  //     // const myCollectionRef2 = collection(db, 'offices');
  //     const myCollectionRef3 = collection(db, 'floors');

  //     // employees.map(async (item) => {
  //     //   await addDoc(myCollectionRef1, item);
  //     // })

  //     // offices.map(async (item) => {
  //     //   await addDoc(myCollectionRef2, item);
  //     // })

  //     floors.map(async (item) => {
  //       await addDoc(myCollectionRef3, item);
  //     })


  //   })()


  // }, [])






  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login"
          element={<Login
            login={login}
            user={user}
          />} />

        <Route path="/result/:code"
          element={<Result
            getFloorName={getFloorName}
            getFloorByEmployee={getFloorByEmployee}
            getEmployee={getEmployee}
            getFloorByOffice={getFloorByOffice}
            getOffice={getOffice}
            getOffices={getOffices}
            getEmployees={getEmployees}
          />} />

        <Route path="/search"
          element={<Search
            getOffices={getOffices}
            getEmployees={getEmployees}
          />} />

        <Route path="/adminstration"
          element={<Adminstration
            user={user}
            updateEmployee={updateEmployee}
            getOffices={getOffices}
            updateOffice={updateOffice}
            getEmployees={getEmployees}
            add={add}
            addFloor={addFloor}
            deleteFloor={deleteFloor}
            getFloors={getFloors}
            updateFloor={updateFloor} />} />

        <Route path="/edit/:code"
          element={<Edit
            deleteOffice={deleteOffice}
            user={user}
            deleteEmployee={deleteEmployee}
            updateFloor={updateFloor}
            updateOffice={updateOffice}
            updateEmployee={updateEmployee}
            getFloor={getFloor}
            deleteFloor={deleteFloor}
            add={add}
          />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
