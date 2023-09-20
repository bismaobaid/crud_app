import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Layout from "../components/Layout/Layout";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { addData, deleteData } from "../context/Context";
import { updateData } from "../context/Context";

const Home = () => {
  const [show, setShow] = useState(true);

  const { userdata, setUserdata } = useContext(addData);
  const { updatedata, setUpdatedata } = useContext(updateData);
  const { deletedata, setDeletedata } = useContext(deleteData);

  const [getUser, setGetUser] = useState([]);
  console.log(getUser);

  // view all the users

  const getInputdata = async (e) => {
    try {
      const res = await axios.get("/api/view");
      setGetUser(res.data);
      console.log("get data");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInputdata();
  }, []);

  // delete user

  const deleteuser = async (id) => {
    try {
      const res2 = await axios.delete(`/api/delete/${id}`);
      console.log(res2);
      console.log("delete data");
      getInputdata();
      setDeletedata(res2.data);
      console.log(deletedata);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      {userdata ? (
        <>
          <Alert
            variant="success"
            className="alert"
            onClose={() => setShow(false)}
            dismissible
          >
            User Added Successfully!
          </Alert>
        </>
      ) : (
        " "
      )}

      {updatedata ? (
        <>
          <Alert
            variant="info"
            className="alert"
            onClose={() => setShow(false)}
            dismissible
          >
            User updated Successfully!
          </Alert>
        </>
      ) : (
        " "
      )}

      {deletedata ? (
        <>
          <Alert
            variant="danger"
            className="alert"
            onClose={() => setShow(false)}
            dismissible
          >
            User deleted Successfully!
          </Alert>
        </>
      ) : (
        " "
      )}

      <Container className="con" fluid="md">
        <Row>
          <Col>
            <div className="buttonLocation">
              <Button variant="primary " className="button">
                <NavLink to="/register" className="link1">
                  Add User
                </NavLink>
              </Button>
            </div>
            <Table bordered responsive="sm">
              <thead>
                <tr>
                  <th className="p">ID</th>
                  <th className="p">NAME</th>
                  <th className="p">EMAIL</th>
                  <th className="p">JOB</th>
                  <th className="p">PHONE</th>
                  <th className="p">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {getUser.map((element, id) => {
                  return (
                    <>
                      <tr key={id}>
                        <td>{id + 1}</td>
                        <td>{element.name}</td>
                        <td>{element.email}</td>
                        <td>{element.job}</td>
                        <td>{element.mobile}</td>
                        <td className="alig">
                          <div className="bb">
                            <Button variant="success">
                              <NavLink
                                to={`/view/${element._id}`}
                                className="link1"
                              >
                                <i className="fa-solid fa-eye"></i>
                              </NavLink>
                            </Button>
                            <Button>
                              <NavLink
                                to={`/update/${element._id}`}
                                className="link1"
                              >
                                <i className="fa-solid fa-pen"></i>
                              </NavLink>
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => deleteuser(element._id)}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Home;
