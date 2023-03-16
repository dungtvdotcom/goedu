import Vue from "vue";
import VueRouter from "vue-router";

import Layout from "../components/Layout";
import Home from "../views/QuanLyKhoaHoc/Danhsachkhoahoc/Home";
import Danhsachgiaovien from "../views/QuanLyKhoaHoc/Danhsachgiaovien/Danhsachgiaovien";
import Danhsachchude from "../views/QuanLyKhoaHoc/Danhsachchude/Danhsachchude";
import Danhsachngayhoc from "../views/QuanLyKhoaHoc/Danhsachngayhoc/Danhsachngayhoc";
import ThuVienFileMau from "../views/QuanLyKhoaHoc/ThuVienFileMau/ThuVienFileMau";
import QuanLyBanner from "../views/QuanLyBanner/QuanLyBanner";
import LiveStream from "../views/LiveStream/LiveStreamChuaDienRa/LiveStreamChuaDienRa";
import LiveStreamDangDienRa from "../views/LiveStream/LiveStreamdangdienra/LiveStreamdangdienra";
import LiveStreamCu from "../views/LiveStream/LiveStreamCu/LiveStreamCu";
import Role from "../views/QuanTriHeThong/Role/Role";
import User from "../views/QuanTriHeThong/User/User";

import RoleUser from "../views/QuanTriHeThong/RoleUser/RoleUser";

import Code from "../views/QuanLyMaKichHoat/Code/QuanLyMaKichHoat";

import BachKhoaTraCuu from "../views/BachKhoaTraCuu/BachKhoaTraCuu";

import ChamSocKhachHang from "../views/ChamSocKhachHang/ChamSocKhachHang";

import Permisson from "../views/QuanTriHeThong/Permission/Permission";
import PolicyRules from "../views/QuanTriHeThong//PolicyRules/PolicyRules";
import UserPermisson from "../views/QuanTriHeThong/UserPermission/UserPermission";

import BaoCaoAPI from "../views/DocAPI/DocApi";
import HomePage from "../views/home-page";

import TheoDoiHocVien from "../views/QuanLyKhoaHoc/Thongkeviechoc/Thongkeviechoc";

import Swapping from "../views/QuanLyKhoaHoc/Chuyenthehoc/Chuyenthehoc";

import TaoFileMau from "../views/TaoFileMau/TaoFileMau";

import Lichsukichhoatkhoahoc from "../views/ChamSocKhachHang/Lichsukichhoatkhoahoc/Lichsukichhoatkhoahoc";

import Report from "../views/Report/Report";

import Auth from "../components/auth/Auth";

//HOME PAGE /////////////
import Stories from "../views/HOMEPAGE/CauChuyen/Stories";

import Blogs from "../views/HOMEPAGE/QuanLyBlog/Blogs";

import CoursesHomePage from "../views/HOMEPAGE/QuanLyKhoaHoc/Courses";

import Library from "../views/HOMEPAGE/QuanLyThuVien/Library";

import Opinions from "../views/HOMEPAGE/QuanLyYKien/Opinions";

import SubscribedEmails from "../views/HOMEPAGE/SubscribedEmails/SubscribedEmails";

