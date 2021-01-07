import React, { useState, useEffect } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import axios from "axios";
import Header from "../Common/Header";
import Menu from "../Common/Menu";
import Pagination from "react-js-pagination";

export default function Listbook() {
  const history = useHistory();
  const [listBook, setListBook] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [keyword, setKeyWord] = useState("");
  const [newList, setNewList] = useState([]);

  const getListBook = () => {
    setLoading(true);
    axios
      .get("http://localhost/phs_ttk/api/sach")
      .then((response) => {
        setListBook(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const removeBook = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      axios
        .delete(`http://localhost/phs_ttk/api/sach/${id}`)
        .then((response) => {
          if (response.status === 200) {
            window.alert("Xóa thành công");
            const newListBook = listBook.filter((item) => {
              return item.IDSach !== id;
            });

            setListBook(newListBook);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const findBook = (data) => {
    const result = listBook.filter(function (book) {
      return book.TenSach.toLowerCase().indexOf(data) !== -1; // returns true or false
    });

    setNewList(result);
  };

  const indexOfLastItems = currentPage * itemsPerPage;
  const indexOfFirstItems = indexOfLastItems - itemsPerPage;
  const currentItems = listBook.slice(indexOfFirstItems, indexOfLastItems);

  useEffect(() => {
    getListBook();

    findBook();
  }, [keyword]);

  return (
    <div>
      <Header />
      <Menu />
      <div className="content-wrapper">
        <div className="row mr-1 ml-1 mt-3">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3>Danh sách sách</h3>
                <div className="card-tools">
                  <div
                    className="input-group input-group-sm row"
                    style={{ width: 500 }}
                  >
                    <div className="mr-4">
                      <Link
                        to="/themsach"
                        className="btn btn-block btn-success"
                      >
                        <i className="fas fa-plus" /> Thêm sách
                      </Link>
                    </div>

                    <div className="input-group-append ml-4">
                      <input
                        type="text"
                        name="table_search"
                        className="form-control float-right"
                        placeholder="Tên sách"
                        onChange={(e) => findBook(e.target.value)}
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
                                Tên sách
                              </th>
                              <th
                                class="sorting"
                                tabindex="0"
                                aria-controls="example2"
                                rowspan="1"
                                colspan="1"
                                aria-label="Browser: activate to sort column ascending"
                              >
                                Tác giả
                              </th>
                              <th
                                class="sorting"
                                tabindex="0"
                                aria-controls="example2"
                                rowspan="1"
                                colspan="1"
                                aria-label="Platform(s): activate to sort column ascending"
                              >
                                Nhà xuất bản
                              </th>
                              <th
                                class="sorting"
                                tabindex="0"
                                aria-controls="example2"
                                rowspan="1"
                                colspan="1"
                                aria-label="Engine version: activate to sort column ascending"
                              >
                                Năm xuất bản
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
                              ? newList.map((itemBook,key) => {
                                  return (
                                    <tr role="row" className="odd">
                                      <td>{itemBook.TenSach}</td>
                                      <td>{itemBook.TacGia}</td>
                                      <td>{itemBook.NhaXuatBan}</td>
                                      <td>{itemBook.NamXuatBan}</td>
                                      <td
                                        style={{
                                          wordWrap: "break-word",
                                          overflow: "hidden",
                                        }}
                                      >
                                        <Link
                                          to={`/dssach/xemchitiet/${itemBook.IDSach}`}
                                          type="button"
                                          className="btn btn-block btn-primary"
                                        >
                                          <i className="fas fa-eye" /> Xem
                                        </Link>
                                        <Link
                                          to={`/dssach/sua/${itemBook.IDSach}`}
                                          type="button"
                                          className="btn btn-block btn-warning"
                                        >
                                          <i className="fas fa-pen" /> Sửa
                                        </Link>
                                        <button
                                          onClick={() =>
                                            removeBook(itemBook.IDSach)
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
                              : currentItems?.map((itemBook) => {
                                  return (
                                    <tr role="row" className="odd">
                                      <td>{itemBook.TenSach}</td>
                                      <td>{itemBook.TacGia}</td>
                                      <td>{itemBook.NhaXuatBan}</td>
                                      <td>{itemBook.NamXuatBan}</td>
                                      <td
                                        style={{
                                          wordWrap: "break-word",
                                          overflow: "hidden",
                                        }}
                                      >
                                        <Link
                                          to={`/dssach/xemchitiet/${itemBook.IDSach}`}
                                          type="button"
                                          className="btn btn-block btn-primary"
                                        >
                                          <i className="fas fa-eye" /> Xem
                                        </Link>
                                        <Link
                                          to={`/dssach/sua/${itemBook.IDSach}`}
                                          type="button"
                                          className="btn btn-block btn-warning"
                                        >
                                          <i className="fas fa-pen" /> Sửa
                                        </Link>
                                        <button
                                          onClick={() =>
                                            removeBook(itemBook.IDSach)
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
                            totalItemsCount={listBook.length}
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
