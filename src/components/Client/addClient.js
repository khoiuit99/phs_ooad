import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Header from "../Common/Header";
import Menu from "../Common/Menu";

export default function AddClient() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const [unTounch, setUnTouch] = useState(false);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const [listTypeClient, setListTypeClient] = useState([]);

  const getListTypeAccount = () => {
    axios
      .get("http://localhost/phs_ttk/api/loaikh")
      .then((response) => {
        if (response.status === 200) {
          setListTypeClient(response.data);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getListTypeAccount();
  }, []);

  const onSubmit = async (data) => {
    if (window.confirm("Bạn muốn thêm khách hàng?")) {
      axios
        .post("http://localhost/phs_ttk/api/khachhang", data)
        .then((response) => {
          if (response.status === 201) {
            window.alert("Thêm thành công");
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
                <h1>Thêm khách hàng</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Trang chủ</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/dskhachhang">Danh sách khách hàng</Link>
                  </li>
                  <li className="breadcrumb-item active">Thêm khách hàng</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card-body">
            <div className="form-group">
              <label>Tên khách hàng</label>
              <input
                type="text"
                name="TenKhachHang"
                ref={register({ required: true })}
                className="form-control"
                placeholder="Tên khách hàng"
              />
              {errors.TenKhachHang && "Tên khách hàng không được để trống"}
            </div>
            <div className="form-group">
              <label>Địa chỉ</label>
              <input
                type="text"
                name="DiaChi"
                className="form-control"
                ref={register({ required: true })}
                placeholder="Địa chỉ"
              />
              {errors.DiaChi && "Tác giả không được để trống"}
            </div>
            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                type="number"
                name="SoDienThoai"
                className="form-control"
                ref={register({ required: true, maxLength: 10 })}
                placeholder="Số điện thoại"
              />
              {errors.SoDienThoai && "Số điện thoại không hợp lệ"}
            </div>
            <div className="form-group">
              <label>Loại khách hàng</label>
              <select
                class="form-control"
                name="IDLoaiKhachHang"
                ref={register({ required: true })}
              >
                {listTypeClient?.map((itemType) => {
                  return (
                    <option value={itemType.IDLoaiKhachHang}>
                      {itemType.TenLoaiKhachHang}
                    </option>
                  );
                })}
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
