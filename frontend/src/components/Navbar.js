import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileIcon from '../images/profile4.svg';
import BellIcon from '../images/bell.svg';
import jobSeekersService from "../services/jobSeekersService";
import { formatDistanceToNow } from 'date-fns';
import '../job-connect.css';

const Navbar = () => {
    const [type, setType] = useState("");
    const [id, setId] = useState("");
    const [notifications, setNotifications] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchAndSetUser = async () => {
            try {
                const user = await jobSeekersService.fetchCurrentUser();
                setId(user._id);
                setType(localStorage.getItem("type"));
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchAndSetUser();
    }, []);

    useEffect(() => {
        const fetchNotifications = async () => {
            if (id) {
                try {
                    const jobSeekerNotifications = await jobSeekersService.getJobSeekerNotifications(id);
                    setNotifications(jobSeekerNotifications);
                } catch (error) {
                    console.log('Failed to fetch notifications:', error);
                }
            }
        };

        fetchNotifications();
    }, [id]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    // .
    const handleRead = (index) => {
        const updatedNotifications = notifications.map((notification, i) => {
            if (i === index) {
                return { ...notification, isRead: true };
            }
            return notification;
        });
        const updatedNoti = updatedNotifications;
        jobSeekersService.updateJobSeeker(id, { notifications: updatedNoti })
        setNotifications(updatedNoti);
    };

    const handleClearAll = () => {
        const allReadNotifications = notifications.map(notification => ({ ...notification, isRead: true }));
        setNotifications(allReadNotifications);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 fixed-top">
                <div className="container">
                    <Link to="/" className="navbar-brand">JobConnect</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navmenu">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                            {type && <li className="nav-item"><Link to="/jobs" className="nav-link">Jobs</Link></li>}
                            {type && <li className="nav-item"><Link to="/assets" className="nav-link">Assets</Link></li>}
                            {type && <li className="nav-item"><Link to="/events" className="nav-link">Events</Link></li>}
                            {type === "applicant" && <li className="nav-item"><Link to={`/applicant-dashboard/${id}`} className="nav-link">Dashboard</Link></li>}
                            {type === "employer" && <>
                                <li className="nav-item"><Link to={`/employer-dashboard/${id}`} className="nav-link">Dashboard</Link></li>
                                <li className="nav-item"><Link to={`/manage-postings/${id}`} className="nav-link">Manage Postings</Link></li>
                            </>}
                            <li className="nav-item"><a href="/#questions" className="nav-link">FAQ</a></li>
                            {!type && <li className="nav-item"><Link to="/register" className="nav-link">Sign Up</Link></li>}
                            {!type && <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>}
                            <li className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" onClick={toggleDropdown} role="button" aria-expanded={dropdownOpen}>
                                    <img src={BellIcon} alt="Notifications" className="icon-custom-size" />
                                    {notifications.filter(notif => !notif.isRead).length > 0 && (
                                        <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                                            <span className="visually-hidden">New alerts</span>
                                        </span>
                                    )}
                                </a>
                                <div className={`dropdown-menu${dropdownOpen ? " show" : ""}`} aria-labelledby="navbarDropdownMenuLink">
                                    {notifications.length === 0 ? (
                                        <div className="dropdown-item text-center">There are no notifications.</div>
                                    ) : (
                                        notifications.map((notification, index) => (
                                            !notification.isRead && (
                                                <div key={index} className="dropdown-item d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <div>{notification.message}</div>
                                                        <div className="text-muted small">{formatDistanceToNow(new Date(notification.date), { addSuffix: true })}</div>
                                                    </div>
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value=""
                                                            id={`flexCheckDefault-${index}`}
                                                            onChange={() => handleRead(index)}
                                                        />
                                                        <label className="form-check-label" htmlFor={`flexCheckDefault-${index}`}>
                                                            Dismiss
                                                        </label>
                                                    </div>
                                                </div>
                                            )
                                        ))
                                    )}
                                    <div className="dropdown-divider"></div>
                                    <div className="d-flex justify-content-around p-2">
                                        <Link className="btn btn-outline-secondary" to={`/user/${id}`}>View all</Link>
                                        <button className="btn btn-outline-danger" onClick={handleClearAll}>Clear All</button>
                                    </div>
                                </div>
                            </li>
                            {type && <li className="nav-item">
                                <Link to={type === "employer" ? `/employer/${id}` : `/user/${id}`} className="nav-link">
                                    <img src={ProfileIcon} alt="Profile" className="icon-custom-size" />
                                </Link>
                            </li>}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
