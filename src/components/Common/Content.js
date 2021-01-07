import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Menu from "./Menu";
import axios from "axios";
import CanvasJSReact from "../Chart/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Content() {
  const [loading, setLoading] = useState(false);

  const [countBook, setCountBook] = useState();
  const [countImportOrder, setCountImportOrder] = useState(0);
  const [countExportOrder, setCountExportOrder] = useState(0);
  const [countClient, setCountClient] = useState(0);
  const [bookTrending, setBookTrending] = useState([]);
  const [orderHighest, setOrderHighest] = useState([]);
  const [datapointImport, setDataPointImport] = useState([]);
  const [datapointExport, setDataPointExport] = useState([]);

  const getCountBook = () => {
    axios
      .get("http://localhost/phs_ttk/api/slsach")
      .then((response) => setCountBook(response.data))
      .catch((error) => console.log(error));
  };
  const getCountImportOrder = () => {
    axios
      .get("http://localhost/phs_ttk/api/sohdnhap")
      .then((response) => setCountImportOrder(response.data))
      .catch((error) => console.log(error));
  };
  const getCountExportOrder = () => {
    axios
      .get("http://localhost/phs_ttk/api/sohdxuat")
      .then((response) => setCountExportOrder(response.data))
      .catch((error) => console.log(error));
  };
  const getCountClient = () => {
    axios
      .get("http://localhost/phs_ttk/api/sokh")
      .then((response) => setCountClient(response.data))
      .catch((error) => console.log(error));
  };
  const getBookTrending = () => {
    axios
      .get("http://localhost/phs_ttk/api/sachbanchay")
      .then((response) => setBookTrending(response.data))
      .catch((error) => console.log(error));
  };
  const getOrderHighest = () => {
    axios
      .get("http://localhost/phs_ttk/api/hoadoncao")
      .then((response) => setOrderHighest(response.data))
      .catch((error) => console.log(error));
  };

  const getPriceImport = () => {
    var dataPoints = [];
    //var chart = this.chart;
    axios
      .get("http://localhost/phs_ttk/api/nhaptheothang/2021")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          dataPoints.push({
            label: response.data[i].months,
            y: response.data[i].TongTien,
            yrs: response.data[i].years
          });
        }
        setDataPointImport(dataPoints);
      })
      .catch((error) => console.log(error));
  };

  const getPriceExport = () => {
    var dataPoints = [];
    //var chart = this.chart;
    axios
      .get("http://localhost/phs_ttk/api/xuattheothang/2021")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          dataPoints.push({
            label: response.data[i].months,
            y: response.data[i].TongTien,
            yrs: response.data[i].years
          });
        }
        setDataPointExport(dataPoints);
      })
      .catch((error) => console.log(error));
  };


  const changeYearImport = (data) => {
    var dataPoints = [];
    //var chart = this.chart;
    axios
      .get(`http://localhost/phs_ttk/api/nhaptheothang/${data}`)
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          dataPoints.push({
            label: response.data[i].months,
            y: response.data[i].TongTien,
            yrs: response.data[i].years
          });
        }
        setDataPointImport(dataPoints);
      })
      .catch((error) => console.log(error));
  }


  const changeYearExport = (data) => {
    var dataPoints = [];
    //var chart = this.chart;
    axios
      .get(`http://localhost/phs_ttk/api/xuattheothang/${data}`)
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          dataPoints.push({
            label: response.data[i].months,
            y: response.data[i].TongTien,
            yrs: response.data[i].years
          });
        }
        setDataPointExport(dataPoints);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getCountBook();
    getCountClient();
    getCountExportOrder();
    getCountImportOrder();
    getBookTrending();
    getOrderHighest();
    getPriceImport();
    getPriceExport();
  }, []);

  const optionsImport = {
    animationEnabled: true,
    axisX: {
      valueFormatString: "MMM",
    },
    data: [
      {
        yValueFormatString: "$#,###",
        xValueFormatString: "MMMM",
        type: "spline",
        dataPoints: datapointImport,
      },
    ],
  };

  const optionsExport = {
    animationEnabled: true,
    axisX: {
      valueFormatString: "MMM",
    },
    data: [
      {
        yValueFormatString: "$#,###",
        xValueFormatString: "MMMM",
        type: "spline",
        dataPoints: datapointExport,
      },
    ],
  };

  return (
    <div>
      <Header />
      <Menu />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Trang chủ</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          {loading ? (
            <div className="container-fluid">
              <div className="spinner-border" role="status"></div>
            </div>
          ) : (
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box">
                    <span className="info-box-icon bg-info elevation-1">
                      <i className="fas fa-book nav-icon" />
                    </span>
                    <Link to="/dssach" className="info-box-content">
                      <div>
                        <span className="info-box-text">Tổng số sách</span>
                        <span className="info-box-number">{countBook?.sl}</span>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box mb-3">
                    <span className="info-box-icon bg-danger elevation-1">
                      <i class="nav-icon fas fa-caret-square-right"></i>
                    </span>
                    <Link to="/dsphieunhap">
                      <div className="info-box-content">
                        <span className="info-box-text">Số hóa đơn nhập</span>
                        <span className="info-box-number">
                          {countImportOrder}
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="clearfix hidden-md-up" />
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box mb-3">
                    <span className="info-box-icon bg-success elevation-1">
                      <i class="nav-icon fas fa-caret-square-left"></i>
                    </span>
                    <Link to="/dsphieuxuat">
                      <div className="info-box-content">
                        <span className="info-box-text">Số hóa đơn xuất</span>
                        <span className="info-box-number">
                          {countExportOrder}
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box mb-3">
                    <span className="info-box-icon bg-warning elevation-1">
                      <i className="fas fa-users" />
                    </span>
                    <Link to="/dskhachhang">
                      <div className="info-box-content">
                        <span className="info-box-text">Số khách hàng</span>
                        <span className="info-box-number">{countClient}</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-header border-0">
                      <div className="d-flex justify-content-between">
                        <h6>
                          Thống kê chi phí nhập sách theo tháng. Năm
                        </h6>
                        <select onChange={(e) => changeYearImport(e.target.value)} defaultValue={2021} >
                          <option defaultValue={2017}>2017</option>
                          <option defaultValue={2018}>2018</option>
                          <option defaultValue={2019}>2019</option>
                          <option defaultValue={2020}>2020</option>
                          <option defaultValue={2021}>2021</option>
                        </select>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="position-relative mb-4">
                        <CanvasJSChart
                          options={optionsImport}
                          //onRef={(ref) => (this.chart = ref)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-header border-0">
                      <div className="d-flex justify-content-between">
                        <h6>
                          Thống kê doanh thu xuất sách theo tháng. Năm
                        </h6>
                        <select onChange={(e) => changeYearExport(e.target.value)} defaultValue={2021} >
                          <option defaultValue={2017}>2017</option>
                          <option defaultValue={2018}>2018</option>
                          <option defaultValue={2019}>2019</option>
                          <option defaultValue={2020}>2020</option>
                          <option defaultValue={2021}>2021</option>
                        </select>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="position-relative mb-4">
                        <CanvasJSChart
                          options={optionsExport}
                          //onRef={(ref) => (this.chart = ref)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header border-0">
                  <h3 className="card-title">
                    Thống kê những sách bán chạy nhất
                  </h3>
                </div>
                <div className="card-body table-responsive p-0">
                  <table className="table table-striped table-valign-middle">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Tên sách</th>
                        <th>Tác giả</th>
                        <th>Nhà xuất bản</th>
                        <th>Đã bán</th>
                        <th>Còn lại</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookTrending?.map((itemBook, key) => {
                        return (
                          <tr>
                            <td>{key + 1}</td>
                            <td>{itemBook.TenSach}</td>
                            <td>{itemBook.TacGia}</td>
                            <td>{itemBook.NhaXuatBan}</td>
                            <td>{itemBook.DaBan}</td>
                            <td>{itemBook.ConLai}</td>
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
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="card">
                  <div className="card-header border-0">
                    <h3 className="card-title">
                      Thống kê những hóa đơn xuất có trị giá cao nhất
                    </h3>
                  </div>
                  <div className="card-body table-responsive p-0">
                    <table className="table table-striped table-valign-middle">
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>Tên nhân viên</th>
                          <th>Tên khách hàng</th>
                          <th>Ngày xuất</th>
                          <th>Tổng tiền</th>
                          <th>Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderHighest?.map((itemOrder, key) => {
                          return (
                            <tr>
                              <td>{key + 1}</td>
                              <td>{itemOrder.TenTaiKhoan}</td>
                              <td>{itemOrder.TenKhachHang}</td>
                              <td>{itemOrder.NgayXuat}</td>
                              <td>{itemOrder.TongTien}</td>
                              <td
                                style={{
                                  wordWrap: "break-word",
                                  overflow: "hidden",
                                }}
                              >
                                <Link
                                  to={`/dsphieuxuat/chitiet/${itemOrder.IDPhieuXuat}`}
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
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
