import React, { useState, useEffect } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import axios from "axios";
import Header from "../Common/Header";
import Menu from "../Common/Menu";
import Pagination from "react-js-pagination";

export default function ListClient() {
  const [listClient, setListClient] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [keyword, setKeyWord] = useState("");
  const [newList, setNewList] = useState([]);

  const getListClient = () => {
    setLoading(true);
    axios
      .get("http://localhost/phs_ttk/api/khachhang")
      .then((response) => {
        setListClient(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const getListClientByID = (id) => {
    axios
      .get(`http://localhost/phs_ttk/api/loaikhachhang/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setNewList(response.data);
        }
      })
      .catch((error) => console.log(error));
  };

  const removeClient = (id) => {
    if (window.confirm("Bạn muốn xóa khách hàng?")) {
      axios
        .delete(`http://localhost/phs_ttk/api/khachhang/${id}`)
        .then((response) => {
          if (response.status === 200) {
            window.alert("Xóa thành công");
            const newListClient = listClient.filter((item) => {
              return item.IDKhachHang !== id;
            });
            setListClient(newListClient);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const findClient = (data) => {
    const result = listClient.filter(function (client) {
      return client.TenKhachHang.toLowerCase().indexOf(data) !== -1; // returns true or false
    });

    setNewList(result);
  };

  const indexOfLastItems = currentPage * itemsPerPage;
  const indexOfFirstItems = indexOfLastItems - itemsPerPage;
  const currentItems = newList
    ? listClient.slice(indexOfFirstItems, indexOfLastItems)
    : listClient.slice(indexOfFirstItems, indexOfLastItems);

  useEffect(() => {
    getListClient();
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
                <h3>Danh sách khách hàng</h3>
                <hr />
                <div className="card-tools">
                  <div
                    className="input-group input-group-sm row"
                    style={{ width: 800 }}
                  >
                    <div className="mr-4">
                      <Link
                        to="/themkhachhang"
                        className="btn btn-block btn-success"
                      >
                        <i className="fas fa-plus" /> Thêm khách hàng
                      </Link>
                    </div>

                    <div className="input-group-append">
                      <select
                        class="form-control"
                        defaultValue="1"
                        onChange={(e) => getListClientByID(e.target.value)}
                      >
                        <option value="1">Nhà xuất bản</option>
                        <option value="2">Đại lý bán lẻ</option>
                      </select>
                    </div>

                    <div className="input-group-append ml-4">
                      <input
                        type="text"
                        name="table_search"
                        className="form-control float-right"
                        placeholder="Tên khách hàng"
                        onChange={(e) => findClient(e.target.value)}
                      />
                      <button type="submit" className="btn btn-default">
                        <i className="fas fa-search" />
                      </button>
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
                                class="sorting_asc"
                                tabindex="0"
                                aria-controls="example2"
                                rowspan="1"
                                colspan="1"
                                aria-sort="ascending"
                                aria-label="Rendering engine: activate to sort column descending"
                              >
                                Tên khách hàng
                              </th>
                              <th
                                class="sorting"
                                tabindex="0"
                                aria-controls="example2"
                                rowspan="1"
                                colspan="1"
                                aria-label="Browser: activate to sort column ascending"
                              >
                                Địa chỉ
                              </th>
                              <th
                                class="sorting"
                                tabindex="0"
                                aria-controls="example2"
                                rowspan="1"
                                colspan="1"
                                aria-label="CSS grade: activate to sort column ascending"
                              >
                                Số điện thoại
                              </th>
                              <th
                                class="sorting"
                                tabindex="0"
                                aria-controls="example2"
                                rowspan="1"
                                colspan="1"
                                aria-label="CSS grade: activate to sort column ascending"
                              >
                                Loại khách hàng
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
                              ? newList.map((itemClient, key) => {
                                  return (
                                    <tr role="row" className="odd">
                                      <td>{key + 1}</td>
                                      <td>{itemClient.TenKhachHang}</td>
                                      <td>{itemClient.DiaChi}</td>
                                      <td>{itemClient.SoDienThoai}</td>
                                      <td>{itemClient.IDLoaiKhachHang}</td>
                                      <td
                                        style={{
                                          wordWrap: "break-word",
                                          overflow: "hidden",
                                        }}
                                      >
                                        <Link
                                          to={`/dskhachhang/sua/${itemClient.IDKhachHang}`}
                                          type="button"
                                          className="btn btn-block btn-warning"
                                        >
                                          <i className="fas fa-pen" /> Sửa
                                        </Link>
                                        <button
                                          onClick={() =>
                                            removeClient(itemClient.IDKhachHang)
                                          }
                                          type="button"
                                          className="btn btn-block btn-danger"
                                        >
                                          <i className="fas fa-trash" /> Xóa
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })
                              : currentItems?.map((itemClient, key) => {
                                  return (
                                    <tr role="row" className="odd">
                                      <td>{key + 1}</td>
                                      <td>{itemClient.TenKhachHang}</td>
                                      <td>{itemClient.DiaChi}</td>
                                      <td>{itemClient.SoDienThoai}</td>
                                      <td>{itemClient.IDLoaiKhachHang}</td>
                                      <td
                                        style={{
                                          wordWrap: "break-word",
                                          overflow: "hidden",
                                        }}
                                      >
                                        <Link
                                          to={`/dskhachhang/sua/${itemClient.IDKhachHang}`}
                                          type="button"
                                          className="btn btn-block btn-warning"
                                        >
                                          <i className="fas fa-pen" /> Sửa
                                        </Link>
                                        <button
                                          onClick={() =>
                                            removeClient(itemClient.IDKhachHang)
                                          }
                                          type="button"
                                          className="btn btn-block btn-danger"
                                        >
                                          <i className="fas fa-trash" /> Xóa
                                        </button>
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
                            totalItemsCount={listClient.length}
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
