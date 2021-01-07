import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Header from "../Common/Header";
import Menu from "../Common/Menu";

export default function AddBook() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const [listCategory, setListCategory] = useState([]);
  const [unTounch, setUnTouch] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost/phs_ttk/api/theloai")
      .then((response) => {
        if(response.status === 200){
          setListCategory(response.data)
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const onSubmit = async (data) => {
    if (window.confirm("Bạn muốn thêm mới sách?")) {
      setUnTouch(true);
      axios
        .post("http://localhost/phs_ttk/api/sach", data)
        .then((response) => {
          if (response.status === 201) {
            window.alert("Thêm sách thành công");
            setUnTouch(false);
            history.goBack();
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return unTounch ? (
    <div className="d-flex align-items-center justify-content-center h-100">
      <div class="spinner-border" role="status">
      </div>
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
                <h1>Thêm sách</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Trang chủ</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/dssach">Danh sách sách</Link>
                  </li>
                  <li className="breadcrumb-item active">Thêm sách</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card-body">
            <div className="form-group">
              <label>Tên sách</label>
              <input
                type="text"
                name="TenSach"
                ref={register({ required: true })}
                className="form-control"
                placeholder="Tên sách"
              />
              {errors.TenSach && "Tên sách không được để trống"}
            </div>
            <div className="form-group">
              <label>Tác Giả</label>
              <input
                type="text"
                name="TacGia"
                className="form-control"
                ref={register({ required: true })}
                placeholder="Tác Giả"
              />
              {errors.TacGia && "Tác giả không được để trống"}
            </div>
            <div className="form-group">
              <label>Nhà xuất bản</label>
              <input
                type="text"
                name="NhaXuatBan"
                className="form-control"
                ref={register({ required: true })}
                placeholder="Nhà xuất bản"
              />
              {errors.NhaXuatBan && "Nhà xuất bản không được để trống"}
            </div>
            <div className="form-group">
              <label>Năm xuất bản</label>
              <input
                type="number"
                name="NamXuatBan"
                className="form-control"
                ref={register({ required: true })}
                placeholder="Năm xuất bản"
              />
              {errors.NamXuatBan && "Năm xuất bản không được để trống"}
            </div>
            <div className="form-group">
              <label>Thể loại</label>
              <select
                class="form-control"
                name="IDTheLoai"
                ref={register({ required: true })}
              >
                {listCategory ? (
                  listCategory.map((itemCategory) => {
                    return (
                      <option value={itemCategory.IDTheLoai}>
                        {itemCategory.TenTheLoai}
                      </option>
                    );
                  })
                ) : (
                  <option>Loading</option>
                )}
              </select>
            </div>
            <div className="form-group">
              <label>Tóm tắt</label>
              <textarea
                type="text"
                rows="5"
                name="TomTat"
                className="form-control"
                ref={register({ required: true })}
                placeholder="Tóm tắt"
              />
              {errors.TomTat && "Tóm tắt không được để trống"}
            </div>
            <div className="form-group">
              <label>Hình ảnh</label>
              <input
                type="text"
                name="HinhAnh"
                className="form-control"
                ref={register({ required: true })}
                placeholder="Hình ảnh"
              />
              {errors.HinhAnh && "Hình ảnh không được để trống"}
            </div>
            <div className="form-group">
              <label>Giá nhập</label>
              <input
                type="number"
                name="GiaNhap"
                className="form-control"
                ref={register({ required: true, min: 0 })}
                placeholder="Giá nhập"
              />
              {errors.GiaNhap && "Giá nhập không hợp lệ"}
            </div>
            <div className="form-group">
              <label>Giá bán</label>
              <input
                type="number"
                name="GiaBan"
                className="form-control"
                ref={register({ required: true, min: 0 })}
                placeholder="Giá bán"
              />
              {errors.GiaBan && "Giá bán không hợp lệ"}
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
