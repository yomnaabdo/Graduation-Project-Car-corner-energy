import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Alert from 'react-bootstrap/Alert';
import { ResponsiveContainer } from 'recharts';
import FooterAdmin from '../FooterAdmin';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ManageCoupons = () => {
  let { _id } = useParams();
  const [Coupons, setCoupons] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [deleteAlerts, setDeleteAlerts] = useState({});

  const [newCoupon, setNewCoupon] = useState({ name: '', expire: new Date(), discount: '' });
  const [editCouponId, setEditCouponId] = useState(null);
  const [editCouponData, setEditCouponData] = useState({ name: '', expire: new Date(), discount: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/coupons");
        setCoupons(response.data.data);
        // alert("Data fetched successfully");
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const handleAddCoupon = () => {
    axios.post('/api/v1/coupons', newCoupon)
      .then(response => {
        setCoupons([...Coupons, response.data.coupon]);
        setNewCoupon({ name: '', expire: new Date(), discount: '' });
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
      })
      .catch(error => {
        console.error('Error adding coupon:', error);
      });
  };

  const handleDeleteCoupon = (CouponId) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      axios.delete(`/api/v1/coupons/${CouponId}`)
        .then(() => {
          setCoupons(Coupons.filter(Coupon => Coupon._id !== CouponId));
          setDeleteAlerts({ ...deleteAlerts, [CouponId]: true });
          setTimeout(() => setDeleteAlerts({ ...deleteAlerts, [CouponId]: false }), 2000);
        })
        .catch(error => {
          console.error('Error deleting Coupon:', error);
          alert('Failed to delete Coupon');
        });
    }
  };


  const handleEditClick = (Coupon) => {
    setEditCouponId(Coupon._id);
    setEditCouponData({ name: Coupon.name, expire: new Date(Coupon.expire), discount: Coupon.discount });
  };

  const handleSaveEdit = () => {
    axios.put(`/api/v1/coupons/${editCouponId}`, editCouponData)
      .then(() => {
        setCoupons(Coupons.map(coupon =>
          coupon._id === editCouponId ? { ...coupon, ...editCouponData } : coupon
        ));
        setShowUpdateAlert(true);
        setTimeout(() => setShowUpdateAlert(false), 2000);
      })
      .catch(error => {
        console.error('Error updating Coupon:', error);
        alert('Coupon updated failed');
      });
  };

  return (
    <div className="container mt-5">
      <h2>Coupons Table</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Expire</th>
            <th>Discount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Coupons.map(Coupon => (
            <tr key={Coupon._id}>
              {editCouponId === Coupon._id ? (
                <>
                  <td>
                    <Form.Control
                      type="text"
                      value={editCouponData.name}
                      onChange={e => setEditCouponData({ ...editCouponData, name: e.target.value })}
                    />
                  </td>
                  <td>
                    <DatePicker
                      selected={editCouponData.expire}
                      onChange={date => setEditCouponData({ ...editCouponData, expire: date })}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      value={editCouponData.discount}
                      onChange={e => setEditCouponData({ ...editCouponData, discount: e.target.value })}
                    />
                  </td>
                  <td>
                    <Button variant="success" onClick={handleSaveEdit}>Save</Button>
                    <Button variant="secondary" onClick={() => setEditCouponId(null)}>Cancel</Button>
                    <Alert variant="success" show={showUpdateAlert}>
                      <Alert.Heading>Coupon updated successfully</Alert.Heading>
                     
                    </Alert>
                  </td>
                </>
              ) : (
                <>
                  <td>{Coupon.name}</td>
                  <td>{new Date(Coupon.expire).toLocaleDateString()}</td>
                  <td>{Coupon.discount}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleEditClick(Coupon)}>Edit</Button>{' '}
                    <Button variant="danger" onClick={() => handleDeleteCoupon(Coupon._id)}>Delete</Button>
                    <Alert variant="danger" show={deleteAlerts[Coupon._id] || false}>
                      <Alert.Heading>Coupon deleted successfully</Alert.Heading>
                     
                    </Alert>
                  </td>
                </>
              )}
            </tr>
          ))}
          <tr>
            <td>
              <Form.Control
                type="text"
                value={newCoupon.name}
                onChange={e => setNewCoupon({ ...newCoupon, name: e.target.value })}
              />
            </td>
            <td>
              <DatePicker
                selected={newCoupon.expire}
                onChange={date => setNewCoupon({ ...newCoupon, expire: date })}
              />
            </td>
            <td>
              <Form.Control
                type="number"
                value={newCoupon.discount}
                onChange={e => setNewCoupon({ ...newCoupon, discount: e.target.value })}
              />
            </td>
            <td>
              <Button variant="success" onClick={handleAddCoupon}>Add Coupon</Button>
              <Alert variant="success" show={showAlert}>
                <Alert.Heading>Coupon added successfully</Alert.Heading>
              </Alert>
            </td>
          </tr>
        </tbody>
      </Table>
      <ResponsiveContainer><FooterAdmin /></ResponsiveContainer>
    </div>
  );
};

export default ManageCoupons;
