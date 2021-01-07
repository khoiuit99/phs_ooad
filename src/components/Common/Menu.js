import React from "react";
import { Link, Redirect } from "react-router-dom";

export default function Menu() {

  var userInfo = JSON.parse(localStorage.getItem("userLoggedIn"));
  if(!userInfo){
    return <Redirect to="/login" />
  }

  if (userInfo.IDLoaiTaiKhoan === 1) {
    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <Link to="/" className="brand-link">
          <img
            src="dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">Phát hành sách</span>
        </Link>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image"></div>
            <div className="info row">
              <Link to="/userinfo" className="d-block">
                <span>Tên tài khoản:</span>&nbsp; {userInfo?.TenTaiKhoan}
              </Link>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>Trang chủ</p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/dssach" className="nav-link">
                  <i className="fas fa-book nav-icon" />
                  <p>Danh sách sách</p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/dstheloai" className="nav-link">
                  <i className="fab fa-delicious nav-icon" />
                  <p>Quản lý thể loại</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/qlynhapsach" className="nav-link">
                  <i class="nav-icon fas fa-caret-square-right"></i>
                  <p>Quản lý nhập sách</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/qlyxuatsach" className="nav-link">
                  <i class="nav-icon fas fa-caret-square-left"></i>
                  <p>Quản lý xuất sách</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/dskhachhang" className="nav-link">
                  <i class="nav-icon fas fa-users"></i>
                  <p>Quản lý khách hàng</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/dstaikhoan" className="nav-link">
                  <i class="nav-icon fas fa-user-shield"></i>
                  <p>Quản lý tài khoản</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  <i className="nav-icon fas fa-id-card"></i>
                  <p>Thông tin liên hệ</p>
                </Link>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    );
  } else if (userInfo.IDLoaiTaiKhoan === 3) {
    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="index3.html" className="brand-link">
          <img
            src="dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">Phát hành sách</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image"></div>
            <div className="info row">
              <Link to="/userinfo" className="d-block">
                <span>Tên tài khoản:</span>&nbsp; {userInfo?.TenTaiKhoan}
              </Link>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>Trang chủ</p>
                </Link>
              </li>
              {/* <li class="nav-item">
                <Link to="/dssach" className="nav-link">
                  <i className="fas fa-book nav-icon" />
                  <p>Danh sách sách</p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/dstheloai" className="nav-link">
                  <i className="fab fa-delicious nav-icon" />
                  <p>Quản lý thể loại</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/qlynhapsach" className="nav-link">
                  <i class="nav-icon fas fa-caret-square-right"></i>
                  <p>Quản lý nhập sách</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/qlyxuatsach" className="nav-link">
                  <i class="nav-icon fas fa-caret-square-left"></i>
                  <p>Quản lý xuất sách</p>
                </Link>
              </li> */}
              <li className="nav-item">
                <Link to="/dskhachhang" className="nav-link">
                  <i class="nav-icon fas fa-users"></i>
                  <p>Quản lý khách hàng</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/dstaikhoan" className="nav-link">
                  <i class="nav-icon fas fa-user-shield"></i>
                  <p>Quản lý tài khoản</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  <i className="nav-icon fas fa-id-card"></i>
                  <p>Thông tin liên hệ</p>
                </Link>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    );
  } else if (userInfo.IDLoaiTaiKhoan === 2) {
    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="index3.html" className="brand-link">
          <img
            src="dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">Phát hành sách</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image"></div>
            <div className="info row">
              <Link to="/userinfo" className="d-block">
                <span>Tên tài khoản:</span>&nbsp; {userInfo?.TenTaiKhoan}
              </Link>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>Trang chủ</p>
                </Link>
              </li>
              {/* <li class="nav-item">
                <Link to="/dssach" className="nav-link">
                  <i className="fas fa-book nav-icon" />
                  <p>Danh sách sách</p>
                </Link>
              </li> */}
              {/* <li class="nav-item">
                <Link to="/dstheloai" className="nav-link">
                  <i className="fab fa-delicious nav-icon" />
                  <p>Quản lý thể loại</p>
                </Link>
              </li> */}
              <li className="nav-item">
                <Link to="/qlynhapsach" className="nav-link">
                  <i class="nav-icon fas fa-caret-square-right"></i>
                  <p>Quản lý nhập sách</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/qlyxuatsach" className="nav-link">
                  <i class="nav-icon fas fa-caret-square-left"></i>
                  <p>Quản lý xuất sách</p>
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to="/dskhachhang" className="nav-link">
                  <i class="nav-icon fas fa-users"></i>
                  <p>Quản lý khách hàng</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/dstaikhoan" className="nav-link">
                  <i class="nav-icon fas fa-user-shield"></i>
                  <p>Quản lý tài khoản</p>
                </Link>
              </li> */}
              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  <i className="nav-icon fas fa-id-card"></i>
                  <p>Thông tin liên hệ</p>
                </Link>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    );
  }else if (userInfo.IDLoaiTaiKhoan === 4) {
    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="index3.html" className="brand-link">
          <img
            src="dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">Phát hành sách</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image"></div>
            <div className="info row">
              <Link to="/userinfo" className="d-block">
                <span>Tên tài khoản:</span>&nbsp; {userInfo?.TenTaiKhoan}
              </Link>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>Trang chủ</p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/dssach" className="nav-link">
                  <i className="fas fa-book nav-icon" />
                  <p>Danh sách sách</p>
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/dstheloai" className="nav-link">
                  <i className="fab fa-delicious nav-icon" />
                  <p>Quản lý thể loại</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/qlynhapsach" className="nav-link">
                  <i class="nav-icon fas fa-caret-square-right"></i>
                  <p>Quản lý nhập sách</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/qlyxuatsach" className="nav-link">
                  <i class="nav-icon fas fa-caret-square-left"></i>
                  <p>Quản lý xuất sách</p>
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to="/dskhachhang" className="nav-link">
                  <i class="nav-icon fas fa-users"></i>
                  <p>Quản lý khách hàng</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/dstaikhoan" className="nav-link">
                  <i class="nav-icon fas fa-user-shield"></i>
                  <p>Quản lý tài khoản</p>
                </Link>
              </li> */}
              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  <i className="nav-icon fas fa-id-card"></i>
                  <p>Thông tin liên hệ</p>
                </Link>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    );
  }
}
