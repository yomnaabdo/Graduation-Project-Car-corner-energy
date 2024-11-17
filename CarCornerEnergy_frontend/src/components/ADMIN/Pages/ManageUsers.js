import React, { useState, useEffect } from 'react';
import '../css/MangU.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 
{ ResponsiveContainer } 
from 'recharts';
import FooterAdmin from '../FooterAdmin';

 
function ManageUsers() {
	let {_id}= useParams();
	const initialUsers = [
		{
		  id: 1, name: 'Full name 1', role: 'Member', created: '2013/08/12', status: 'pending',
		  email: 'marlon@brando.com', image: 'https://bootdey.com/img/Content/user_1.jpg',
		  password: 'password1', phone: '123-456-7890', make: 'Toyota', model: 'Camry'
		},
		{
		  id: 2, name: 'Full name 2', role: 'Admin', created: '2013/08/12', status: 'active',
		  email: 'marlon@brando.com', image: 'https://bootdey.com/img/Content/user_3.jpg',
		  password: 'password2', phone: '098-765-4321', make: 'Honda', model: 'Civic'
		},
		{
		  id: 3, name: 'Full name 3', role: 'Member', created: '2013/08/12', status: 'inactive',
		  email: 'marlon@brando.com', image: 'https://bootdey.com/img/Content/user_2.jpg',
		  password: 'password3', phone: '555-555-5555', make: 'Ford', model: 'Focus'
		},
	  ];
	
	  const [users, setUsers] = useState(initialUsers);
	  const [editingId, setEditingId] = useState(null);
	  const [formData, setFormData] = useState({});
	  const handleCancel = () => {
		setEditingId(null);
		setFormData({});
	  };
	  
	

	  useEffect(() => {
       
        axios.get('/api/v1/users')
            .then(response => {
                setUsers(response.data.data);
				
            })
            .catch(error => {
                console.error('Error fetching users:', error);
				alert('error in fetch useres ');
            });
    }, []);



	const handleEdit = (user) => {
		setEditingId(user._id); 
		setFormData({
			name: user.name,
			created: user.created,
			status: user.status,
			email: user.email,
			password: user.password,
			phone: user.phone,
			make: user.make,
			model: user.model
		});
	}; 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

	const handleSave = (userId) => {
		const { name, email, phone, make, model } = formData;
	
		console.log('Form Data ID:', userId); 
	
		const updatedData = { name, email, phone, make, model };
	
		if (formData.password) {
			updatedData.password = formData.password;
		}
	
		axios.put(`/api/v1/users/${userId}`, updatedData)
			.then(response => {
				console.log(response.data);
				setUsers(users.map(user => (user._id === userId ? response.data.data : user)));
				setEditingId(null);
				
			})
			.catch(error => {
				console.error('Error updating user:', error);
				alert('Failed to update user');
			});
	};
	
    
const handleDelete = (userId) => {
	if (window.confirm('Are you sure you want to delete this user?')) {
		axios.delete(`/api/v1/users/${userId}`)
			.then(() => {
				setUsers(users.filter(user => user._id !== userId));
				 
			})
			.catch(error => {
				console.error('Error deleting user:', error);
				alert('Failed to delete user');
			});
	}
};
	

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		const { name, email, password, phone, make, model } = formData;
	
		// Ensure all required fields are filled
		// if (!name || !email || !password || !passwordConfirm || !phone || !make || !model) {
		// 	alert('Please fill all required fields.');
		// 	return;
		// }
	
		// Check if password and confirm password match
		// if (password !== passwordConfirm) {
		// 	alert('Password and confirm password do not match.');
		// 	return;
		// }
	
		try {
			const response = await axios.post('/api/v1/users', {
				name,
				email,
				password,
				
				phone,
				make,
				model
			});
	
			const newUser = response.data.user;
			setUsers([...users, newUser]);
			setFormData({}); 
			alert('User added successfully');
		} catch (error) {
			console.error('Error adding user:', error);
			if (error.response && error.response.data && error.response.data.error) {
				alert(error.response.data.error);
			} else {
				alert('Failed to add user. Please try again later.');
			}
		}
	};
	
	
	  return (
		<div>
		<div className="container bootstrap snippets bootdey">
		  <div className="row">
			<div className="col-lg-12">
			  <div className="main-box no-header clearfix">
				<div className="main-box-body clearfix">
				  <div className="table-responsive">
					<table className="table user-list">
					  <thead>
						<tr>
						  <th><span>User</span></th>
						  <th><span>Created</span></th>
						  <th className="text-center"><span>Status</span></th>
						  <th><span>Email</span></th>
						  <th><span>Password</span></th>
						  <th><span>Phone</span></th>
						  <th><span>Make</span></th>
						  <th><span>Model</span></th>
						  <th>&nbsp;</th>
						</tr>
					  </thead>
					  <tbody>
						{users.map(user => (
						  <tr key={user._id}>
							<td>
							  <img src={user.image} alt="" />
							  {editingId === user._id ? (
								<input type="text" name="name" value={formData.name} onChange={handleChange} />
							  ) : (
								<>
								  <span className="user-link">{user.name}</span>
								  <span className="user-subhead">{user.role}</span>
								</>
							  )}
							</td>
							<td>
							  {editingId === user._id ? (
								<input type="text" name="created" value={formData.created} onChange={handleChange} />
							  ) : (
								user.created
							  )}
							</td>
							<td className="text-center">
							  {editingId === user._id ? (
								<input type="text" name="status" value={formData.status} onChange={handleChange} />
							  ) : (
								<span className={`label label-${user.status}`}>{user.status}</span>
							  )}
							</td>
							<td>
							  {editingId ===user._id ? (
								<input type="text" name="email" value={formData.email} onChange={handleChange} />
							  ) : (
								<a href="#">{user.email}</a>
							  )}
							</td>
							<td>
							  {editingId === user._id ? (
								<input type="text" name="password" value={formData.password} onChange={handleChange} />
							  ) : (
								user.password
							  )}
							</td>
							<td>
							  {editingId === user._id ? (
								<input type="text" name="phone" value={formData.phone} onChange={handleChange} />
							  ) : (
								user.phone
							  )}
							</td>
							<td>
							  {editingId ===user._id ? (
								<input type="text" name="make" value={formData.make} onChange={handleChange} />
							  ) : (
								user.make
							  )}
							</td>
							<td>
							  {editingId === user._id ? (
								<input type="text" name="model" value={formData.model} onChange={handleChange} />
							  ) : (
								user.model
							  )}
							</td>
							<td style={{ width: '20%' }}>
							  {editingId === user._id ? (
								<>
								  <button onClick={() => handleSave(user._id)} className="table-link text-success">Save</button>

								  <button onClick={handleCancel} className="table-link text-danger">Cancel</button>
								</>
							  ) : (
								<>
								 <a href="#" onClick={() => handleEdit(user)} className="table-link text-info">
    <span className="fa-stack">
        <i className="fa fa-square fa-stack-2x"></i>
        <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
    </span>
</a>

								  <a href="#" onClick={() => handleDelete(user._id)} className="table-link danger">
									<span className="fa-stack">
									  <i className="fa fa-square fa-stack-2x"></i>
									  <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
									</span>
								  </a>
								</>
							  )}
							</td>
						  </tr>
						))}
					  </tbody>
					</table>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		</div>


<ResponsiveContainer><FooterAdmin/> </ResponsiveContainer>
        
    </div>

  )
}

export default ManageUsers