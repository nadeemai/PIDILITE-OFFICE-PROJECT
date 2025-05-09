UPDATE DATA 1 

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Text",
    "sap/ui/model/json/JSONModel",
    "sap/m/ObjectStatus",
    "sap/ui/core/Item"
], function (Controller, MessageBox, MessageToast, Dialog, Button, Text, JSONModel, ObjectStatus, Item) {
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
                        ID: "001",
                        createdBy: "Ankit",
                        createdOn: "7-APR-2025",
                        status: "Pending",
                        modifiedOn: "7-APR-2025",
                        creatorComments: "Creator Comments",
                        referenceNo: "10211594",
                        level1: "Submitted",
                        level2: "-",
                        level3: "Approved",
                        division: "Division1",
                        dcnrForm: "20",
                        standardReason: "Nil",
                        salesGroup: "Group1",
                        dcnrTo: "10",
                        accessionStatus: "Oct 10-2022",
                        approver1: "Approver 1",
                        altApprover1: "Alternate Approver 1",
                        approver2: "Approver 2",
                        altApprover2: "Alternate Approver 2",
                        approver3: "Approver 3",
                        altApprover3: "Alternate Approver 3",
                        accountAdmin: "Administration",
                        altAccountAdmin: "Alternate Account Address",
                        activityAction: "Created",
                        activitySection: "",
                        activityDate: "",
                        updatedTime: "",
                        preferredKey: "",
                        changes: "",
                        approver1Comments: "Looks good",
                        altApprover1Comments: "",
                        approver2Comments: "",
                        altApprover2Comments: "",
                        approver3Comments: "Approved",
                        altApprover3Comments: ""
                    },
                    {
                        ID: "2",
                        createdBy: "Nadeem",
                        createdOn: "7-APR-2025",
                        status: "Rejected",
                        modifiedOn: "7-APR-2025",
                        creatorComments: "Creator Comments",
                        referenceNo: "10211594",
                        level1: "Submitted",
                        level2: "-",
                        level3: "Approved",
                        division: "Division1",
                        dcnrForm: "20",
                        standardReason: "Nil",
                        salesGroup: "Group1",
                        dcnrTo: "10",
                        accessionStatus: "Oct 10-2022",
                        approver1: "Approver 1",
                        altApprover1: "Alternate Approver 1",
                        approver2: "Approver 2",
                        altApprover2: "Alternate Approver 2",
                        approver3: "Approver 3",
                        altApprover3: "Alternate Approver 3",
                        accountAdmin: "Administration",
                        altAccountAdmin: "Alternate Account Address",
                        activityAction: "Created",
                        activitySection: "",
                        activityDate: "",
                        updatedTime: "",
                        preferredKey: "",
                        changes: "",
                        approver1Comments: "Looks good",
                        altApprover1Comments: "",
                        approver2Comments: "",
                        altApprover2Comments: "",
                        approver3Comments: "Approved",
                        altApprover3Comments: ""
                    },
                    {
                        ID: "3",
                        createdBy: "Ishan",
                        createdOn: "7-APR-2025",
                        status: "Approved",
                        modifiedOn: "7-APR-2025",
                        creatorComments: "Creator Comments",
                        referenceNo: "10211594",
                        level1: "Submitted",
                        level2: "-",
                        level3: "Approved",
                        division: "Division1",
                        dcnrForm: "20",
                        standardReason: "Nil",
                        salesGroup: "Group1",
                        dcnrTo: "10",
                        accessionStatus: "Oct 10-2022",
                        approver1: "Approver 1",
                        altApprover1: "Alternate Approver 1",
                        approver2: "Approver 2",
                        altApprover2: "Alternate Approver 2",
                        approver3: "Approver 3",
                        altApprover3: "Alternate Approver 3",
                        accountAdmin: "Administration",
                        altAccountAdmin: "Alternate Account Address",
                        activityAction: "Created",
                        activitySection: "",
                        activityDate: "",
                        updatedTime: "",
                        preferredKey: "",
                        changes: "",
                        approver1Comments: "Looks good",
                        altApprover1Comments: "",
                        approver2Comments: "",
                        altApprover2Comments: "",
                        approver3Comments: "Approved",
                        altApprover3Comments: ""
                    },
                    {
                        ID: "4",
                        createdBy: "Subham",
                        createdOn: "7-APR-2025",
                        status: "Approved",
                        modifiedOn: "7-APR-2025",
                        creatorComments: "Creator Comments",
                        referenceNo: "10211594",
                        level1: "Submitted",
                        level2: "-",
                        level3: "Approved",
                        division: "Division1",
                        dcnrForm: "20",
                        standardReason: "Nil",
                        salesGroup: "Group1",
                        dcnrTo: "10",
                        accessionStatus: "Oct 10-2022",
                        approver1: "Approver 1",
                        altApprover1: "Alternate Approver 1",
                        approver2: "Approver 2",
                        altApprover2: "Alternate Approver 2",
                        approver3: "Approver 3",
                        altApprover3: "Alternate Approver 3",
                        accountAdmin: "Administration",
                        altAccountAdmin: "Alternate Account Address",
                        activityAction: "Created",
                        activitySection: "",
                        activityDate: "",
                        updatedTime: "",
                        preferredKey: "",
                        changes: "",
                        approver1Comments: "Looks good",
                        altApprover1Comments: "",
                        approver2Comments: "",
                        altApprover2Comments: "",
                        approver3Comments: "Approved",
                        altApprover3Comments: ""
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
                originalRequests: [],
                selectedRequest: {},
                approvers: [
                    { role: "Approver 1", email: "ayush.jha@sumo", altRole: "Alternate Approver 1", altEmail: "tanl.singh@sumo" },
                    { role: "Approver 2", email: "ayushi.khanolkar@sumo", altRole: "Alternate Approver 2", altEmail: "aakib.mohd@sumo" },
                    { role: "Approver 3", email: "yugal.kishore@sumo", altRole: "Alternate Approver 3", altEmail: "sumit.jhaldiyal@sumo" }
                ]
            };
            
            oData.originalRequests = [...oData.requests];
            const oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
        },

        onItemView: function (oEvent) {
            const oContext = oEvent.getSource().getParent().getBindingContext();
            const oData = oContext.getObject();
            this.getView().getModel().setProperty("/selectedRequest", oData);
            this.byId("priceRequisitionDialog").open();
        },

        onSavePriceReq: function() {
            MessageToast.show("Price requisition saved successfully");
        },

        onPrintPriceReq: function() {
            MessageToast.show("Printing price requisition...");
        },

        onClosePriceReq: function() {
            this.byId("priceRequisitionDialog").close();
        },

        onEditPriceReq: function() {
            const oDialog = this.byId("priceRequisitionDialog");
            const bEditable = !oDialog.getContent()[0].getContent()[1].getEditable();
            oDialog.getContent()[0].getContent()[1].setEditable(bEditable);
            MessageToast.show(bEditable ? "Edit mode activated" : "Edit mode deactivated");
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
            
            if (oModel.getProperty("/requests").length > 0) {
                oModel.setProperty("/selectedRequest", oModel.getProperty("/requests")[0]);
                this.byId("priceRequisitionDialog").open();
            }
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
            this.getView().getModel().setProperty("/selectedRequest", oData);
            this.byId("priceRequisitionDialog").open();
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



sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Text",
    "sap/ui/model/json/JSONModel",
    "sap/m/ObjectStatus",
    "sap/ui/core/Item"
], function (Controller, MessageBox, MessageToast, Dialog, Button, Text, JSONModel, ObjectStatus, Item) {
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
                        ID: "001",
                        createdBy: "Ankit",
                        createdOn: "10-04-2025",
                        status: "Pending",
                        modifiedOn: "10-04-2025",
                        creatorComments: "Creator Comments",
                        referenceNo: "10211594",
                        level1: "Submitted",
                        level2: "-",
                        level3: "Approved",
                        division: "Division1",
                        dcnrForm: "20",
                        standardReason: "Nil",
                        salesGroup: "Group1",
                        dcnrTo: "10",
                        approver1Comments: "Looks good",
                        altApprover1Comments: "",
                        approver2Comments: "",
                        altApprover2Comments: "",
                        approver3Comments: "Approved",
                        altApprover3Comments: ""
                    },
                    {
                        ID: "002",
                        createdBy: "Son Goku",
                        createdOn: "10-04-2025",
                        status: "Rejected",
                        modifiedOn: "10-04-2025",
                        creatorComments: "Creator Comments",
                        referenceNo: "10211592",
                        level1: "Submitted",
                        level2: "Rejected",
                        level3: "-",
                        division: "Division2",
                        dcnrForm: "30",
                        standardReason: "Other",
                        salesGroup: "Group2",
                        dcnrTo: "15",
                        approver1Comments: "Initial review",
                        altApprover1Comments: "",
                        approver2Comments: "Rejected due to pricing",
                        altApprover2Comments: "",
                        approver3Comments: "",
                        altApprover3Comments: ""
                    },
                    {
                        ID: "003",
                        createdBy: "Nadeem",
                        createdOn: "10-04-2025",
                        status: "Rejected",
                        modifiedOn: "10-04-2025",
                        creatorComments: "Creator Comments",
                        referenceNo: "10211592",
                        level1: "Submitted",
                        level2: "Rejected",
                        level3: "-",
                        division: "Division1",
                        dcnrForm: "20",
                        standardReason: "Nil",
                        salesGroup: "Group1",
                        dcnrTo: "10",
                        approver1Comments: "Approved",
                        altApprover1Comments: "",
                        approver2Comments: "Rejected - incorrect data",
                        altApprover2Comments: "",
                        approver3Comments: "",
                        altApprover3Comments: ""
                    },
                    {
                        ID: "004",
                        createdBy: "Ishan",
                        createdOn: "10-04-2025",
                        status: "Approved",
                        modifiedOn: "10-04-2025",
                        creatorComments: "Creator Comments",
                        referenceNo: "10211590",
                        level1: "Submitted",
                        level2: "Submitted",
                        level3: "Approved",
                        division: "Division2",
                        dcnrForm: "30",
                        standardReason: "Other",
                        salesGroup: "Group2",
                        dcnrTo: "15",
                        approver1Comments: "Approved",
                        altApprover1Comments: "",
                        approver2Comments: "Approved",
                        altApprover2Comments: "",
                        approver3Comments: "Final approval",
                        altApprover3Comments: ""
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
                originalRequests: [],
                selectedRequest: {},
                approvers: [
                    { role: "Approver 1", email: "ayush.jha@sumo", altRole: "Alternate Approver 1", altEmail: "tanl.singh@sumo" },
                    { role: "Approver 2", email: "ayushi.khanolkar@sumo", altRole: "Alternate Approver 2", altEmail: "aakib.mohd@sumo" },
                    { role: "Approver 3", email: "yugal.kishore@sumo", altRole: "Alternate Approver 3", altEmail: "sumit.jhaldiyal@sumo" }
                ]
            };
            
            oData.originalRequests = [...oData.requests];
            const oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
        },

        onItemView: function (oEvent) {
            const oContext = oEvent.getSource().getParent().getBindingContext();
            const oData = oContext.getObject();
            this.getView().getModel().setProperty("/selectedRequest", oData);
            this.byId("priceRequisitionDialog").open();
        },

        onSavePriceReq: function() {
            MessageToast.show("Price requisition saved successfully");
        },

        onPrintPriceReq: function() {
            MessageToast.show("Printing price requisition...");
        },

        onClosePriceReq: function() {
            this.byId("priceRequisitionDialog").close();
        },

        onEditPriceReq: function() {
            const oDialog = this.byId("priceRequisitionDialog");
            const bEditable = !oDialog.getContent()[0].getContent()[1].getEditable();
            
            oDialog.getContent()[0].getContent()[1].setEditable(bEditable);
            oDialog.getContent()[0].getContent()[2].setEditable(bEditable);
            
            MessageToast.show(bEditable ? "Edit mode activated" : "Edit mode deactivated");
        },

        showAppStatus: function() {
            this.byId("appStatusDialog").open();
        },

        onCloseAppStatus: function() {
            this.byId("appStatusDialog").close();
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
            
            // Set default selected request and open Price Requisition dialog
            if (oModel.getProperty("/requests").length > 0) {
                oModel.setProperty("/selectedRequest", oModel.getProperty("/requests")[0]);
                this.byId("priceRequisitionDialog").open();
            }
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
            this.getView().getModel().setProperty("/selectedRequest", oData);
            this.byId("priceRequisitionDialog").open();
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