import Recruitments from "../views/HOMEPAGE/TuyenDung/Recruitments";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "layout",
    component: Layout,
    children: [
      { path: "/", redirect: "/home" },
      {
        path: "/home",
        name: "HomePage",
        component: HomePage,
      },
      {
        path: "/courses",
        name: "Courses",
        component: Home,
        children: [
          {
            path: "/danhsachkhoahoc",
            name: "danhsachkhoahoc",
            component: () =>
              import("../views/QuanLyKhoaHoc/Danhsachkhoahoc/ListCourse"),
          },
          {
            path: "/danhsachkhoahoc/them-moi-khoa-hoc/:id?",
            name: "themmoikhoahoc",
            component: () =>
              import("../views/QuanLyKhoaHoc/Danhsachkhoahoc/AddCourse"),
          },
        ],
      },
      {
        path: "/listTeacher",
        name: "Maindanhsachgiaovien",
        component: Danhsachgiaovien,
        children: [
          { path: "/listTeacher", redirect: "/danhsachgiaovien" },
          {
            path: "/danhsachgiaovien",
            name: "danhsachgiaovien",
            component: () =>
              import("../views/QuanLyKhoaHoc/Danhsachgiaovien/ListTeachers"),
          },
          {
            path: "/danhsachgiaovien/them-moi-giao-vien",
            name: "themmoigiaovien",
            component: () =>
              import("../views/QuanLyKhoaHoc/Danhsachgiaovien/AddTeacher"),
          },
        ],
      },

      {
        path: "/swapping",
        name: "swapping",
        component: Swapping,
        children: [
          { path: "/swapping", redirect: "/swapping-card-from-user-to-other" },
          {
            path: "/swapping-card-from-user-to-other",
            name: "swapping-card",
            component: () =>
              import("../views/QuanLyKhoaHoc/Chuyenthehoc/SwappingCard"),
          },
        ],
      },

      {
        path: "/theodoihocvien",
        name: "theodoihocvien",
        component: TheoDoiHocVien,
        children: [
          {
            path: "/theodoihocvien",
            redirect: "/theo-doi-hoc-vien",
          },
          {
            path: "/theo-doi-hoc-vien",
            name: "theo-doi-hoc-vien",
            component: () =>
              import("../views/QuanLyKhoaHoc/Thongkeviechoc/ListThongKe"),
          },
        ],
      },

      {
        path: "/listTopic",
        name: "listTopic",
        component: Danhsachchude,
        children: [
          { path: "/listTopic", redirect: "/danhsachchude" },
          {
            path: "/danhsachchude",
            name: "danhsachchude",
            component: () =>
              import("../views/QuanLyKhoaHoc/Danhsachchude/ListTopic"),
          },
          {
            path: "/danhsachchude/them-moi-chu-de",
            name: "themmoichude",
            component: () =>
              import("../views/QuanLyKhoaHoc/Danhsachchude/AddTopic"),
          },
        ],
      },

      {
        path: "/ngayhoc",
        name: "ngayhoc",
        component: Danhsachngayhoc,
        children: [
          { path: "/ngayhoc", redirect: "/danhsachngayhoc" },
          {
            path: "/danhsachngayhoc",
            name: "danhsachngayhoc",
            component: () =>
              import("../views/QuanLyKhoaHoc/Danhsachngayhoc/ListNgayHoc"),
          },
          {
            path: "/danhsachngayhoc/them-moi-ngay-hoc/:id?",
            name: "themmoingayhoc",
            component: () =>
              import("../views/QuanLyKhoaHoc/Danhsachngayhoc/AddNgayHoc"),
          },
        ],
      },

      {
        path: "/thuvien",
        name: "thuvien",
        component: ThuVienFileMau,
        children: [
          { path: "/thuvien", redirect: "/danhsachfilemau" },
          {
            path: "/danhsachfilemau",
            name: "danhsachfilemau",
            component: () =>
              import("../views/QuanLyKhoaHoc/ThuVienFileMau/ListFileMau"),
          },
          {
            path: "/danhsachfilemau/them-moi-file-mau",
            name: "themmoifilemau",
            component: () =>
              import("../views/QuanLyKhoaHoc/ThuVienFileMau/AddFileMau"),
          },
        ],
      },

      // QUAN LY BANNER
      {
        path: "/banner",
        name: "banner",
        component: QuanLyBanner,
        children: [
          { path: "/banner", redirect: "/taomoibanner" },
          {
            path: "/taomoibanner",
            name: "taomoibanner",
            component: () => import("../views/QuanLyBanner/AddBanner"),
          },
        ],
      },

      // LIVE STREAM
      {
        path: "/live",
        name: "live",
        component: LiveStream,
        children: [
          { path: "/live", redirect: "/livestream-pending" },
          {
            path: "/livestream-pending",
            name: "livestream-pending",
            component: () =>
              import("../views/LiveStream/LiveStreamChuaDienRa/ListLiveStream"),
          },
          {
            path: "/livestream-pending/them-moi-livestream-pending",
            name: "themmoilivestreampeding",
            component: () =>
              import(
                "../views/LiveStream/LiveStreamChuaDienRa/AddLiveStreamPeding"
              ),
          },
        ],
      },
      {
        path: "/livestream-dangdienra",
        name: "livestreaming-dangdienra",
        component: LiveStreamDangDienRa,
        children: [
          { path: "/livestream-dangdienra", redirect: "/livestreaming" },
          {
            path: "/livestreaming",
            name: "livestreaming",
            component: () =>
              import("../views/LiveStream/LiveStreamdangdienra/ListStreaming"),
          },
        ],
      },
      {
        path: "/streamcu",
        name: "streamcu",
        component: LiveStreamCu,
        children: [
          { path: "/streamcu", redirect: "/old-livestream" },
          {
            path: "/old-livestream",
            name: "old-livestream",
            component: () =>
              import("../views/LiveStream/LiveStreamCu/ListStreamCu"),
          },
        ],
      },

      // QUẢN TRỊ HỆ THỐNG
      {
        path: "/phanquyen",
        name: "phanquyen",
        component: Role,
        children: [
          { path: "/phanquyen", redirect: "/role" },
          {
            path: "/role",
            name: "role",
            component: () => import("../views/QuanTriHeThong/Role/ListRole"),
          },
          {
            path: "/role/them-moi-nhom-quyen/:id?",
            name: "themmoinhomquyen",
            component: () => import("../views/QuanTriHeThong/Role/AddRole"),
          },
        ],
      },
      {
        path: "/nguoidung",
        name: "nguoidung",
        component: User,
        children: [
          { path: "/nguoidung", redirect: "/user" },
          {
            path: "/user",
            name: "user",
            component: () => import("../views/QuanTriHeThong/User/ListUser"),
          },
          {
            path: "/user/them-moi-nguoi-dung",
            name: "themmoinguoidung",
            component: () => import("../views/QuanTriHeThong/User/AddUser"),
          },
          {
            path: "/user/them-moi-nguoi-dung/:id?",
            name: "themmoinguoidung",
            component: () => import("../views/QuanTriHeThong/User/UpdateUser"),
          },
        ],
      },
      {
        path: "/role-user",
        name: "role-user",
        component: RoleUser,
        children: [
          { path: "/role-user", redirect: "/list-role-user" },
          {
            path: "/list-role-user",
            name: "list-role-user",
            component: () =>
              import("../views/QuanTriHeThong/RoleUser/ListRoleUser"),
          },
          {
            path: "/list-role-user/them-moi-role-user/:id?",
            name: "them-moi-role-user",
            component: () =>
              import("../views/QuanTriHeThong/RoleUser/AddRoleUser"),
          },
        ],
      },

      {
        path: "/permisson",
        name: "permisson",
        component: Permisson,
        children: [
          { path: "/permisson", redirect: "/list-permission" },
          {
            path: "/list-permission",
            name: "list-permission",
            component: () =>
              import("../views/QuanTriHeThong/Permission/ListPermission"),
          },
          {
            path: "/permisson/them-moi/:id?",
            name: "permisson",
            component: () =>
              import("../views/QuanTriHeThong/Permission/AddPermission"),
          },
        ],
      },

      {
        path: "/policy-rules",
        name: "policy-rules",
        component: PolicyRules,
        children: [
          { path: "/policy-rules", redirect: "/list-policy-rules" },
          {
            path: "/list-policy-rules",
            name: "list-policy-rules",
            component: () =>
              import("../views/QuanTriHeThong//PolicyRules/ListPolicyRules"),
          },
          {
            path: "/list-policy-rules/them-moi/:id?",
            name: "addpolicy-rules",
            component: () =>
              import("../views/QuanTriHeThong/PolicyRules/AddPolicyRules"),
          },
        ],
      },

      {
        path: "/user-permission",
        name: "user-permission",
        component: UserPermisson,
        children: [
          { path: "/user-permission", redirect: "/list-user-permission" },
          {
            path: "/list-user-permission",
            name: "list-user-permission",
            component: () =>
              import("../views/QuanTriHeThong/UserPermission/ListUserPemisson"),
          },
        ],
      },

      // QUAN LY MA THE CAO
      {
        path: "/code",
        name: "code",
        component: Code,
        children: [
          { path: "/code", redirect: "/makichhoat" },
          {
            path: "/makichhoat",
            name: "makichhoat",
            component: () => import("../views/QuanLyMaKichHoat/Code/ListCode"),
          },
          {
            path: "/code/xuatmakichhoat",
            name: "xuatmakichhoat",
            component: () =>
              import("../views/QuanLyMaKichHoat/Code/ExportCode"),
          },
          {
            path: "/code/them-ma-kich-hoat",
            name: "themmakichhoat",
            component: () => import("../views/QuanLyMaKichHoat//Code/AddCode"),
          },
        ],
      },

      // CHĂM SÓC KHÁCH HÀNG
      {
        path: "/chamsockhachhang",
        name: "chamsockhachhang",
        component: ChamSocKhachHang,
        children: [
          { path: "/chamsockhachhang", redirect: "/tracuumakichhoat" },
          {
            path: "/tracuumakichhoat",
            name: "tracuumakichhoat",
            component: () =>
              import("../views/ChamSocKhachHang/SearchActiveCode"),
          },
          {
            path: "/lichsuhoctap",
            name: "lichsuhoctap",
            component: () => import("../views/ChamSocKhachHang/LichSuHocTap"),
          },
          {
            path: "/thoigiankichhoat",
            name: "thoigiankichhoat",
            component: () =>
              import("../views/ChamSocKhachHang/ThoiGianKichHoat"),
          },
          {
            path: "/tim-kiem-facebook",
            name: "tim-kiem-facebook",
            component: () =>
              import("../views/ChamSocKhachHang/TimKiemFacebook"),
          },
          {
            path: "/listing-user-card-view",
            name: "listing-user-card-view",
            component: () =>
              import("../views/ChamSocKhachHang/ListTheDaSuDung"),
          },
          {
            path: "/listing-user-course-view",
            name: "listing-user-course-view",
            component: () => import("../views/ChamSocKhachHang/ListNguoiHoc"),
          },
        ],
      },

      // TẠO FILE MẪU
      {
        path: "/filemau",
        name: "filemau",
        component: TaoFileMau,
        children: [
          { path: "/filemau", redirect: "/listfilemau" },
          {
            path: "/listfilemau",
            name: "listfilemau",
            component: () => import("../views/TaoFileMau/ListFileMau"),
          },
          {
            path: "/listfilemau/addfile/:id?",
            name: "addfile",
            component: () => import("../views/TaoFileMau/AddFileMau"),
          },
        ],
      },

      {
        path: "/lich-su-kich-hoat-the",
        name: "lichsukichhoatthe",
        component: Lichsukichhoatkhoahoc,
      },

      // REPORT
      {
        path: "/report",
        name: "report",
        component: Report,
        children: [
          { path: "/report", redirect: "/baocaosonguoidung" },
          {
            path: "/baocaosonguoidung",
            name: "baocaosonguoidung",
            component: () => import("../views/Report/Baocaosonguoisudung"),
          },
          {
            path: "/tinhtrangsothe",
            name: "tinhtrangsothe",
            component: () => import("../views/Report/Tinhtrangsothe"),
          },

          {
            path: "/baocaotheongay",
            name: "baocaotheongay",
            component: () => import("../views/Report/Baocaotheongay"),
          },
        ],
      },

      // BÁCH KHOA TRA CỨU
      {
        path: "/bachkhoatracuu",
        name: "bachkhoatracuu",
        component: BachKhoaTraCuu,
        children: [
          { path: "/bachkhoatracuu", redirect: "/huongdankhoahoc" },
          {
            path: "/huongdankhoahoc/:id?",
            name: "huongdankhoahoc",
            component: () => import("../views/BachKhoaTraCuu/HuongDanKhoaHoc"),
          },
          {
            path: "/danh-sach-huong-dan",
            name: "danh-sach-huong-dan",
            component: () => import("../views/BachKhoaTraCuu/DanhSachTraCuu"),
          },
        ],
      },

      //////HOME PAGE/////////////////////////////////////////////////

      //CAU CHUYEN
      {
        path: "/home-page-stories-cms",
        name: "cauchuyen",
        component: Stories,
        children: [
          { path: "/home-page-stories-cms", redirect: "/danh-sach-cau-chuyen" },
          {
            path: "/danh-sach-cau-chuyen",
            name: "cauchuyen",
            component: () => import("../views/HOMEPAGE/CauChuyen/ListStories"),
          },
          {
            path: "/danh-sach-cau-chuyen/them-moi/:id?",
            name: "themmoistory",
            component: () => import("../views/HOMEPAGE/CauChuyen/AddStories"),
          },
        ],
      },

      {
        path: "/home-page-blogs-cms",
        name: "blog",
        component: Blogs,
        children: [
          { path: "/home-page-blogs-cms", redirect: "/danh-sach-blog" },
          {
            path: "/danh-sach-blog",
            name: "list-blog",
            component: () => import("../views/HOMEPAGE/QuanLyBlog/ListBlogs"),
          },
          {
            path: "/blog/them-moi/:id?",
            name: "themmoiblog",
            component: () => import("../views/HOMEPAGE/QuanLyBlog/AddBlogs"),
          },
        ],
      },

      {
        path: "/home-page-courses-cms",
        name: "CoursesHomePage",
        component: CoursesHomePage,
        children: [
          {
            path: "/home-page-courses-cms",
            redirect: "/danh-sach-khoa-hoc-home",
          },
          {
            path: "/danh-sach-khoa-hoc-home",
            name: "list-course",
            component: () =>
              import("../views/HOMEPAGE/QuanLyKhoaHoc/ListCourseHome"),
          },
          {
            path: "/danh-sach-khoa-hoc-home/them-moi/:id?",
            name: "add-course",
            component: () =>
              import("../views/HOMEPAGE/QuanLyKhoaHoc/AddCourseHome"),
          },
        ],
      },

      {
        path: "/home-page-library-files-cms",
        name: "lirary",
        component: Library,
        children: [
          {
            path: "/home-page-library-files-cms",
            redirect: "/danh-sach-thu-vien",
          },
          {
            path: "/danh-sach-thu-vien",
            name: "danhsachthuvien",
            component: () =>
              import("../views/HOMEPAGE/QuanLyThuVien/ListLibrary"),
          },
          {
            path: "/danh-sach-thu-vien/them-moi/:id?",
            name: "themoithuvien",
            component: () =>
              import("../views/HOMEPAGE/QuanLyThuVien/AddLibrarys"),
          },
        ],
      },
      {
        path: "/home-page-opinions-cms",
        name: "opinions",
        component: Opinions,
        children: [
          { path: "/home-page-opinions-cms", redirect: "/danh-sach-y-kien" },
          {
            path: "/danh-sach-y-kien",
            name: "list-opinion",
            component: () =>
              import("../views/HOMEPAGE/QuanLyYKien/ListOpinions"),
          },
          {
            path: "/danh-sach-y-kien/them-moi/:id?",
            name: "them-moi-opinions",
            component: () =>
              import("../views/HOMEPAGE/QuanLyYKien/AddOpinions"),
          },
        ],
      },

      {
        path: "/home-page-subscribed-email-cms",
        name: "SubscribedEmails",
        component: SubscribedEmails,
        children: [
          {
            path: "/home-page-subscribed-email-cms",
            redirect: "/danh-sach-email",
          },
          {
            path: "/danh-sach-email",
            name: "listEmail",
            component: () =>
              import("../views/HOMEPAGE/SubscribedEmails/ListEmails"),
          },
          {
            path: "/danh-sach-email/them-moi/:id?",
            name: "them-moi-lstemail",
            component: () =>
              import("../views/HOMEPAGE/SubscribedEmails/AddListEmail"),
          },
        ],
      },

      {
        path: "/home-page-recruitments-cms",
        name: "Recruitments",
        component: Recruitments,
        children: [
          {
            path: "/home-page-recruitments-cms",
            redirect: "/danh-sach-tuyen-dung",
          },
          {
            path: "/danh-sach-tuyen-dung",
            name: "listTuyenDung",
            component: () =>
              import("../views/HOMEPAGE/TuyenDung/ListRecruitment"),
          },
          {
            path: "/danh-sach-tuyen-dung/them-moi/:id?",
            name: "them-moi-tuyen-dung",
            component: () =>
              import("../views/HOMEPAGE/TuyenDung/AddRecruitment"),
          },
        ],
      },

      { path: "/tai-lieu-learn-api", name: "getAPIDOC", component: BaoCaoAPI },
    ],
  },

  // GET AUTH
  { path: "/getauth", name: "getauth", component: Auth },
  { path: "/login", name: "login", component: Auth },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
