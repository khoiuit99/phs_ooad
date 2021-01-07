import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function LogIn() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const onSubmit = async (data) => {
    setLoading(true);
    axios
      .post("http://localhost/phs_ttk/api/login", data)
      .then(async (response) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem("userLoggedIn", JSON.stringify(response.data));
          await delay(2000);
          history.push("/");
        } else {
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          <Link to="/login">
            <b>Phát hành sách</b> TTK
          </Link>
        </div>
        {/* /.login-logo */}
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Đăng nhập</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tài khoản"
                  name="TenDangNhap"
                  ref={register({ required: true })}
                />
                {errors.TenDangNhap && "Tài khoản không được để trống"}
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Mật khẩu"
                  name="MatKhau"
                  ref={register({ required: true })}
                />
                {errors.MatKhau && "Mật khẩu không được để trống"}
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                {/* /.col */}
                <div className="col-12">
                  {loading ? (
                    <div className="d-flex justify-content-center">
                      <div className="spinner-border" role="status"></div>
                    </div>
                  ) : (
                    <Link
                      type="submit"
                      className="btn btn-danger btn-block"
                      onClick={handleSubmit(onSubmit)}
                    >
                      Đăng nhập
                    </Link>
                  )}
                </div>
                {/* /.col */}
              </div>
            </form>
          </div>
          {/* /.login-card-body */}
        </div>
      </div>
    </div>
  );
}
