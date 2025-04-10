sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/ui/unified/FileUploader",
    "sap/m/UploadCollectionParameter"
], function (Controller, JSONModel, MessageBox, MessageToast, Filter, FilterOperator, Sorter, FileUploader, UploadCollectionParameter) {
    "use strict";

    return Controller.extend("com.tableentry.tablestructure.controller.Table_Entry", {
        onInit: function () {
            const oData = {
              pendingCount: 2,
              approvedCount: 14,
              rejectedCount: 14,
              requests: [
                {
                  createdBy: "Ankit",
                  createdOn: "7-APR-2025",
                  status: "Pending",
                  modifiedOn: "7-APR-2025",
                  creatorComments: "Creator Comments",
                  referenceNo: "102115194",
                  level1: "Submitted",
                  level2: "-",
                  level3: "-"
                },
                {
                  createdBy: "Nadeem",
                  createdOn: "7-APR-2025",
                  status: "Rejected",
                  modifiedOn: "7-APR-2025",
                  creatorComments: "Creator Comments",
                  referenceNo: "102115192",
                  level1: "Submitted",
                  level2: "Rejected",
                  level3: "-"
                },
                {
                  createdBy: "Ishan",
                  createdOn: "7-APR-2025",
                  status: "Approved",
                  modifiedOn: "7-APR-2025",
                  creatorComments: "Creator Comments",
                  referenceNo: "102115190",
                  level1: "Submitted",
                  level2: "Submitted",
                  level3: "Approved"
                }
              ]
            };
            this.getView().setModel(new JSONModel(oData));
          },
      
          onItemView: function (oEvent) {
            const oContext = oEvent.getSource().getParent().getBindingContext();
            const oData = oContext.getObject();
            MessageBox.information(`Viewing details for ${oData.createdBy}\nStatus: ${oData.status}`);
          },
      
          onFilterPress: function () {
            MessageBox.information("Filter button pressed. You can implement SmartFilterBar or custom logic here.");
          },
      
          onCreatePress: function () {
            MessageBox.success("Create button pressed.");
          },
      
          onInfoPress: function () {
            MessageBox.information("Info button pressed.");
          },
      
          onItemPress: function (oEvent) {
            const oItem = oEvent.getParameter("listItem");
            const oData = oItem.getBindingContext().getObject();
            MessageBox.information(`Full details:\n\nCreated by: ${oData.createdBy}\nStatus: ${oData.status}`);
          }
    });
});
