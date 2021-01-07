import React from "react";
import { Link, useHistory } from "react-router-dom";

export default function Header() {

  const history = useHistory();

  const SignOut = () => {
    localStorage.removeItem('userLoggedIn');

    history.push('/login');
  }


  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link
            to="/"
            className="nav-link"
            data-widget="pushmenu"
            role="button"
          >
            <i className="fas fa-bars" />
          </Link>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/" className="nav-link">
            Trang chủ
          </Link>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/contact" className="nav-link">
            Thông tin liên hệ
          </Link>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown">
            <i className="far fa-user" />
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <Link to="/userinfo" className="dropdown-item">
              <div className="media">
                <div className="media-body">
                  <h3 className="dropdown-item-title">
                    Thông tin cá nhân
                    <span className="float-right text-sm text-danger">
                      <i className="fas fa-key" />
                    </span>
                  </h3>
                </div>
              </div>
            </Link>
            <div className="dropdown-divider" />
            <button onClick={() => SignOut()} className="dropdown-item">
              <div className="media">
                <div className="media-body">
                  <h3 className="dropdown-item-title">
                    Đăng xuất
                    <span className="float-right text-sm text-warning">
                      <i className="fas fa-sign-out-alt" />
                    </span>
                  </h3>
                </div>
              </div>
            </button>
          </div>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <i className="far fa-bell" />
            <span className="badge badge-warning navbar-badge">15</span>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span className="dropdown-item dropdown-header">
              15 Notifications
            </span>
            <div className="dropdown-divider" />
            {/* <a href="#" className="dropdown-item">
              <i className="fas fa-envelope mr-2" /> 4 new messages
              <span className="float-right text-muted text-sm">3 mins</span>
            </a> */}
          </div>
        </li>
      </ul>
    </nav>
  );
}
