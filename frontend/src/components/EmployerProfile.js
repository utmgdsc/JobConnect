import React, { useState, useEffect } from "react";
import EmployerService from "../services/EmployerService";
import { useParams } from "react-router-dom";
import "../App.css"; // Import the new CSS styles

function EmployerProfile() {
	const [employer, setEmployer] = useState({
		company: "",
		email: "",
		password: "",
		description: "",
		category: "",
		website: "",
		phone: "",
		reviews: [],
	});

	const [updateStatus, setUpdateStatus] = useState("");
	const { id } = useParams();

	const fetchEmployer = async () => {
		try {
			const data = await EmployerService.getEmployer(id);
			console.log(data);
			setEmployer(data); // Assuming data is the job seeker's information
		} catch (error) {
			console.error("Failed to fetch employer:", error);
			// Handle error (e.g., show an error message)
		}
	};

	useEffect(() => {
		if (id) {
			fetchEmployer();
		}
	}, [id, fetchEmployer]);

	function handleChange(event) {
		const { name, value, type, checked } = event.target;
		setEmployer((prevemployer) => {
			return {
				...prevemployer,
				[name]: type === "checkbox" ? checked : value,
			};
		});
	}

	async function handleSubmit(event) {
		event.preventDefault();
		// submitToApi(employer)
		console.log(employer);
		try {
			const data = await EmployerService.updateEmployer(employer._id, employer);
			console.log(data);
			setUpdateStatus("Successfully updated data");
		} catch (error) {
			console.error("Failed to update employer:", error);
			setUpdateStatus("Failed to update data");
		}
	}

	return (
		<header className="App-header">
			<div className="dashboard">
				<button onClick={fetchEmployer}>Get Employer</button>
				{employer && (
					<div>
						<div className="section"></div>
						<h3>Personal Details</h3>
						<form onSubmit={handleSubmit}>
							<input
								type="text"
								placeholder="Company"
								onChange={handleChange}
								name="company"
								value={employer.company}
							/>
							<input
								type="text"
								placeholder="Description"
								onChange={handleChange}
								name="description"
								value={employer.description}
							/>
							<input
								type="text"
								placeholder="Category"
								onChange={handleChange}
								name="category"
								value={employer.category}
							/>

							<div className="section">
								<h3>Contact Details</h3>
								<input
									type="email"
									placeholder="Email"
									onChange={handleChange}
									name="email"
									value={employer.email}
								/>
								<input
									type="text"
									placeholder="Website"
									onChange={handleChange}
									name="website"
									value={employer.website}
								/>
								<input
									type="tel"
									placeholder="Phone"
									onChange={handleChange}
									name="phone"
									value={employer.phone}
								/>
							</div>
							<button>Update</button>
						</form>

						{updateStatus && (
							<div
								style={{
									color: updateStatus.startsWith("Successfully")
										? "green"
										: "red",
								}}
							>
								{updateStatus}
							</div>
						)}
					</div>
				)}
			</div>
		</header>
	);
}

export default EmployerProfile;
