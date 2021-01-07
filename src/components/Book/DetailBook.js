import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import Header from "../Common/Header";
import Menu from "../Common/Menu";
import AddBook from "../Book/AddBook";

export default function DetailBook() {

  const [bookInfo, setBookInfo] = useState();

  let {id} = useParams();

  useEffect(() => {
    axios.get(`http://localhost/phs_ttk/api/sach/${id}`)
    .then(response => setBookInfo(response.data))
    .catch(error => console.log(error))
  },[])



  return (
    <div>
      <Header />
      <Menu />
      <div className="content-wrapper" style={{ minHeight: "1416.81px" }}>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Thông tin chi tiết</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Trang chủ</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/dssach">Danh sách sách</Link>
                  </li>
                  <li className="breadcrumb-item active">Chi tiết</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          {/* Default box */}
          <div className="card card-solid">
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="col-12">
                    <img
                      src={bookInfo ? bookInfo.HinhAnh : <p>loading</p>}
                      className="product-image"
                      alt="Product Image"
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <h3 className="my-3">
                     Tên sách: {bookInfo ? bookInfo.TenSach : <p>loading</p>}
                  </h3>
                  <hr />
                  <h4 className="my-3">
                    Tác giả: {bookInfo ? bookInfo.TacGia : <p>loading</p>}
                  </h4>
                  <hr />
                  <h4 className="my-3">
                    Nhà xuất bản: {bookInfo ? bookInfo.NhaXuatBan : <p>loading</p>}
                  </h4>
                  <hr />
                  <h4 className="my-3">
                    Năm xuất bản: {bookInfo ? bookInfo.NamXuatBan : <p>loading</p>}
                  </h4>
                  <hr />
                  <hr />
                  <hr />
                  <hr />
                  <h4 className="my-3">
                    Giá nhập: {bookInfo ? bookInfo.GiaNhap : <p>loading</p>}
                  </h4>
                  <hr />
                  <h4 className="my-3">
                    Giá xuất: {bookInfo ? bookInfo.GiaBan : <p>loading</p>}
                  </h4>
                </div>
              </div>
              <div className="row mt-4">
                <nav className="w-100">
                  <div className="nav nav-tabs" id="product-tab" role="tablist">
                    <h3 className="my-3">Tóm tắt</h3>
                  </div>
                </nav>
                <div className="tab-content p-3" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="product-desc"
                    role="tabpanel"
                    aria-labelledby="product-desc-tab"
                  >
                    {" "}
                    {bookInfo ? bookInfo.TomTat : <p>loading</p>}
                    {" "}
                  </div>
                </div>
              </div>
            </div>
            {/* /.card-body */}
          </div>
          {/* /.card */}
        </section>
        {/* /.content */}
      </div>
    </div>
  );
}
