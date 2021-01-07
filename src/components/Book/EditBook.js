import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../Common/Header";
import Menu from "../Common/Menu";

export default function EditBook() {
  const { register, handleSubmit, errors } = useForm();

  const [bookInfoEdit, setBookInfoEdit] = useState();
  const [listCategory, setListCategory] = useState([]);
  const [unTounch, setUnTouch] = useState(false);

  const history = useHistory();

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
      .get(`http://localhost/phs_ttk/api/sach/${id}`)
      .then((response) => {
        setBookInfoEdit(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get("http://localhost/phs_ttk/api/theloai")
      .then((response) => setListCategory(response.data))
      .catch((error) => console.log(error));
  }, []);

  const onSubmit = async (data) => {
    console.log(data);

    if (window.confirm("Bạn muốn chỉnh sửa thông tin sách?")) {
      setUnTouch(true);
      axios
        .put(`http://localhost/phs_ttk/api/sach/${id}`, data)
        .then((response) => {
          if (response.status === 200) {
            window.alert("Chỉnh sửa thành công");
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
                <h1>Chỉnh sửa thông tin sách</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Trang chủ</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/dssach">Danh sách sách</Link>
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
              <label>Tên sách</label>
              <input
                type="text"
                name="TenSach"
                defaultValue={bookInfoEdit ? bookInfoEdit.TenSach : null}
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
                defaultValue={bookInfoEdit ? bookInfoEdit.TacGia : null}
                className="form-control"
                ref={register({ required: true })}
                placeholder="Tác giả"
              />
              {errors.TacGia && "Tác giả không được để trống"}
            </div>
            <div className="form-group">
              <label>Nhà xuất bản</label>
              <input
                type="text"
                name="NhaXuatBan"
                defaultValue={bookInfoEdit ? bookInfoEdit.NhaXuatBan : null}
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
                defaultValue={bookInfoEdit ? bookInfoEdit.NamXuatBan : null}
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
                {listCategory && bookInfoEdit ? (
                  listCategory.map((itemCategory) => {
                    var selected =
                      itemCategory.IDTheLoai === bookInfoEdit.IDTheLoai
                        ? true
                        : false;
                    return (
                      <option
                        value={itemCategory.IDTheLoai}
                        selected={selected}
                      >
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
                rows="6"
                name="TomTat"
                defaultValue={bookInfoEdit ? bookInfoEdit.TomTat : null}
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
                defaultValue={bookInfoEdit ? bookInfoEdit.HinhAnh : null}
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
                defaultValue={bookInfoEdit ? bookInfoEdit.GiaNhap : null}
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
                defaultValue={bookInfoEdit ? bookInfoEdit.GiaBan : null}
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
                {bookInfoEdit ? (
                  trangthai.map((itemTrangThai) => {
                    var selected =
                      itemTrangThai.value === bookInfoEdit.TrangThai
                        ? true
                        : false;
                    return (
                      <option value={itemTrangThai.value} selected={selected}>
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
          {/* /.card-body */}
          <div className="card-footer">
            <input type="submit" className="btn btn-primary" value="Xác nhận" />
          </div>
        </form>
      </div>
    </div>
  );
}
