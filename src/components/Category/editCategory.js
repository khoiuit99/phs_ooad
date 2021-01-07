import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../Common/Header";
import Menu from "../Common/Menu";

export default function EditCategory() {
  const { register, handleSubmit, errors, getValues } = useForm();
  const [categoryInfoEdit, setCategoryInfoEdit] = useState();

  const history = useHistory();

  const [unTounch, setUnTouch] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost/phs_ttk/api/theloai/${id}`)
      .then((response) => {
        setCategoryInfoEdit(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onSubmit = async (data) => {
    if (window.confirm("Bạn muốn sửa thông tin thể loại?")) {
      setUnTouch(true);
      axios
        .put(`http://localhost/phs_ttk/api/theloai/${id}`, data)
        .then((response) => {
          if (response.status) {
            window.alert("Sửa thành công");
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
                <h1>Chỉnh sửa thông tin thể loại</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Trang chủ</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/dstheloai">Danh sách thể loại</Link>
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
              <label>Tên thể loại</label>
              <input
                type="text"
                name="TenTheLoai"
                defaultValue={
                  categoryInfoEdit ? categoryInfoEdit[0].TenTheLoai : null
                }
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
                defaultValue={
                  categoryInfoEdit ? categoryInfoEdit[0].MoTa : null
                }
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
