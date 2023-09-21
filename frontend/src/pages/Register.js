import React, { useState, useContext } from "react";
import Layout from "../components/Layout/Layout";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addData, deleteData } from "../context/Context";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [mobile, setMobile] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const { userdata, setUserdata } = useContext(addData);
  const { deletedata, setDeletedata } = useContext(deleteData);

  if (deletedata != null) {
    setDeletedata("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, job, mobile, description);
    try {
      const res = await axios.post("/api/create", {
        name,
        email,
        job,
        mobile,
        description,
      });
      if (res.status === 200) {
        alert(res.data.message);
        navigate("/");
      } else if (res.status === 201) {
        alert(res.data.message);
        navigate("/");
        setUserdata(res.data);
      }
    } catch (error) {
      console.log(error);
      alert("something went wrong ");
    }
  };

  return (
    <Layout>
      <Container className="reg">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name: </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email: </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicJob">
                <Form.Label>job: </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Job"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicMobile">
                <Form.Label>Mobile: </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description: </Form.Label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Register;
