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
                approvedCount: 5,
                rejectedCount: 5,
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
                        level2: "-",
                        level3: "Approved"
                    },
                    {
                        createdBy: "Tuhin",
                        createdOn: "7-APR-2025",
                        status: "Rejected",
                        modifiedOn: "7-APR-2025",
                        creatorComments: "Creator Comments",
                        referenceNo: "10211592",
                        level1: "Submitted",
                        level2: "Rejected",
                        level3: "-"
                    },
                    {
                        createdBy: "Nadeem",
                        createdOn: "7-APR-2025",
                        status: "Rejected",
                        modifiedOn: "7-APR-2025",
                        creatorComments: "Creator Comments",
                        referenceNo: "10211592",
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
                        referenceNo: "10211590",
                        level1: "Submitted",
                        level2: "Submitted",
                        level3: "Approved"
                    }
                ],
                filter: {
                    type: "",
                    createdBy: "",
                    createdOn: "",
                    status: "",
                    referenceNo: ""
                },
                uploads: [],
                originalRequests: []
            };
            
            oData.originalRequests = [...oData.requests];
            this.getView().setModel(new JSONModel(oData));
        },

        onItemView: function (oEvent) {
            const oContext = oEvent.getSource().getParent().getBindingContext();
            const oData = oContext.getObject();
            MessageBox.information(`Viewing details for ${oData.createdBy}\nStatus: ${oData.status}`);
        },

        onInfoPress: function () {
            MessageBox.information("This is the Approval Portal Dashboard. Here you can view, filter, and manage all approval requests.");
        },

        onFilterPress: function () {
            this.getView().byId("filterDialog").open();
        },

        onFilterChange: function (oEvent) {
            const oModel = this.getView().getModel();
            const oFilter = oModel.getProperty("/filter");
            const sProperty = oEvent.getSource().getBinding("selectedKey").getPath().split("/")[2];
            oFilter[sProperty] = oEvent.getParameter("selectedItem").getKey();
            oModel.setProperty("/filter", oFilter);
            // Filter will be applied only on "Apply" click, not here
        },

        onApplyFilter: function () {
            const oModel = this.getView().getModel();
            const oFilter = oModel.getProperty("/filter");
            const aAllRequests = oModel.getProperty("/originalRequests");
            
            let aFilteredRequests = [...aAllRequests];

            if (oFilter.type && oFilter.type !== "") aFilteredRequests = aFilteredRequests.filter(item => item.status === oFilter.type);
            if (oFilter.createdBy && oFilter.createdBy !== "") aFilteredRequests = aFilteredRequests.filter(item => item.createdBy === oFilter.createdBy);
            if (oFilter.createdOn && oFilter.createdOn !== "") aFilteredRequests = aFilteredRequests.filter(item => item.createdOn === oFilter.createdOn);
            if (oFilter.status && oFilter.status !== "") aFilteredRequests = aFilteredRequests.filter(item => item.status === oFilter.status);
            if (oFilter.referenceNo && oFilter.referenceNo !== "") aFilteredRequests = aFilteredRequests.filter(item => item.referenceNo === oFilter.referenceNo);

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

        handleValueChange: function(oEvent) {
            const sFileName = oEvent.getParameter("newValue");
            if (sFileName) {
                this.getView().getModel().setProperty("/currentFileName", sFileName);
            }
        },

        handleUploadPress: function() {
            const oFileUploader = this.getView().byId("fileUploader");
            const oFile = oFileUploader.getDomRef().querySelector("input[type='file']").files[0];
            
            if (!oFile) {
                MessageToast.show("Please select a file first");
                return;
            }
            
            const oModel = this.getView().getModel();
            const aUploads = oModel.getProperty("/uploads") || [];
            
            const sFileName = oFile.name;
            const sFileType = sFileName.split('.').pop().toLowerCase();
            const sFileSize = this.formatFileSize(oFile.size);
            
            const sFileUrl = URL.createObjectURL(oFile);
            
            aUploads.unshift({
                fileName: sFileName,
                fileType: sFileType,
                fileSize: sFileSize,
                fileUrl: sFileUrl,
                file: oFile
            });
            
            oModel.setProperty("/uploads", aUploads);
            oModel.setProperty("/attachmentCount", aUploads.length);
            
            oFileUploader.setValue("");
            MessageToast.show("File uploaded successfully");
        },

        formatFileSize: function(iBytes) {
            if (iBytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(iBytes) / Math.log(k));
            return parseFloat((iBytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },

        handleUploadComplete: function(oEvent) {
            const sResponse = oEvent.getParameter("response");
            if (sResponse) {
                MessageToast.show("Upload completed: " + sResponse);
            }
        },

        handleTypeMissmatch: function(oEvent) {
            MessageToast.show("File type not allowed. Please upload PDF, JPG, PNG, DOC, DOCX, XLS, or XLSX files.");
        },

        onUploadDelete: function(oEvent) {
            const sFileName = oEvent.getParameter("listItem").getTitle();
            const oModel = this.getView().getModel();
            let aUploads = oModel.getProperty("/uploads");
            
            aUploads = aUploads.filter(item => item.fileName !== sFileName);
            oModel.setProperty("/uploads", aUploads);
            oModel.setProperty("/attachmentCount", aUploads.length);
            MessageToast.show(`File ${sFileName} deleted`);
        },

        onCloseUpload: function () {
            this.getView().byId("uploadDialog").close();
        },

        onItemPress: function (oEvent) {
            const oItem = oEvent.getParameter("listItem");
            const oData = oItem.getBindingContext().getObject();
            MessageBox.information(`Full details:\n\nCreated by: ${oData.createdBy}\nStatus: ${oData.status}\nReference No: ${oData.referenceNo}`);
        },

        onAttachmentPress: function(oEvent) {
            const oItem = oEvent.getSource();
            const oContext = oItem.getBindingContext();
            const oFileData = oContext.getObject();
            
            if (oFileData.fileUrl) {
                window.open(oFileData.fileUrl, '_blank');
            }
        }
    });
});






UPDATE TABLE
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
                approvedCount: 5,
                rejectedCount: 5,
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
                        level2: "-",
                        level3: "Approved"
                    },
                    {
                        createdBy: "Nadeem",
                        createdOn: "7-APR-2025",
                        status: "Rejected",
                        modifiedOn: "7-APR-2025",
                        creatorComments: "Creator Comments",
                        referenceNo: "10211592",
                        level1: "Submitted",
                        level2: "Rejected",
                        level3:"-"
                    },
                    {
                        createdBy: "Nadeem",
                        createdOn: "7-APR-2025",
                        status: "Rejected",
                        modifiedOn: "7-APR-2025",
                        creatorComments: "Creator Comments",
                        referenceNo: "10211592",
                        level1: "Submitted",
                        level2: "Rejected",
                        level3:"-"
                    },
                    {
                        createdBy: "Ishan",
                        createdOn: "7-APR-2025",
                        status: "Approved",
                        modifiedOn: "7-APR-2025",
                        creatorComments: "Creator Comments",
                        referenceNo: "10211590",
                        level1: "Submitted",
                        level2: "Submitted",
                        level3: "Approved"
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
