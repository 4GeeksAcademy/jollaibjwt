import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const LoginPage = () => {
	const { store, actions } = useContext(Context);

    
    const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};


    const handleLogin = async () => {
		const response = await fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		});
		const data = await response.json();
		if (response.ok) {
			setMessage(data.msg);
		} else {
			setMessage(data.msg);
		}
	};

	return (
		<div className="text-center mx-5 mt-5">
			<h1>Login</h1>
            <div className="  mx-5 input-group mb-3" style={{width: '70vw'}}>
                <span className="input-group-text" id="basic-addon1">@</span>
                <input onChange={handleChange} name="email" type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <div className="  mx-5 input-group mb-3" style={{width: '70vw'}}>
                <span className="input-group-text" id="basic-addon1">Password</span>
                <input onChange={handleChange} name="password" type="text" className="form-control" placeholder="password" aria-label="password" aria-describedby="basic-addon1"/>
            </div>
            <button onClick={handleLogin} type="btn" className="btn btn-success">Log in</button>
            <Link to="/signup">
                <p>Don't have an account, Sign Up</p>
            </Link>
		</div>
	);
};
