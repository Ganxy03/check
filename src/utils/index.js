// import FileSaver from "file-saver";
// import * as XLSX from "xlsx";
// import { Loading, MessageBox } from "element-ui";

// /**
//  * 将表数据导出到 Excel 文件。
//  * @param {Object} tableRef - 对表组件的引用
//  * @param {string} sheetName - Excel 工作表的名称
//  * @param {string} fileName - Excel 文件的名称。
//  */
// export function exportExcel(tableRef, sheetName, fileName) {
//   return new Promise(function (resolve, reject) {
//     MessageBox.confirm("导出 excel, 是否继续?", "提示", {
//       confirmButtonText: "确定",
//       cancelButtonText: "取消",
//       type: "warning",
//       closeOnClickModal: false,
//       callback: action => {
//         if (action == 'cancel') {
//           console.log('cancel')
//         }
//       }
//     })
//     // .catch(() => {
//     //   this.$message({
//     //     type: 'info',
//     //     message: '已取消删除'
//     //   });          
//     // })
//     .then(function () {
//       const loadingInstance = Loading.service({
//         lock: true,
//         text: "正在导出...",
//         spinner: "el-icon-loading",
//         background: "rgba(0, 0, 0, 0.7)",
//       });
//       const ws = XLSX.utils.table_to_sheet(tableRef.$el, {
//         raw: true,
//       });
//       const wb = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(wb, ws, sheetName);
//       const wbout = XLSX.write(wb, {
//         bookType: "xlsx",
//         bookSST: true,
//         type: "array",
//       });
//       try {
//         FileSaver.saveAs(
//           new Blob([wbout], { type: "application/octet-stream" }),
//           fileName
//         );
//         resolve();
//       } catch (e) {
//         if (typeof console !== "undefined") {
//           console.log(e, wbout);
//         }
//         MessageBox.alert("导出失败", "错误", {
//           type: "error",
//         });
//         reject(e);
//       } finally {
//         loadingInstance.close();
//       }
//     })
//     .catch(function () {
//       reject();
//     });
//   });
// }

import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Loading, MessageBox } from "element-ui";
/**
 * 将表数据导出到 Excel 文件。
 * @param {Object} tableRef - 对表组件的引用
 * @param {string} sheetName - Excel 工作表的名称
 * @param {string} fileName - Excel 文件的名称。
 */
export function exportExcel(tableRef, sheetName, fileName) {
  // eslint-disable-next-line
  return new Promise(function (resolve, reject) {
    const loadingInstance = Loading.service({
      lock: true,
      text: "正在导出...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
    MessageBox.confirm("导出 excel, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      closeOnClickModal: false,
    })
      .then(action => {
        if (action === 'confirm') {
          const ws = XLSX.utils.table_to_sheet(tableRef.$el, {
            raw: true,
          });
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, sheetName);
          const wbout = XLSX.write(wb, {
            bookType: "xlsx",
            bookSST: true,
            type: "array",
          });
          FileSaver.saveAs(
            new Blob([wbout], { type: "application/octet-stream" }),
            fileName
          );
          resolve();
        } else {
          console.error("用户取消导出");
        }
      })
      .catch(err => {
        console.error("导出失败: ", err);
      })
      .finally(() => {
        loadingInstance.close();
      });
  });
}