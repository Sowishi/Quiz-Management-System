import { Button, Table } from "react-bootstrap";
import Layout from "./layout";
import { useEffect, useState } from "react";
import CreateUserModal from "./createUserModal";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";

const CreateUser = () => {
  const [userModal, setUserModal] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    });

    return () => unsubscribe();
  }, []);

  const deleteUser = (id) => {
    const userDoc = doc(db, "users", id);
    try {
      deleteDoc(userDoc);
      toast.success("Successfully Deleted!");
    } catch (error) {
      toast.error(error.toString());
    }
  };

  return (
    <Layout>
      <CreateUserModal show={userModal} hide={() => setUserModal(false)} />

      <div className="container-fluid my-5">
        <div className="row mx-3">
          <div className="col-12 d-flex justify-content-end align-items-center my-3">
            <Button
              variant="success px-3 py-2"
              onClick={() => setUserModal(true)}
            >
              Create User
            </Button>
          </div>
        </div>
        <div className="col-12">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Date Created</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user, index) => {
                  return (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <th>{user.fullName}</th>
                      <th>{user.email}</th>
                      <th>{Date(user.createdAt).substring(0, 25)}</th>
                      <th>
                        <Button
                          variant="danger"
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </Button>
                      </th>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default CreateUser;
