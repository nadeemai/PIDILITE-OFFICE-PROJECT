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
                pendingCount: 5,
                approvedCount: 1,
                rejectedCount: 1,
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
                        createdBy: "Ankit",
                        createdOn: "7-APR-2025",
                        status: "Pending",
                        modifiedOn: "7-APR-2025",
                        creatorComments: "Creator Comments",
                        referenceNo: "10211594",
                        level1: "Submitted",
                        level2: "Pending"
                    },
                    {
                        createdBy: "Ankit",
                        createdOn: "7-APR-2025",
                        status: "Pending",
                        modifiedOn: "7-APR-2025",
                        creatorComments: "Creator Comments",
                        referenceNo: "10211594",
                        level1: "Submitted",
                        level2: "Pending"
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
                originalRequests: [] // To store original data for reset
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
            let aFilteredRequests = [...oModel.getProperty("/originalRequests")];

            // Apply filters to match the image (e.g., no specific filter applied yet, showing all data)
            if (oFilter.type) aFilteredRequests = aFilteredRequests.filter(item => item.status === oFilter.type);
            if (oFilter.createdBy) aFilteredRequests = aFilteredRequests.filter(item => item.createdBy === oFilter.createdBy);
            if (oFilter.createdOn) aFilteredRequests = aFilteredRequests.filter(item => item.createdOn === oFilter.createdOn);
            if (oFilter.status) aFilteredRequests = aFilteredRequests.filter(item => item.status === oFilter.status);
            if (oFilter.referenceNo) aFilteredRequests = aFilteredRequests.filter(item => item.referenceNo === oFilter.referenceNo);

            // Update the model with filtered data
            oModel.setProperty("/requests", aFilteredRequests);

            // Update tile counts based on filtered data
            oModel.setProperty("/pendingCount", aFilteredRequests.filter(item => item.status === "Pending").length);
            oModel.setProperty("/approvedCount", aFilteredRequests.filter(item => item.status === "Approved").length);
            oModel.setProperty("/rejectedCount", aFilteredRequests.filter(item => item.status === "Rejected").length);

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

        onFilterChange: function () {
            // Enable/Disable Apply button based on filter changes if needed
        },

        onCreatePress: function () {
            this.getView().byId("uploadDialog").open();
        },

        onFileChange: function(oEvent) {
            const oFileUploader = oEvent.getSource();
            const oFile = oFileUploader.oFileUpload.files[0];
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
            this.getView().byId("fileInput").clear();
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
