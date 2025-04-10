sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Text",
    "sap/ui/model/json/JSONModel",
    "sap/m/ObjectStatus"
], function (Controller, MessageBox, MessageToast, Dialog, Button, Text, JSONModel, ObjectStatus) {
    "use strict";

    return Controller.extend("com.tableentry.tablestructure.controller.Table_Entry", {
        onInit: function () {
            const oData = {
                pendingCount: 2,
                approvedCount: 14,
                rejectedCount: 14,
                attachmentCount: 0,
                requests: [
                    {
                        createdBy: "Ankit",
                        createdOn: "7-APR-2025",
                        status: "Pending",
                        modifiedOn: "7-APR-2025",
                        creatorComments: "Creator Comments",
                        referenceNo: "10211594",
                        level1: "Submitted",
                        level2: "-"
                    },
                    {
                        createdBy: "Nadeem",
                        createdOn: "7-APR-2025",
                        status: "Rejected",
                        modifiedOn: "7-APR-2025",
                        creatorComments: "Creator Comments",
                        referenceNo: "10211592",
                        level1: "Submitted",
                        level2: "Rejected"
                    },
                    {
                        createdBy: "Ishan",
                        createdOn: "7-APR-2025",
                        status: "Approved",
                        modifiedOn: "7-APR-2025",
                        creatorComments: "Creator Comments",
                        referenceNo: "10211590",
                        level1: "Submitted",
                        level2: "Submitted"
                    }
                ],
                filter: {
                    type: "",
                    createdBy: "",
                    createdOn: "",
                    status: "",
                    referenceNo: ""
                },
                attachments: [],
                originalRequests: []
            };
            // Store original requests
            oData.originalRequests = [...oData.requests];
            this.getView().setModel(new JSONModel(oData));
        },

        onItemView: function (oEvent) {
            const oContext = oEvent.getSource().getParent().getBindingContext();
            const oData = oContext.getObject();
            MessageBox.information(`Viewing details for ${oData.createdBy}\nStatus: ${oData.status}`);
        },

        onInfoPress: function () {
            MessageBox.information("Info button pressed.");
        },

        onFilterPress: function () {
            this.getView().byId("filterDialog").open();
        },

        onApplyFilter: function () {
            const oModel = this.getView().getModel();
            const oFilter = oModel.getProperty("/filter");
            const aAllRequests = oModel.getProperty("/originalRequests");
            
            let aFilteredRequests = [...aAllRequests];

            if (oFilter.type) aFilteredRequests = aFilteredRequests.filter(item => item.status === oFilter.type);
            if (oFilter.createdBy) aFilteredRequests = aFilteredRequests.filter(item => item.createdBy === oFilter.createdBy);
            if (oFilter.createdOn) aFilteredRequests = aFilteredRequests.filter(item => item.createdOn === oFilter.createdOn);
            if (oFilter.status) aFilteredRequests = aFilteredRequests.filter(item => item.status === oFilter.status);
            if (oFilter.referenceNo) aFilteredRequests = aFilteredRequests.filter(item => item.referenceNo === oFilter.referenceNo);

            oModel.setProperty("/requests", aFilteredRequests);
            this.getView().byId("filterDialog").close();
        },

        onCancelFilter: function () {
            const oModel = this.getView().getModel();
            oModel.setProperty("/requests", [...oModel.getProperty("/originalRequests")]);
            oModel.setProperty("/filter", {
                type: "",
                createdBy: "",
                createdOn: "",
                status: "",
                referenceNo: ""
            });
            this.getView().byId("filterDialog").close();
        },

        onCreatePress: function () {
            this.getView().byId("uploadDialog").open();
        },

        onFileChange: function(oEvent) {
            const oFile = oEvent.getParameter("files")[0];
            if (oFile) {
                this.getView().getModel().setProperty("/currentFile", oFile);
            }
        },

        onFileUpload: function() {
            const oModel = this.getView().getModel();
            const oFile = oModel.getProperty("/currentFile");
            
            if (!oFile) {
                MessageToast.show("Please select a file first");
                return;
            }
            
            const sFileName = oFile.name;
            const aAttachments = oModel.getProperty("/attachments") || [];
            
            aAttachments.push({
                fileName: sFileName,
                file: oFile
            });
            
            oModel.setProperty("/attachments", aAttachments);
            oModel.setProperty("/attachmentCount", aAttachments.length);
            oModel.setProperty("/currentFile", null);
            
            MessageToast.show("File uploaded successfully");
        },

        onFileDeleted: function(oEvent) {
            const sFileName = oEvent.getParameter("listItem").getTitle();
            const oModel = this.getView().getModel();
            let aAttachments = oModel.getProperty("/attachments");
            
            aAttachments = aAttachments.filter(item => item.fileName !== sFileName);
            oModel.setProperty("/attachments", aAttachments);
            oModel.setProperty("/attachmentCount", aAttachments.length);
        },

        onCloseUpload: function () {
            this.getView().byId("uploadDialog").close();
        },

        onItemPress: function (oEvent) {
            const oItem = oEvent.getParameter("listItem");
            const oData = oItem.getBindingContext().getObject();
            MessageBox.information(`Full details:\n\nCreated by: ${oData.createdBy}\nStatus: ${oData.status}`);
        }
    });
});
