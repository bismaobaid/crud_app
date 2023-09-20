import React, { useContext } from "react";
import Layout from "../components/Layout/Layout";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { updateData } from "../context/Context";

const Edit = () => {
  const { id } = useParams();
  console.log(id);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [mobile, setMobile] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const { updatedata, setUpdatedata } = useContext(updateData);

  const getviewUser = async () => {
    try {
      const res = await axios.get(`/api/view/${id}`);
      setName(res.data.name);
      setEmail(res.data.email);
      setJob(res.data.job);
      setMobile(res.data.mobile);
      setDescription(res.data.description);
      console.log("get data");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getviewUser();
  }, []);

  const updatehandleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, job, mobile, description);
    try {
      const res2 = await axios.put(`/api/update/${id}`, {
        name,
        email,
        job,
        mobile,
        description,
      });
      if (res2.data.success) {
        alert("user edit successfully");
        navigate("/");
        setUpdatedata(res2.data);
        console.log(res2.data.message);
      } else {
        alert("user edit successfully");
        console.log(res2.data.message);
        navigate("/");
        setUpdatedata(res2.data);
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
            <Form onSubmit={updatehandleSubmit}>
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
              <Form.Group className="mb-3" controlId="formBasicMobile">
                <Form.Label>Mobile: </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Phone"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicWork">
                <Form.Label>Work: </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Work"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
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

export default Edit;
