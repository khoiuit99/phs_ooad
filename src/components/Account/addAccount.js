import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Header from "../Common/Header";
import Menu from "../Common/Menu";

export default function AddAccount() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const [unTounch, setUnTouch] = useState(false);

  const [listTypeAccount, setListTypeAccount] = useState([]);

  const getListTypeAccount = () => {
    axios.get('http://localhost/phs_ttk/api/loaitk')
    .then(response => {
      if(response.status === 200){
        setListTypeAccount(response.data);
      }
    })
    .catch(error=>console.log(error));
  }

  useEffect(() => {
    getListTypeAccount();
  }, []);

  const onSubmit = async (data) => {
    if (window.confirm("Bạn muốn thêm mới tài khoản?")) {
      setUnTouch(true);
      axios
        .post("http://localhost/phs_ttk/api/taikhoan", data)
        .then((response) => {
          if (response.status === 201) {
            window.alert("Thêm tài khoản thành công");
            setUnTouch(false);
            history.goBack();
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return unTounch ? (
    <div className="d-flex align-items-center justify-content-center h-100">
      <div class="spinner-border" role="status"></div>
    </div>
  ) : (
    <div>
      <Header />
      <Menu />
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Thêm tài khoản</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Trang chủ</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/dstaikhoan">Danh sách tài khoản</Link>
                  </li>
                  <li className="breadcrumb-item active">Thêm tài khoản</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card-body">
            <div className="form-group">
              <label>Tên đăng nhập</label>
              <input
                type="text"
                name="TenDangNhap"
                ref={register({ required: true })}
                className="form-control"
                placeholder="Tên đăng nhập"
              />
              {errors.TenDangNhap && "Tên đăng nhập không được để trống"}
            </div>
            <div className="form-group">
              <label>Mật khẩu</label>
              <input
                type="text"
                name="MatKhau"
                className="form-control"
                ref={register({ required: true, minLength: 6 })}
                placeholder="Mật khẩu (hơn 6 kí tự)"
              />
              {errors.MatKhau && "Mật khẩu không được để trống"}
            </div>
            <div className="form-group">
              <label>Tên tài khoản</label>
              <input
                type="text"
                name="TenTaiKhoan"
                className="form-control"
                ref={register({ required: true })}
                placeholder="Tên tài khoản"
              />
              {errors.TenTaiKhoan && "Tên tài khoản không hợp lệ"}
            </div>
            <div className="form-group">
              <label>Giới tính</label>
              <input
                type="text"
                name="GioiTinh"
                className="form-control"
                ref={register({ required: true })}
                placeholder="Giới tính"
              />
              {errors.GioiTinh && "Giới tính không hợp lệ"}
            </div>
            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                type="text"
                name="SoDienThoai"
                className="form-control"
                ref={register({ required: true, maxLength: 10 })}
                placeholder="Số điện thoại"
              />
              {errors.SoDienThoai && "Số điện thoại không hợp lệ"}
            </div>
            <div className="form-group">
              <label>Loại tài khoản</label>
              <select
                class="form-control"
                name="IDLoaiTaiKhoan"
                ref={register({ required: true })}
              >
                {
                  listTypeAccount?.map((itemType) => {
                    return (
                      <option value={itemType.IDLoaiTaiKhoan}>
                        {itemType.TenLoaiTaiKhoan}
                      </option>
                    );
                  })
                }
              </select>
            </div>
            <div className="form-group">
              <label>Trạng thái</label>
              <select
                class="form-control"
                name="TrangThai"
                ref={register({ required: true })}
              >
                <option value="1">1</option>
                <option value="-1">-1</option>
              </select>
            </div>
          </div>
          {/* /.card-body */}
          <div className="card-footer">
            <input type="submit" className="btn btn-primary" value="Xác nhận" />
          </div>
        </form>
      </div>
    </div>
  );
}
