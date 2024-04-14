import React, { useState, useEffect } from "react";
import EmployerService from "../services/EmployerService";
import jobPostingsService from "../services/jobPostingsService";
import AssetPostingsService from "../services/AssetPostingsService";
import EventService from "../services/EventServices";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import apiList from "../lib/apiList";
import "../App.css"; // Import the new CSS styles
import { useNavigate } from "react-router-dom";

function EmployerProfile() {
	const [employer, setEmployer] = useState({
		company: "",
		email: "",
		password: "",
		description: "",
		category: "",
		website: "",
		phone: "",
		location: "",
		reviews: [
			{
				rating: 0,
				review: "",
			},
		],
		jobs: [],
		assets: [],
		events: [],
	});

	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchEmployer = async () => {
			try {
				const data = await EmployerService.getEmployer(id);
				setEmployer(data); // Assuming data is the job seeker's information
			} catch (error) {
				console.error("Failed to fetch employer:", error);
				// Handle error (e.g., show an error message)
			}
		};

		if (id) {
			fetchEmployer();
		}

		const getData = () => {
			axios
				.get(apiList.user, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				})
				.then((response) => {
					navigate(`/employer/${response.data._id}`);
				})
				.catch((err) => {
					console.log(err.response?.data);
				});
		};

		getData()

	}, [id]);

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
		try {
			EmployerService.updateEmployer(employer._id, employer)
				.then(() => {
					toast.success("Successfully updated data!");
				})
				.catch(error => {
					toast.error("Failed to update data.");
				});
		} catch (error) {
			console.error("Failed to update job seeker:", error);
		}
	}

	async function deleteAccount(id) {
		employer.jobs.forEach(async jobId => {
			await jobPostingsService.deleteJobPosting(jobId)
				.then(() => {
					console.log("Job deleted successfully!");
				})
				.catch((error) => {
					console.error("Failed to delete job.");
				});
		});
		employer.assets.forEach(async assetId => {
			await AssetPostingsService.deleteAssetPosting(assetId)
				.then(() => {
					console.log("Asset deleted successfully!");
				})
				.catch((error) => {
					console.error("Failed to delete asset.");
				});
		});
		employer.events.forEach(async eventId => {
			await EventService.deleteEvent(eventId)
				.then(() => {
					console.log("Event deleted successfully!");
				})
				.catch((error) => {
					console.error("Failed to delete event.");
				});
		});
		await EmployerService.deleteEmployer(id)
			.then(() => {
				toast.success("Account deleted successfully!");
				localStorage.removeItem("token");
				navigate("/logout");
			})
			.catch((error) => {
				toast.error("Failed to delete account.");
			});
	}

	const logout = () => {
		navigate("/logout");
	};

	return (
		<div className="container rounded bg-white py-4 mt-5 mb-5 border border-1">
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
			<div className="row">
				<div className="col-md-2 border-right">
					<div className="d-flex flex-column align-items-center text-center p-3 py-3">
						<img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="profile pic" />
						<span className="font-weight-bold">{employer.company}</span>
						<span className="text-black-50">{employer.email}</span>
						<div className="text-center">
							<button className="btn btn-primary profile-button mt-4" form="save" type="submit">Save Profile</button>
						</div>
						<div className="text-center">
							<button className="btn btn-danger profile-button"
								data-bs-toggle="modal"
								data-bs-target={`#deleteModal${id}`}
							>
								Delete Account
							</button>
						</div>
						<div className="text-center mt-4">
							<button className="btn btn-danger" onClick={logout}>Logout</button>
						</div>
						{/* Modal for delete */}
						<div className="modal fade" id={`deleteModal${id}`} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
							<div className="modal-dialog">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="deleteModalLabel">Delete Account</h5>
										<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
									</div>
									<div className="modal-body">
										Are you sure you want to delete this account? This action cannot be undone.
									</div>
									<div className="modal-footer">
										<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
										<button
											type="button"
											className="btn btn-danger"
											onClick={() => deleteAccount(id)}
											data-bs-dismiss="modal"
										>
											Delete Account
										</button>
									</div>

								</div>
							</div>
						</div>

					</div>
				</div>

				<form onSubmit={handleSubmit} id="save" className="row col-md-10 border-right">
					<div className="col-md-12">
						<div className="p-3 py-3">
							<div className="d-flex justify-content-between align-items-center mb-3">
								<h4 className="text-right">Profile Settings</h4>
							</div>
							<div className="row mt-2">
								<div className="col-md-6">
									<label className="labels">Company</label>
									<input type="text" className="form-control" placeholder="Company" onChange={handleChange} name="company" value={employer.company} />
								</div>
								<div className="col-md-6">
									<label className="labels">Email</label>
									<input type="email" className="form-control" placeholder="Email" onChange={handleChange} name="email" value={employer.email} />
								</div>
							</div>
							<div className="row mt-3">
								<div className="col-md-12">
									<label className="labels">Password</label>
									<input type="password" className="form-control" placeholder="Password" onChange={handleChange} name="password" value={employer.password} />
								</div>
								<div className="col-md-12">
									<label className="labels">Phone Number</label>
									<input type="tel" placeholder="Phone" onChange={handleChange} name="phone" value={employer.phone} className="form-control" />
								</div>
								<div className="col-md-12">
									<label className="labels">Description</label>
									<input type="text" placeholder="Description" onChange={handleChange} name="description" value={employer.description} className="form-control" />
								</div>
								<div className="col-md-12">
									<label className="labels">Location</label>
									<input type="text" placeholder="Location" onChange={handleChange} name="location" value={employer.location} className="form-control" />
								</div>
								<div className="col-md-12">
									<label className="labels">Category</label>
									<input type="text" placeholder="Category" onChange={handleChange} name="category" value={employer.category} className="form-control" />
								</div>
								<div className="col-md-12">
									<label className="labels">Website</label>
									<input type="text" placeholder="Website" onChange={handleChange} name="website" value={employer.website} className="form-control" />
								</div>
							</div>
						</div>
					</div>
				</form>

			</div >
		</div >
	);
}

export default EmployerProfile;
