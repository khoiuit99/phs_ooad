import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import Menu from "../Common/Menu";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function AccountInfo() {
  const [role, setRole] = useState("");

  const user = JSON.parse(localStorage.getItem("userLoggedIn"));

  const { register, handleSubmit, errors } = useForm();

  const [listTypeAccount, setListTypeAccount] = useState([]);
  const [unTounch, setUnTouch] = useState(false);
  const [hide, setHide] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();

  const trangthai = [
    {
      value: "1",
      text: "1",
    },
    {
      value: "-1",
      text: "-1",
    },
  ];

  const getListTypeAccount = () => {
    axios
      .get("http://localhost/phs_ttk/api/loaitk")
      .then((response) => {
        if (response.status === 200) {
          setListTypeAccount(response.data);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (user?.IDLoaiTaiKhoan === 1) {
      setRole("Giám đốc");
    } else if (user?.IDLoaiTaiKhoan === 2) {
      setRole("Nhân viên");
    } else if (user?.IDLoaiTaiKhoan === 3) {
      setRole("Quản lý nhân sự");
    } else if (user?.IDLoaiTaiKhoan === 4) {
      setRole("Quản lý kho");
    }

    getListTypeAccount();
  }, []);

  const onSubmit = async (data) => {
    if (window.confirm("Bạn muốn chỉnh sửa thông tin cá nhân?")) {
      setUnTouch(true);
      axios
        .put(`http://localhost/phs_ttk/api/taikhoan/${user?.IDTaiKhoan}`, data)
        .then((response) => {
          if (response.status === 200) {
            // const newData = {
            //   "GioiTinh" : data.GioiTinh,
            //   "IDLoaiTaiKhoan" : data.IDLoaiTaiKhoan,
            //   "IDTaiKhoan" : user?.IDTaiKhoan,
            //   "MatKhau" : user?.MatKhau,
            //   "SoDienThoai" : data.SoDienThoai,
            //   "TenDangNhap" : user?.TenDangNhap,
            //   "TenTaiKhoan" : data.TenTaiKhoan,
            //   "TrangThai" : data.TrangThai,
            //   "created_at" : user?.created_at,
            //   "email_verified_at" : user?.email_verified_at,
            //   "updated_at" : user?.updated_at
            // }
            // localStorage.setItem('userLoggedIn', JSON.stringify(newData))
            window.alert("Chỉnh sửa thành công");
            localStorage.removeItem("userLoggedIn");
            setUnTouch(false);
            history.push("/login");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const onSubmit1 = () => {
    const dataPass = {
      MatKhau: oldPassword,
      MatKhauMoi: newPassword,
    };

    axios
      .post(
        `http://localhost/phs_ttk/api/doimatkhau/${user?.IDTaiKhoan}`,
        dataPass
      )
      .then((response) => {
        if (response.status === 400) {
          window.alert("Thất bại");
        } else if (response.status === 200) {
          window.alert("Đổi mật khẩu thành công");
          localStorage.removeItem("userLoggedIn");
          setUnTouch(false);
          history.push("/login");
        }
      })
      .catch((error) => console.log(error));

    console.log(dataPass);
  };

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  return unTounch ? (
    <div className="d-flex align-items-center justify-content-center h-100">
      <div class="spinner-border" role="status"></div>
    </div>
  ) : (
    <div>
      <Header />
      <Menu />
      <div className="content-wrapper" style={{ minHeight: "1416.81px" }}>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Thông tin cá nhân</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/" href="#">
                      Trang chủ
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Thông tin cá nhân</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4">
                {/* Profile Image */}
                <div className="card card-primary card-outline">
                  <div className="card-body box-profile">
                    <div className="text-center">
                      <img
                        className="profile-user-img img-fluid img-circle"
                        src="../../dist/img/user4-128x128.jpg"
                        alt="User profile picture"
                      />
                    </div>
                    <h3 className="profile-username text-center">
                      {user?.TenTaiKhoan}
                    </h3>
                    <p className="text-muted text-center">{role}</p>
                    <ul className="list-group list-group-unbordered mb-3">
                      <li className="list-group-item">
                        <b>Ngày tạo</b>{" "}
                        <a className="float-right">
                          {formatDate(`${user?.created_at}`)}
                        </a>
                      </li>
                      <li className="list-group-item">
                        <b>Số điện thoại</b>{" "}
                        <a className="float-right">{user?.SoDienThoai}</a>
                      </li>
                    </ul>
                    <button
                      onClick={() => setHide((!hide))}
                      className="btn btn-primary btn-block"
                    >
                      <b>Thao tác</b>
                    </button>
                  </div>
                  {/* /.card-body */}
                </div>
              </div>
              {/* /.col */}
              {hide ? (
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-header p-2">
                      <ul className="nav nav-pills">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            href="#settings"
                            data-toggle="tab"
                          >
                            Thông tin cá nhân
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="#timeline"
                            data-toggle="tab"
                          >
                            Đổi mật khẩu
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                      <div className="tab-content">
                        <div className="tab-pane active" id="settings">
                          <form
                            className="form-horizontal"
                            onSubmit={handleSubmit(onSubmit)}
                          >
                            <div className="form-group row">
                              <label
                                htmlFor="inputName"
                                className="col-sm-3 col-form-label"
                              >
                                Tên tài khoản:
                              </label>
                              <div className="col-sm-9">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="inputName"
                                  name="TenTaiKhoan"
                                  placeholder="Tên tài khoản"
                                  defaultValue={user?.TenTaiKhoan}
                                  ref={register({ maxLength: 30 })}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label
                                htmlFor="inputPhone"
                                className="col-sm-3 col-form-label"
                              >
                                Số điện thoại:
                              </label>
                              <div className="col-sm-9">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="inputPhone"
                                  name="SoDienThoai"
                                  placeholder="number"
                                  defaultValue={user?.SoDienThoai}
                                  ref={register({ maxLength: 10 })}
                                />
                              </div>
                              {errors.SoDienThoai &&
                                "Số điện thoại không vượt quá 10 kí tự"}
                            </div>
                            <div className="form-group row">
                              <label
                                htmlFor="inputGioiTinh"
                                className="col-sm-3 col-form-label"
                              >
                                Giới tính:
                              </label>
                              <div className="col-sm-9">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="inputGioiTinh"
                                  name="GioiTinh"
                                  placeholder="Giới Tính"
                                  defaultValue={user?.GioiTinh}
                                  ref={register({ maxLength: 10 })}
                                />
                              </div>
                              {errors.GioiTinh && "Giới tính"}
                            </div>
                            <div className="form-group row">
                              <label
                                htmlFor="inputName2"
                                className="col-sm-3 col-form-label"
                              >
                                Loại tại khoản:
                              </label>
                              <div className="col-sm-9">
                                <select
                                  class="form-control"
                                  name="IDLoaiTaiKhoan"
                                  ref={register({ required: true })}
                                >
                                  {listTypeAccount && user ? (
                                    listTypeAccount.map((itemType) => {
                                      var selected =
                                        itemType.IDLoaiTaiKhoan ===
                                        user.IDLoaiTaiKhoan
                                          ? true
                                          : false;
                                      return (
                                        <option
                                          value={itemType.IDLoaiTaiKhoan}
                                          selected={selected}
                                        >
                                          {itemType.TenLoaiTaiKhoan}
                                        </option>
                                      );
                                    })
                                  ) : (
                                    <option>Loading</option>
                                  )}
                                </select>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label
                                htmlFor="inputName2"
                                className="col-sm-3 col-form-label"
                              >
                                Trạng thái
                              </label>
                              <div className="col-sm-9">
                                <select
                                  class="form-control"
                                  name="TrangThai"
                                  ref={register({ required: true })}
                                >
                                  {user ? (
                                    trangthai.map((itemTrangThai) => {
                                      var selected =
                                        itemTrangThai.value === user.TrangThai
                                          ? true
                                          : false;
                                      return (
                                        <option
                                          value={itemTrangThai.value}
                                          selected={selected}
                                        >
                                          {itemTrangThai.text}
                                        </option>
                                      );
                                    })
                                  ) : (
                                    <option>Loading</option>
                                  )}
                                </select>
                              </div>
                            </div>
                            <div className="card-footer">
                              <input
                                type="submit"
                                className="btn btn-primary"
                                value="Xác nhận"
                              />
                            </div>
                          </form>
                        </div>
                        <div className="tab-pane" id="timeline">
                          <form
                            className="form-horizontal"
                            onSubmit={handleSubmit(onSubmit1)}
                          >
                            <div className="form-group row">
                              <label
                                htmlFor="inputOld"
                                className="col-sm-4 col-form-label"
                              >
                                Mật khẩu cũ:
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="password"
                                  className="form-control"
                                  id="inputOld"
                                  name="MatKhauCu"
                                  placeholder="Mật khẩu cũ"
                                  onChange={(e) =>
                                    setOldPassword(e.target.value)
                                  }
                                  ref={register({
                                    maxLength: 30,
                                    minLength: 6,
                                  })}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label
                                htmlFor="inputNew"
                                className="col-sm-4 col-form-label"
                              >
                                Mật khẩu mới:
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="password"
                                  className="form-control"
                                  id="inputNew"
                                  name="MatKhauMoi"
                                  placeholder="Mật khẩu mới"
                                  onChange={(e) =>
                                    setNewPassword(e.target.value)
                                  }
                                  ref={register({
                                    maxLength: 30,
                                    minLength: 6,
                                  })}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label
                                htmlFor="inputConfirm"
                                className="col-sm-4 col-form-label"
                              >
                                Xác nhận Mật khẩu mới:
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="password"
                                  className="form-control"
                                  id="inputConfirm"
                                  name="XacNhanMatKhauMoi"
                                  placeholder="Xác nhận mật khẩu mới"
                                  onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                  }
                                  ref={register({
                                    maxLength: 30,
                                    minLength: 6,
                                  })}
                                />
                                {newPassword !== confirmPassword ? (
                                  <p>Wrong new password</p>
                                ) : (
                                  <p></p>
                                )}
                              </div>
                            </div>
                            <div className="card-footer">
                              <input
                                type="submit"
                                onClick={() => onSubmit1()}
                                className="btn btn-primary"
                                value="Xác nhận"
                              />
                            </div>
                          </form>
                        </div>
                        {/* /.tab-pane */}
                      </div>
                      {/* /.tab-content */}
                    </div>
                    {/* /.card-body */}
                  </div>
                  {/* /.nav-tabs-custom */}
                </div>
              ) : null}
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    </div>
  );
}
