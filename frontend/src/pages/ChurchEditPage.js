import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { listChurches, updateChurch } from "../actions/churchActions";

const ChurchEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [leader, setLeader] = useState("");
  const [admin, setAdmin] = useState("");

  const churchList = useSelector((state) => state.churchList);
  const { churches } = churchList;

  const churchUpdate = useSelector((state) => state.churchUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = churchUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: "CHURCH_UPDATE_RESET" });
      navigate("/churches");
    } else {
      if (!churches || churches.length === 0) {
        dispatch(listChurches());
      } else {
        const church = churches.find((c) => c._id === id);
        if (church) {
          setName(church.name);
          setAddress(church.address);
          setCity(church.city ? church.city._id : "");
          setLeader(church.leader ? church.leader._id : "");
          setAdmin(church.admin ? church.admin._id : "");
        }
      }
    }
  }, [dispatch, navigate, id, churches, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateChurch({ _id: id, name, address, city, leader, admin }));
  };

  return (
    <>
      <Link to="/churches" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>{id ? "Edit Church" : "Add Church"}</h1>
        {loadingUpdate && <h2>Loading...</h2>}
        {errorUpdate && <h3>{errorUpdate}</h3>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="leader">
            <Form.Label>Leader</Form.Label>
            <Form.Control
              as="select"
              value={leader}
              onChange={(e) => setLeader(e.target.value)}
            >
              <option value="">Select Leader</option>
              <option value="Bishop">Bishop</option>
              <option value="Pastor">Pastor</option>
              <option value="Deacon">Deacon</option>
              <option value="Elder">Elder</option>
              <option value="Church Member">Church Member</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="admin">
            <Form.Label>Admin</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter admin"
              value={admin}
              onChange={(e) => setAdmin(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ChurchEditPage;
