import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../Common/Header";
import Menu from "../Common/Menu";

export default function EditClient() {
  const { register, handleSubmit, errors } = useForm();
  const [clientInfoEdit, setClientInfoEdit] = useState();
  const [unTounch, setUnTouch] = useState(false);
  const [listTypeClient, setListTypeClient] = useState([]);

  const history = useHistory();

  // const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  let { id } = useParams();

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

  useEffect(() => {
    axios
      .get(`http://localhost/phs_ttk/api/khachhang/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setClientInfoEdit(response.data);
        }
      })
      .catch((error) => console.log(error));

    axios
      .get("http://localhost/phs_ttk/api/loaikh")
      .then((response) => {
        if (response.status === 200) {
          setListTypeClient(response.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const onSubmit = async (data) => {
    if (window.confirm("Bạn muốn sửa thông tin khách hàng?")) {
      setUnTouch(true);
      axios
        .put(`http://localhost/phs_ttk/api/khachhang/${id}`, data)
        .then((response) => {
          if (response.status === 200) {
            window.alert("Sửa thành công");
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
                <h1>Chỉnh sửa thông tin khách hàng</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Trang chủ</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/dskhachhang">Danh sách khách hàng</Link>
                  </li>
                  <li className="breadcrumb-item active">Chỉnh sửa</li>
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
                defaultValue={clientInfoEdit?.TenKhachHang}
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
                defaultValue={clientInfoEdit?.DiaChi}
                className="form-control"
                ref={register({ required: true })}
                placeholder="Địa chỉ"
              />
              {errors.TacGia && "Địa chỉ không được để trống"}
            </div>
            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                type="text"
                name="SoDienThoai"
                defaultValue={clientInfoEdit?.SoDienThoai}
                className="form-control"
                ref={register({ required: true, maxLength: 10 })}
                placeholder="Số điện thoại"
              />
              {errors.SoDienThoai && "Nhà xuất bản không hợp lệ"}
            </div>
            <div className="form-group">
              <label>Loại khách hàng</label>
              <select
                class="form-control"
                name="IDLoaiKhachHang"
                ref={register({ required: true })}
              >
                {listTypeClient.map((itemType) => {
                  var selected =
                    itemType.IDLoaiKhachHang === clientInfoEdit?.IDLoaiKhachHang
                      ? true
                      : false;
                  return (
                    <option
                      value={itemType.IDLoaiKhachHang}
                      selected={selected}
                    >
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
                {trangthai.map((itemTrangThai) => {
                  var selected =
                    itemTrangThai.value === clientInfoEdit?.TrangThai
                      ? true
                      : false;
                  return (
                    <option value={itemTrangThai.value} selected={selected}>
                      {itemTrangThai.text}
                    </option>
                  );
                })}
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
