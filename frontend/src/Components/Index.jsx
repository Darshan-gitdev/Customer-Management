import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

function Index() {
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  const [customerForm, setCustomerForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    email: '',
    mobileNo: ''
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAllCustomersFromServer();
  }, []);

  const getAllCustomersFromServer = () => {
    axios.get('http://localhost:9090/customer').then(
      (response) => {
        setCustomers(response.data);
        toast.success("Customers rendered successfully");
      },
      (error) => {
        toast.error("Error! Something went wrong");
      }
    );
  };

  const deleteCustomer = (id) => {
    axios.delete(`http://localhost:9090/customer/${id}`).then(
      (response) => {
        toast.success("Customer deleted successfully");
        setCustomers(customers.filter(customer => customer.id !== id));
      },
      (error) => {
        toast.error("Customer not deleted successfully");
      }
    );
  };

  const handleShowModal = (customer = null) => {
    if (customer) {
      setIsEditing(true);
      setCurrentCustomer(customer);
      setCustomerForm({
        firstName: customer.firstName,
        lastName: customer.lastName,
        address: customer.address,
        city: customer.city,
        state: customer.state,
        email: customer.email,
        mobileNo: customer.mobileNo
      });
    } else {
      setIsEditing(false);
      setCurrentCustomer(null);
      setCustomerForm({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        email: '',
        mobileNo: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      axios.put(`http://localhost:9090/customer/${currentCustomer.id}`, customerForm).then(
        (response) => {
          setCustomers(customers.map(customer =>
            customer.id === currentCustomer.id ? response.data : customer
          ));
          toast.success("Customer updated successfully");
          handleCloseModal();
          getAllCustomersFromServer();
        },
        (error) => {
          toast.error("Error updating customer");
        }
      );
    } else {
      axios.post('http://localhost:9090/customer', customerForm).then(
        (response) => {
          setCustomers([...customers, response.data]);
          toast.success("Customer added successfully");
          handleCloseModal();
        },
        (error) => {
          toast.error("Error adding customer");
        }
      );
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <h1 style={{ textAlign: "center" }}>CUSTOMER TABLE</h1>
      <button type="button" className="btn btn-danger" onClick={() => handleShowModal()}>
        Add Customer
      </button>
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearchChange}
        className="form-control my-3"
      />

      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Address</th>
            <th scope="col">City</th>
            <th scope="col">State</th>
            <th scope="col">Email</th>
            <th scope="col">Phone NO.</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.id}</td>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.address}</td>
              <td>{customer.city}</td>
              <td>{customer.state}</td>
              <td>{customer.email}</td>
              <td>{customer.mobileNo}</td>
              <td>
                <button
                  type="button"
                  className="btn"
                  onClick={() => deleteCustomer(customer.id)}
                >
                  <MdDelete />
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => handleShowModal(customer)}
                >
                  <MdEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: "block" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditing ? "Edit Customer" : "Add Customer"}</h5>
                <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={customerForm.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={customerForm.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={customerForm.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={customerForm.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      className="form-control"
                      name="state"
                      value={customerForm.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={customerForm.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="mobileNo"
                      value={customerForm.mobileNo}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
}

export default Index;
