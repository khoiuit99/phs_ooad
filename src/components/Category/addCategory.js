import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Header from "../Common/Header";
import Menu from "../Common/Menu";

export default function AddCategory() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const [unTounch, setUnTouch] = useState(false);

  const onSubmit = async (data) => {
    setUnTouch(true);
    if (window.confirm("Bạn có muốn thêm thể loại")) {
      axios
        .post("http://localhost/phs_ttk/api/theloai", data)
        .then((response) => {
          if (response.status === 200) {
            window.alert("Thêm thể loại thành công");
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
                <h1>Thêm thể loại</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Trang chủ</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/dstheloai">Danh sách thể loại</Link>
                  </li>
                  <li className="breadcrumb-item active">Thêm thể loại</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card-body">
            <div className="form-group">
              <label>Tên thể loại</label>
              <input
                type="text"
                name="TenTheLoai"
                ref={register({ required: true })}
                className="form-control"
                placeholder="Tên thể loại"
              />
              {errors.TenTheLoai && "Tên thể loại không được để trống"}
            </div>
            <div className="form-group">
              <label>Mô tả</label>
              <input
                type="text"
                name="MoTa"
                className="form-control"
                ref={register({ required: true })}
                placeholder="Mô tả"
              />
              {errors.MoTa && "Mô tả không được để trống"}
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
