



import React, { useEffect, useState } from 'react'

import { getFirestore, collection, addDoc, getDocs, query, where, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { app, db } from '../firebase/src/app';


import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";


let auth = getAuth()

function useAuth() {

    let [user, setUser] = useState<any>("")

    async function getOffices() {
        const querySnapshot = await getDocs(collection(db, "offices"));
        const fetchedOffices = querySnapshot.docs.map((doc) => doc.data());
        return fetchedOffices
    };

    async function getOffice(code: any) {
        const q = query(collection(db, 'offices'), where('code', '==', code));
        const fetchedFlooes = await getDocs(q)
        return fetchedFlooes.docs[0].data()
    }

    async function getFloor(name: any) {
        const q = query(collection(db, 'floors'), where('name', '==', name));
        const fetchedFlooes = await getDocs(q)
        return fetchedFlooes.docs[0].data()
    }


    async function getFloors() {
        const querySnapshot = await getDocs(collection(db, "floors"));
        const fetchedFlooes = querySnapshot.docs.map((doc) => doc.data());
        return fetchedFlooes
    }

    async function getEmployees() {
        const querySnapshot = await getDocs(collection(db, "employees"));
        const employees = querySnapshot.docs.map((doc) => doc.data());
        return employees
    }

    async function getEmployee(employeeCode: any) {
        const q = query(collection(db, 'employees'), where('code', '==', employeeCode));
        const floorsSnapshot = await getDocs(q);
        return floorsSnapshot.docs[0].data()
    }

    async function getFloorByEmployee(employeeCode: string) {
        const q = query(collection(db, 'floors'), where('employees', 'array-contains', employeeCode));
        const floorsSnapshot = await getDocs(q);
        return floorsSnapshot
    }

    async function getFloorByOffice(code: any) {
        const q = query(collection(db, 'floors'), where('offices', 'array-contains', code));
        const floorsSnapshot = await getDocs(q);
        return floorsSnapshot
    }



    async function getFloorName(code: any) {
        const q = query(collection(db, 'floors'), where('offices', 'array-contains', code));
        const floorsSnapshot: any = await getDocs(q);


        return floorsSnapshot[0].data().name
    }


    useEffect(() => {
        auth.onAuthStateChanged(async user => {
            if (!user) {
                setUser(null)
                auth.signOut()
                return
            }
            const uid = user.uid
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            setUser(uid)
            console.log("djhkjghuguiguigyug")
        })
    }, [])

    async function login(email: any, Password: any) {
        if (!email || !Password) throw Error("forbidden")
        try {
            await signInWithEmailAndPassword(auth, email, Password)
        } catch (err: any) {
            switch (err.code) {
                case "auth/invalid-email":
                    throw new Error("Invalid email address.");
                case "auth/user-disabled":
                    throw new Error("User has been disabled.");
                case "auth/user-not-found":
                    throw new Error("User not found.");
                case "auth/wrong-password":
                    throw new Error("Wrong password.");
                default:
                    throw new Error("An error occurred while signing in:" + err.message,);
            }
        }
    }

    async function updateEmployee({ codeData, newName, newFloorName }: {
        codeData: any,
        newName: any,
        newFloorName: any
    }) {
        const q = query(collection(db, 'employees'), where('code', '==', codeData.prev));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((item) => {
            const docRef = doc(db, "employees", item.id);
            updateDoc(docRef, {
                floor: newFloorName,
                code: codeData.new,
                name: newName
            });
        });
    }

    async function updateOffice({ codeData, newName, newFloorName }: {
        codeData: any,
        newName: any,
        newFloorName: any
    }) {
        const q = query(collection(db, 'offices'), where('code', '==', codeData.prev));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((item) => {
            const docRef = doc(db, "offices", item.id);
            updateDoc(docRef, {
                floor: newFloorName,
                code: codeData.new,
                name: newName
            });
        });
    }


    async function checkForFloorCode(code: any) {
        const q = query(collection(db, 'floors'), where('employees', 'array-contains', code));
        let data: any = await getDocs(q)


        if (data.length > 0) {
            throw new Error("err")
        }

    }

    async function checkForOfficeCode(code: any) {
        const q = query(collection(db, 'floors'), where('offices', 'array-contains', code));
        let data: any = await getDocs(q)


        if (data.length > 0) {
            throw new Error("err")
        }

    }

    async function checkForFloorName(name: any) {
        const q = query(collection(db, 'floors'), where('name', '==', name));
        let data: any = await getDocs(q)


        if (data.length > 0) {
            throw new Error("err")
        }

    }



    async function updateFloor({ codeData, nameData, type }: {
        codeData: any,
        type: any,
        nameData: any
    }) {


        try {
            await checkForFloorCode(codeData.prev)
        } catch {
            throw new Error("err")
        }

        if (type == "employee") {
            const q = query(collection(db, 'floors'), where('employees', 'array-contains', codeData.prev));
            const employeesSnapshot = await getDocs(q);

            employeesSnapshot.forEach(async (item) => {
                const docRef = doc(db, "floors", item.id);
                const data = (await getDoc(docRef)).data()
                const employeesArray = data?.employees

                const newEmployeesArray = employeesArray.map((item: any) => {
                    if (item == codeData.prev) {
                        return codeData.new
                    } else {
                        return item
                    }
                })
                updateDoc(docRef, {
                    ...data,
                    employees: newEmployeesArray
                })
            })
        }


        if (type == "office") {
            const q = query(collection(db, 'floors'), where('offices', 'array-contains', codeData.prev));
            const officesSnapshot = await getDocs(q);

            officesSnapshot.forEach(async (item) => {
                const docRef = doc(db, "floors", item.id);
                const data = (await getDoc(docRef)).data()
                const employeesArray = data?.employees

                const newEmployeesArray = employeesArray.map((item: any) => {
                    if (item == codeData.prev) {
                        return codeData.new
                    } else {
                        return item
                    }
                })

                updateDoc(docRef, {
                    ...data,
                    offices: newEmployeesArray
                })

            })
        }

        if (type == "name") {
            try {
                await checkForFloorName(nameData.prev)
            } catch {
                throw new Error("err")
            }

            const q = query(collection(db, 'floors'), where('name', '==', nameData.prev));
            const floorsSnapshot = await getDocs(q);


            floorsSnapshot.forEach(async (item) => {
                const docRef = doc(db, "floors", item.id);
                const data = (await getDoc(docRef)).data()

                updateDoc(docRef, {
                    ...data,
                    name: nameData.new
                })
            })
        }
    }

    async function addFloor({ name }: {
        name: any
    }) {

        try {
            await checkForFloorName(name)
        } catch {
            throw new Error("err")
        }

        const collectionRef = collection(db, "floors");

        await addDoc(collectionRef, {
            name: name,
            employees: [],
            offices: []
        });

    }


    async function deleteEmployee(code: any) {
        const collectionRef = collection(db, "employees");

        const querySnapshot = await getDocs(query(collectionRef, where("code", "==", code)));

        querySnapshot.forEach(async (doc) => {
            try {
                await deleteDoc(doc.ref);
            } catch (error) {
            }
        });
    }

    async function deleteOffice(code: any) {
        const collectionRef = collection(db, "offices");

        const querySnapshot = await getDocs(query(collectionRef, where("code", "==", code)));

        querySnapshot.forEach(async (doc) => {
            try {
                await deleteDoc(doc.ref);
            } catch (error) {
            }
        });
    }


    async function deleteFloor({ code, name, type }: {
        code: any,
        type: any,
        name: any
    }) {


        if (type == "employee") {
            const q = query(collection(db, 'floors'), where('employees', 'array-contains', code));
            const employeesSnapshot = await getDocs(q);

            employeesSnapshot.forEach(async (item) => {
                const docRef = doc(db, "floors", item.id);
                const data = (await getDoc(docRef)).data()
                const employeesArray = data?.employees

                const newEmployeesArray = employeesArray.filter((item: any) => {
                    if (item.code !== code) {
                        return true
                    }
                })
                updateDoc(docRef, {
                    ...data,
                    employees: newEmployeesArray
                })
            })
        }

        if (type == "office") {
            const q = query(collection(db, 'floors'), where('offices', 'array-contains', code));
            const officesSnapshot = await getDocs(q);

            officesSnapshot.forEach(async (item) => {
                const docRef = doc(db, "floors", item.id);
                const data = (await getDoc(docRef)).data()
                const employeesArray = data?.employees

                const newEmployeesArray = employeesArray.filter((item: any) => {
                    if (item !== code) {
                        return true
                    }
                })

                updateDoc(docRef, {
                    ...data,
                    offices: newEmployeesArray
                })

            })
        }

        if (type == "floor") {
            const collectionRef = collection(db, "floors");

            const querySnapshot = await getDocs(query(collectionRef, where("name", "==", name)));

            querySnapshot.forEach(async (doc) => {
                try {
                    await deleteDoc(doc.ref);
                    console.log("Document deleted successfully");
                } catch (error) {
                    console.error("Error deleting document: ", error);
                }
            });
        }
    }




    async function add({ type, name, code, floor }: {
        type: string,
        name: string,
        code: string,
        floor: string
    }) {


        if (type == "employee") {
            try {
                await checkForFloorCode(code)
            } catch {
                throw new Error("err")
            }
            const collectionRef = collection(db, "employees");

            await addDoc(collectionRef, {
                name: name,
                code: code,
                floor: floor
            });

            const q = query(collection(db, 'floors'), where('employees', 'array-contains', code));
            const officesSnapshot = await getDocs(q);


            officesSnapshot.forEach(async (item) => {
                const docRef = doc(db, "floors", item.id);
                const data = (await getDoc(docRef)).data()
                const employeesArray = data?.employees

                const newEmployeesArray = employeesArray.push(code)

                updateDoc(docRef, {
                    ...data,
                    offices: newEmployeesArray
                })

            })
        }


        if (type == "office") {
            try {
                await checkForOfficeCode(code)
            } catch {
                throw new Error("err")
            }
            const collectionRef = collection(db, "offices");

            await addDoc(collectionRef, {
                name: name,
                code: code,
                floor: floor
            });

            const q = query(collection(db, 'floors'), where('offices', 'array-contains', code));
            const officesSnapshot = await getDocs(q);

            officesSnapshot.forEach(async (item) => {
                const docRef = doc(db, "floors", item.id);
                const data = (await getDoc(docRef)).data()
                const employeesArray = data?.employees

                const newEmployeesArray = employeesArray.push(code)

                updateDoc(docRef, {
                    ...data,
                    offices: newEmployeesArray
                })

            })
        }

    }




    // async function createEmail() {
    //     const auth = getAuth();
    //     const userCredential = await createUserWithEmailAndPassword(auth, "admin@gmail.com", "123456");
    //     const { uid } = userCredential.user;

    //     // Save email to Firestore
    //     const userDocRef = doc(db, "users", uid);
    //     await setDoc(userDocRef, {
    //         email: "admin@gmail.com",
    //     });
    // }

    return {
        getOffices,
        getEmployees,
        getFloorByEmployee,
        getEmployee,
        login,
        getFloors,
        getFloor,
        user,
        updateEmployee,
        updateFloor,
        addFloor,
        updateOffice,
        deleteOffice,
        deleteEmployee,
        getOffice,
        deleteFloor,
        add,
        getFloorName,
        getFloorByOffice
    }
}

export default useAuth
