import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../Common/Header";
import Menu from "../Common/Menu";
import axios from "axios";

export default function DetailImport() {
  const [loading, setLoading] = useState(false);
  const [detailImport, setDetailImport] = useState();

  let { id } = useParams();

  const getDetailImport = () => {
    setLoading(true);
    axios
      .get(`http://localhost/phs_ttk/api/hoadonnhap/${id}`)
      .then((response) => {
        setDetailImport(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getDetailImport();
  },[]);

  return (
    <div>
      <Header />
      <Menu />
      <div className="content-wrapper">
        <div className="row mr-1 ml-1 mt-3">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3>Chi tiết phiếu nhập</h3>
              </div>
              <div className="card-tools">
                <div className="col-sm-12">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link to="/">Trang chủ</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="/qlynhapsach">Quản lý phiếu nhập</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="/dsphieunhap">Danh sách phiếu nhập</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      Chi tiết phiếu nhập
                    </li>
                  </ol>
                </div>
              </div>
              <div class="card-body">
                <div
                  id="example2_wrapper"
                  class="dataTables_wrapper dt-bootstrap4"
                >
                  <div class="row">
                    <div class="col-sm-12 col-md-6"></div>
                    <div class="col-sm-12 col-md-6"></div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12">
                      <h6>Thông tin cơ bản</h6>
                      <table
                        id="example2"
                        class="table table-bordered table-hover dataTable dtr-inline"
                        role="grid"
                        aria-describedby="example2_info"
                      >
                        <thead>
                          <tr role="row">
                            <th
                              class="sorting"
                              tabindex="0"
                              aria-controls="example2"
                              rowspan="1"
                              colspan="1"
                              aria-label="Browser: activate to sort column ascending"
                            >
                              Tên nhân viên
                            </th>
                            <th
                              class="sorting"
                              tabindex="0"
                              aria-controls="example2"
                              rowspan="1"
                              colspan="1"
                              aria-label="Platform(s): activate to sort column ascending"
                            >
                              Tên khách hàng
                            </th>
                            <th
                              class="sorting"
                              tabindex="0"
                              aria-controls="example2"
                              rowspan="1"
                              colspan="1"
                              aria-label="Engine version: activate to sort column ascending"
                            >
                              Ngày nhập
                            </th>
                            <th
                              class="sorting"
                              tabindex="0"
                              aria-controls="example2"
                              rowspan="1"
                              colspan="1"
                              aria-label="Engine version: activate to sort column ascending"
                            >
                              Tổng tiền
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading ? (
                            <div className="spinner-border" role="status"></div>
                          ) : detailImport ? (
                            <tr>
                              <td>{detailImport.TenNhanVien}</td>
                              <td>{detailImport.TenKhachHang}</td>
                              <td>{detailImport.NgayNhap}</td>
                              <td>{detailImport.TongTien}</td>
                            </tr>
                          ) : (
                            <p>loading</p>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div class="col-sm-12">
                      <h6>Thông tin sách</h6>
                      <table
                        id="example2"
                        class="table table-bordered table-hover dataTable dtr-inline"
                        role="grid"
                        aria-describedby="example2_info"
                      >
                        <thead>
                          <tr role="row">
                            <th
                              class="sorting"
                              tabindex="0"
                              aria-controls="example2"
                              rowspan="1"
                              colspan="1"
                              aria-label="Browser: activate to sort column ascending"
                            >
                              STT
                            </th>
                            <th
                              class="sorting"
                              tabindex="0"
                              aria-controls="example2"
                              rowspan="1"
                              colspan="1"
                              aria-label="Platform(s): activate to sort column ascending"
                            >
                              Tên sách
                            </th>
                            <th
                              class="sorting"
                              tabindex="0"
                              aria-controls="example2"
                              rowspan="1"
                              colspan="1"
                              aria-label="Engine version: activate to sort column ascending"
                            >
                              Giá nhập
                            </th>
                            <th
                              class="sorting"
                              tabindex="0"
                              aria-controls="example2"
                              rowspan="1"
                              colspan="1"
                              aria-label="Engine version: activate to sort column ascending"
                            >
                              Số lượng
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading ? (
                            <div className="spinner-border" role="status"></div>
                          ) : detailImport ? (
                            detailImport.ChiTiet.map((item, key) => {
                              return (
                                <tr>
                                  <td>{key + 1}</td>
                                  <td>{item.TenSach}</td>
                                  <td>{item.GiaNhap}</td>
                                  <td>{item.SoLuong}</td>
                                </tr>
                              );
                            })
                          ) : (
                            <p>loading</p>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
