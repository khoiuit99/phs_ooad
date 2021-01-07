import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../Common/Header";
import Menu from "../Common/Menu";
import Pagination from "react-js-pagination";

export default function ListExport() {
  const [listExport, setListExport] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [keyword, setKeyWord] = useState("");
  const [newList, setNewList] = useState([]);

  const getListExport = () => {
    setLoading(true);
    axios
      .get("http://localhost/phs_ttk/api/hoadonxuat")
      .then((response) => {
        setListExport(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const findExport = (data) => {
    const result = listExport.filter(function (order) {
      return (
        order.TenKhachHang.toLowerCase().indexOf(data) !== -1 ||
        order.TenTaiKhoan.toLowerCase().indexOf(data) !== -1
      ); // returns true or false
    });

    setNewList(result);
  };

  const indexOfLastItems = currentPage * itemsPerPage;
  const indexOfFirstItems = indexOfLastItems - itemsPerPage;
  const currentItems = listExport.slice(indexOfFirstItems, indexOfLastItems);

  useEffect(() => {
    //setTimeout(history.go(0),20000);
    getListExport();
  }, []);
  return (
    <div>
      <Header />
      <Menu />
      <div className="content-wrapper">
        <div className="row mr-1 ml-1 mt-3">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3>Danh sách phiếu xuất</h3>
                <hr />
                <div className="card-tools">
                  <div
                    className="input-group input-group-sm row"
                    style={{ width: 900 }}
                  >
                    <div className="input-group-append col-sm-6">
                      <input
                        type="text"
                        name="table_search"
                        className="form-control float-right"
                        placeholder="Tên khách hàng (Tên nhân viên)"
                        onChange={(e) => findExport(e.target.value)}
                      />
                      {/* <button type="submit" className="btn btn-default">
                        <i className="fas fa-search" />
                      </button> */}
                    </div>

                    <div className="col-sm-6">
                      <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">
                          <Link to="/">Trang chủ</Link>
                        </li>
                        <li className="breadcrumb-item">
                          <Link to="/qlyxuatsach">Quản lý xuất sách</Link>
                        </li>
                        <li className="breadcrumb-item active">
                          Lịch sử xuất sách
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              {loading ? (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status"></div>
                </div>
              ) : (
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
                        <table
                          id="example2"
                          class="table table-bordered table-hover dataTable dtr-inline"
                          role="grid"
                          aria-describedby="example2_info"
                        >
                          <thead>
                            <tr role="row">
                              <th
                                class="sorting_asc"
                                tabindex="0"
                                aria-controls="example2"
                                rowspan="1"
                                colspan="1"
                                aria-sort="ascending"
                                aria-label="Rendering engine: activate to sort column descending"
                              >
                                STT
                              </th>
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
                                Ngày xuất
                              </th>
                              <th
                                class="sorting"
                                tabindex="0"
                                aria-controls="example2"
                                rowspan="1"
                                colspan="1"
                                aria-label="Engine version: activate to sort column ascending"
                              >
                                Ghi chú
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
                              <th
                                class="sorting"
                                tabindex="0"
                                aria-controls="example2"
                                rowspan="1"
                                colspan="1"
                                aria-label="CSS grade: activate to sort column ascending"
                              >
                                Thao tác
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {newList?.length && keyword !== 0
                              ? newList.map((itemExport, key) => {
                                  return (
                                    <tr role="row" className="odd">
                                      <td>{key + 1}</td>
                                      <td>{itemExport.TenTaiKhoan}</td>
                                      <td>{itemExport.TenKhachHang}</td>
                                      <td>{itemExport.NgayXuat}</td>
                                      <td>{itemExport.GhiChu}</td>
                                      <td>{itemExport.TongTien}</td>
                                      <td
                                        style={{
                                          wordWrap: "break-word",
                                          overflow: "hidden",
                                        }}
                                      >
                                        <Link
                                          to={`/dsphieuxuat/chitiet/${itemExport.IDPhieuXuat}`}
                                          type="button"
                                          className="btn btn-block btn-primary"
                                        >
                                          <i className="fas fa-eye" /> Xem
                                        </Link>
                                      </td>
                                    </tr>
                                  );
                                })
                              : currentItems?.map((itemExport, key) => {
                                  return (
                                    <tr role="row" className="odd">
                                      <td>{key + 1}</td>
                                      <td>{itemExport.TenTaiKhoan}</td>
                                      <td>{itemExport.TenKhachHang}</td>
                                      <td>{itemExport.NgayXuat}</td>
                                      <td>{itemExport.GhiChu}</td>
                                      <td>{itemExport.TongTien}</td>
                                      <td
                                        style={{
                                          wordWrap: "break-word",
                                          overflow: "hidden",
                                        }}
                                      >
                                        <Link
                                          to={`/dsphieuxuat/chitiet/${itemExport.IDPhieuXuat}`}
                                          type="button"
                                          className="btn btn-block btn-primary"
                                        >
                                          <i className="fas fa-eye" /> Xem
                                        </Link>
                                      </td>
                                    </tr>
                                  );
                                })}
                          </tbody>
                        </table>
                        <div className="d-flex justify-content-center">
                          <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={itemsPerPage}
                            totalItemsCount={listExport.length}
                            pageRangeDisplayed={5}
                            itemClass="page-item"
                            linkClass="page-link"
                            onChange={handlePageChange.bind(this)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
