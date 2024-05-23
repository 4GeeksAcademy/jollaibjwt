import React, {useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const SingupPage = () => {
	const { store, actions } = useContext(Context);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

    const handleSubmit = async () => {
		const response = await fetch('/api/signup', {
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

    useEffect(()=>{
        console.log(formData)
    }, [formData])

	return (
		<div className="text-center mx-5 mt-5">
			<h1>Sign Up</h1>
            <div className=" me-5 mx-5 input-group mb-3" style={{width: '70vw'}}>
                <span className="input-group-text" id="basic-addon1">@</span>
                <input name="email" onChange={handleChange} type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <div className=" me-5 mx-5 input-group mb-3"  style={{width: '70vw'}}>
                <span className="input-group-text" id="basic-addon1">Password</span>
                <input name="password" onChange={handleChange} type="text" className="form-control" placeholder="password" aria-label="password" aria-describedby="basic-addon1"/>
            </div>
            <button onClick={handleSubmit} type="btn" className="btn btn-success">Register</button>
		</div>
       
	);
};
