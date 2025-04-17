
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Text",
    "sap/ui/model/json/JSONModel",
    "sap/m/ObjectStatus",
    "sap/ui/Device"
], function (Controller, MessageBox, MessageToast, Dialog, Button, Text, JSONModel, ObjectStatus, Device) {
    "use strict";

    return Controller.extend("com.tableentry.tablestructure.controller.Table_Entry", {
        onInit: function () {
            // Initialize model with sample data
            const oData = {
                pendingCount: 0,
                approvedCount: 0,
                rejectedCount: 0,
                attachmentCount: 0,
                editable: false,
                requests: [],
                filter: { createdBy: "", createdOn: "", status: "", referenceNo: "", approver1: "", approver2: "", approver3: "" },
                filterOptions: {
                    createdBy: [],
                    createdOn: [],
                    status: [],
                    referenceNo: [],
                    approver1: [],
                    approver2: [],
                    approver3: []
                },
                uploads: [],
                originalRequests: [],
                selectedRequest: {},
                device: Device
            };

            // Sample data
            oData.requests = [
                { 
                    ID: "1", 
                    createdBy: "Ankit", 
                    createdOn: "04/15/2025", 
                    status: "Pending", 
                    modifiedOn: "04/15/2025", 
                    creatorComments: "Initial request", 
                    referenceNo: "10211594", 
                    approver1: "ayush.jha@sumo", 
                    altApprover1: "tanu.singh@sumo", 
                    approver2: "ayushi.khanolkar@sumo", 
                    altApprover2: "aakib.mohd@sumo", 
                    approver3: "yugal.kishore@sumo", 
                    altApprover3: "sumit.jhaldiyal@sumo", 
                    division: "Division1", 
                    salesGroup: "Group1", 
                    dcnrForm: "20", 
                    dcnrTo: "10", 
                    standardReason: "Price adjustment", 
                    approver1Comments: "Looks good", 
                    altApprover1Comments: "", 
                    approver2Comments: "", 
                    altApprover2Comments: "", 
                    approver3Comments: "Pending", 
                    altApprover3Comments: "", 
                    accountAdmin: "admin@sumo", 
                    accountAdminComments: "", 
                    altAccountAdmin: "altadmin@sumo", 
                    altAccountAdminComments: "", 
                    activityAction: "Created", 
                    activitySection: "Info", 
                    activityDate: "04/15/2025", 
                    updatedTime: "10:00 AM", 
                    preferredKey: "PR001", 
                    changes: "Initial creation", 
                    uploads: [],
                    timelineItems: this.generateTimelineItems("Ankit", "04/15/2025", "Pending")
                },
                { 
                    ID: "2", 
                    createdBy: "Nadeem", 
                    createdOn: "04/14/2025", 
                    status: "Approved", 
                    modifiedOn: "04/15/2025", 
                    creatorComments: "Urgent approval needed", 
                    referenceNo: "10211595", 
                    approver1: "ayush.jha@sumo", 
                    altApprover1: "tanu.singh@sumo", 
                    approver2: "ayushi.khanolkar@sumo", 
                    altApprover2: "aakib.mohd@sumo", 
                    approver3: "yugal.kishore@sumo", 
                    altApprover3: "sumit.jhaldiyal@sumo", 
                    division: "Division2", 
                    salesGroup: "Group2", 
                    dcnrForm: "15", 
                    dcnrTo: "5", 
                    standardReason: "Market change", 
                    approver1Comments: "Approved", 
                    altApprover1Comments: "", 
                    approver2Comments: "Looks fine", 
                    altApprover2Comments: "", 
                    approver3Comments: "Approved", 
                    altApprover3Comments: "", 
                    accountAdmin: "admin@sumo", 
                    accountAdminComments: "Processed", 
                    altAccountAdmin: "altadmin@sumo", 
                    altAccountAdminComments: "", 
                    activityAction: "Approved", 
                    activitySection: "Approval", 
                    activityDate: "04/15/2025", 
                    updatedTime: "11:00 AM", 
                    preferredKey: "PR002", 
                    changes: "Status updated", 
                    uploads: [],
                    timelineItems: this.generateTimelineItems("Nadeem", "04/14/2025", "Approved")
                },
                { 
                    ID: "3", 
                    createdBy: "Ishan", 
                    createdOn: "04/13/2025", 
                    status: "Rejected", 
                    modifiedOn: "04/14/2025", 
                    creatorComments: "Review needed", 
                    referenceNo: "10211596", 
                    approver1: "ayush.jha@sumo", 
                    altApprover1: "tanu.singh@sumo", 
                    approver2: "ayushi.khanolkar@sumo", 
                    altApprover2: "aakib.mohd@sumo", 
                    approver3: "yugal.kishore@sumo", 
                    altApprover3: "sumit.jhaldiyal@sumo", 
                    division: "Division3", 
                    salesGroup: "Group3", 
                    dcnrForm: "25", 
                    dcnrTo: "15", 
                    standardReason: "Policy issue", 
                    approver1Comments: "Needs revision", 
                    altApprover1Comments: "", 
                    approver2Comments: "", 
                    altApprover2Comments: "", 
                    approver3Comments: "Rejected", 
                    altApprover3Comments: "", 
                    accountAdmin: "admin@sumo", 
                    accountAdminComments: "", 
                    altAccountAdmin: "altadmin@sumo", 
                    altAccountAdminComments: "", 
                    activityAction: "Rejected", 
                    activitySection: "Approval", 
                    activityDate: "04/14/2025", 
                    updatedTime: "09:00 AM", 
                    preferredKey: "PR003", 
                    changes: "Status updated", 
                    uploads: [],
                    timelineItems: this.generateTimelineItems("Ishan", "04/13/2025", "Rejected")
                }
            ];

            // Update counts
            oData.pendingCount = oData.requests.filter(r => r.status === "Pending").length;
            oData.approvedCount = oData.requests.filter(r => r.status === "Approved").length;
            oData.rejectedCount = oData.requests.filter(r => r.status === "Rejected").length;

            // Deep copy for original requests
            oData.originalRequests = JSON.parse(JSON.stringify(oData.requests));
            this._updateFilterOptions(oData);
            const oModel = new JSONModel(oData);
            this.getView().setModel(oModel);

            // Bind timeline items when dialog opens
            this.getView().byId("priceRequisitionDialog").attachAfterOpen(this._bindTimelineItems, this);
        },

        _updateFilterOptions: function(oData) {
            oData.filterOptions.createdBy = [...new Set(oData.originalRequests.map(item => item.createdBy))].map(key => ({ key, text: key }));
            oData.filterOptions.createdOn = [...new Set(oData.originalRequests.map(item => item.createdOn))].map(key => ({ key, text: key }));
            oData.filterOptions.status = [...new Set(oData.originalRequests.map(item => item.status))].map(key => ({ key, text: key }));
            oData.filterOptions.referenceNo = [...new Set(oData.originalRequests.map(item => item.referenceNo))].map(key => ({ key, text: key }));
            oData.filterOptions.approver1 = [...new Set(oData.originalRequests.map(item => item.approver1))].map(key => ({ key, text: key }));
            oData.filterOptions.approver2 = [...new Set(oData.originalRequests.map(item => item.approver2))].map(key => ({ key, text: key }));
            oData.filterOptions.approver3 = [...new Set(oData.originalRequests.map(item => item.approver3))].map(key => ({ key, text: key }));
        },

        generateTimelineItems: function(createdBy, startDate, status) {
            const timelineItems = [
                {
                    Date: `Created on ${startDate}`,
                    Title: `Created by ${createdBy}`,
                    Text: "Request initiated",
                    UserName: createdBy,
                    Comment: "Initiated"
                },
                {
                    Date: startDate,
                    Title: "Approver 1",
                    Text: "ayush.jha@sumo",
                    UserName: "ayush.jha@sumo",
                    Comment: status === "Pending" ? "Pending" : status === "Approved" ? "Approved" : "Needs revision"
                },
                {
                    Date: startDate,
                    Title: "Alternate Approver 1",
                    Text: "tanu.singh@sumo",
                    UserName: "tanu.singh@sumo",
                    Comment: ""
                },
                {
                    Date: startDate,
                    Title: "Approver 2",
                    Text: "ayushi.khanolkar@sumo",
                    UserName: "ayushi.khanolkar@sumo",
                    Comment: status === "Approved" ? "Approved" : ""
                },
                {
                    Date: startDate,
                    Title: "Alternate Approver 2",
                    Text: "aakib.mohd@sumo",
                    UserName: "aakib.mohd@sumo",
                    Comment: ""
                },
                {
                    Date: startDate,
                    Title: "Approver 3",
                    Text: "yugal.kishore@sumo",
                    UserName: "yugal.kishore@sumo",
                    Comment: status
                },
                {
                    Date: startDate,
                    Title: "Alternate Approver 3",
                    Text: "sumit.jhaldiyal@sumo",
                    UserName: "sumit.jhaldiyal@sumo",
                    Comment: ""
                }
            ];
            return timelineItems;
        },

        _bindTimelineItems: function() {
            const oModel = this.getView().getModel();
            const oSelectedRequest = oModel.getProperty("/selectedRequest");
            if (oSelectedRequest && oSelectedRequest.timelineItems) {
                this.getView().byId("applicationTimeline").setModel(oModel);
            }
        },

        onTilePress: function(oEvent) {
            const sHeader = oEvent.getSource().getHeader();
            const oModel = this.getView().getModel();
            let aFilteredRequests = [...oModel.getProperty("/originalRequests")];
            if (sHeader === "Pending") {
                aFilteredRequests = aFilteredRequests.filter(item => item.status === "Pending");
            } else if (sHeader === "Approved") {
                aFilteredRequests = aFilteredRequests.filter(item => item.status === "Approved");
            } else if (sHeader === "Rejected") {
                aFilteredRequests = aFilteredRequests.filter(item => item.status === "Rejected");
            }
            oModel.setProperty("/requests", aFilteredRequests);
            MessageToast.show(`Filtered by ${sHeader} requests`);
        },

        onItemView: function(oEvent) {
            const oContext = oEvent.getSource().getParent().getBindingContext();
            const oData = JSON.parse(JSON.stringify(oContext.getObject()));
            this.getView().getModel().setProperty("/selectedRequest", oData);
            this.getView().byId("priceRequisitionDialog").open();
        },

        onItemPress: function(oEvent) {
            const oItem = oEvent.getParameter("listItem");
            const oData = JSON.parse(JSON.stringify(oItem.getBindingContext().getObject()));
            this.getView().getModel().setProperty("/selectedRequest", oData);
            this.getView().byId("priceRequisitionDialog").open();
        },

        onCreatePress: function() {
            const oModel = this.getView().getModel();
            oModel.setProperty("/uploads", []);
            oModel.setProperty("/attachmentCount", 0);
            this.getView().byId("uploadDialog").open();
        },

        onCreateRequestFromUpload: function() {
            const oModel = this.getView().getModel();
            const aUploads = oModel.getProperty("/uploads");
            const newRequest = {
                ID: `00${oModel.getProperty("/requests").length + 1}`,
                createdBy: "New User",
                createdOn: new Date().toLocaleDateString("en-US"),
                status: "Pending",
                modifiedOn: new Date().toLocaleDateString("en-US"),
                creatorComments: "",
                referenceNo: `102115${97 + oModel.getProperty("/requests").length}`,
                approver1: "ayush.jha@sumo",
                altApprover1: "tanu.singh@sumo",
                approver2: "ayushi.khanolkar@sumo",
                altApprover2: "aakib.mohd@sumo",
                approver3: "yugal.kishore@sumo",
                altApprover3: "sumit.jhaldiyal@sumo",
                division: "",
                salesGroup: "",
                dcnrForm: "",
                dcnrTo: "",
                standardReason: "",
                approver1Comments: "",
                altApprover1Comments: "",
                approver2Comments: "",
                altApprover2Comments: "",
                approver3Comments: "",
                altApprover3Comments: "",
                accountAdmin: "admin@sumo",
                accountAdminComments: "",
                altAccountAdmin: "altadmin@sumo",
                altAccountAdminComments: "",
                activityAction: "Created",
                activitySection: "Info",
                activityDate: new Date().toLocaleDateString("en-US"),
                updatedTime: new Date().toLocaleTimeString("en-US"),
                preferredKey: `PR00${oModel.getProperty("/requests").length + 1}`,
                changes: "Initial creation",
                uploads: aUploads,
                timelineItems: this.generateTimelineItems("New User", new Date().toLocaleDateString("en-US"), "Pending")
            };

            oModel.setProperty("/selectedRequest", newRequest);
            oModel.setProperty("/editable", true);
            this.getView().byId("uploadDialog").close();
            this.getView().byId("priceRequisitionDialog").open();
        },

        onSavePriceReq: function() {
            const oModel = this.getView().getModel();
            const oSelectedRequest = oModel.getProperty("/selectedRequest");

            // Validate mandatory fields
            const aMandatoryFields = [
                { id: "createdByInput", path: "createdBy" },
                { id: "referenceNoInput", path: "referenceNo" },
                { id: "divisionInput", path: "division" },
                { id: "salesGroupInput", path: "salesGroup" },
                { id: "dcnrFromInput", path: "dcnrForm" },
                { id: "dcnrToInput", path: "dcnrTo" },
                { id: "standardReasonInput", path: "standardReason" },
                { id: "creatorCommentsInput", path: "creatorComments" }
            ];

            let bValid = true;
            aMandatoryFields.forEach(field => {
                const sValue = oSelectedRequest[field.path];
                if (!sValue) {
                    this.getView().byId(field.id).setValueState("Error").setValueStateText("This field is mandatory");
                    bValid = false;
                } else {
                    this.getView().byId(field.id).setValueState("None");
                }
            });

            if (!bValid) {
                MessageBox.error("Please fill all mandatory fields");
                return;
            }

            // Update requests
            const aRequests = oModel.getProperty("/requests");
            const iIndex = aRequests.findIndex(req => req.ID === oSelectedRequest.ID);
            if (iIndex >= 0) {
                aRequests[iIndex] = oSelectedRequest;
            } else {
                aRequests.push(oSelectedRequest);
            }

            oModel.setProperty("/requests", aRequests);
            oModel.setProperty("/originalRequests", JSON.parse(JSON.stringify(aRequests)));
            this._updateFilterOptions(oModel.getData());
            oModel.setProperty("/pendingCount", aRequests.filter(r => r.status === "Pending").length);
            oModel.setProperty("/approvedCount", aRequests.filter(r => r.status === "Approved").length);
            oModel.setProperty("/rejectedCount", aRequests.filter(r => r.status === "Rejected").length);

            oModel.setProperty("/editable", false);
            MessageToast.show("Price requisition saved successfully");
            this.getView().byId("priceRequisitionDialog").close();
        },

        onSubmitPriceReq: function() {
            const oModel = this.getView().getModel();
            const oSelectedRequest = oModel.getProperty("/selectedRequest");

            // Validate mandatory fields
            const aMandatoryFields = [
                { id: "createdByInput", path: "createdBy" },
                { id: "referenceNoInput", path: "referenceNo" },
                { id: "divisionInput", path: "division" },
                { id: "salesGroupInput", path: "salesGroup" },
                { id: "dcnrFromInput", path: "dcnrForm" },
                { id: "dcnrToInput", path: "dcnrTo" },
                { id: "standardReasonInput", path: "standardReason" },
                { id: "creatorCommentsInput", path: "creatorComments" }
            ];

            let bValid = true;
            aMandatoryFields.forEach(field => {
                const sValue = oSelectedRequest[field.path];
                if (!sValue) {
                    this.getView().byId(field.id).setValueState("Error").setValueStateText("This field is mandatory");
                    bValid = false;
                } else {
                    this.getView().byId(field.id).setValueState("None");
                }
            });

            if (!bValid) {
                MessageBox.error("Please fill all mandatory fields");
                return;
            }

            // Update status and timeline
            oSelectedRequest.status = "Pending";
            oSelectedRequest.timelineItems = this.generateTimelineItems(
                oSelectedRequest.createdBy,
                oSelectedRequest.createdOn,
                "Pending"
            );

            // Update requests
            const aRequests = oModel.getProperty("/requests");
            const iIndex = aRequests.findIndex(req => req.ID === oSelectedRequest.ID);
            if (iIndex >= 0) {
                aRequests[iIndex] = oSelectedRequest;
            } else {
                aRequests.push(oSelectedRequest);
            }

            oModel.setProperty("/requests", aRequests);
            oModel.setProperty("/originalRequests", JSON.parse(JSON.stringify(aRequests)));
            this._updateFilterOptions(oModel.getData());
            oModel.setProperty("/pendingCount", aRequests.filter(r => r.status === "Pending").length);
            oModel.setProperty("/approvedCount", aRequests.filter(r => r.status === "Approved").length);
            oModel.setProperty("/rejectedCount", aRequests.filter(r => r.status === "Rejected").length);

            oModel.setProperty("/editable", false);
            MessageToast.show("Price requisition submitted successfully");
            this.getView().byId("priceRequisitionDialog").close();
        },

        onPrintPriceReq: function() {
            const oSelectedRequest = this.getView().getModel().getProperty("/selectedRequest");
            const sContent = `
                Price Requisition: ${oSelectedRequest.referenceNo}
                Created By: ${oSelectedRequest.createdBy}
                Created On: ${oSelectedRequest.createdOn}
                Status: ${oSelectedRequest.status}
                Division: ${oSelectedRequest.division}
                Sales Group: ${oSelectedRequest.salesGroup}
                DCNR% From: ${oSelectedRequest.dcnrForm}
                DCNR% To: ${oSelectedRequest.dcnrTo}
                Standard Reason: ${oSelectedRequest.standardReason}
                Creator Comments: ${oSelectedRequest.creatorComments}
                Approver 1: ${oSelectedRequest.approver1}
                Approver 2: ${oSelectedRequest.approver2}
                Approver 3: ${oSelectedRequest.approver3}
            `;
            const oPrintWindow = window.open("", "_blank");
            oPrintWindow.document.write(`<pre>${sContent}</pre>`);
            oPrintWindow.document.close();
            oPrintWindow.print();
            MessageToast.show("Printing price requisition...");
        },

        onClosePriceReq: function() {
            const oModel = this.getView().getModel();
            oModel.setProperty("/editable", false);
            this.getView().byId("priceRequisitionDialog").close();
        },

        onEditPriceReq: function() {
            const oModel = this.getView().getModel();
            const bEditable = !oModel.getProperty("/editable");
            oModel.setProperty("/editable", bEditable);

            // Update editability of form fields
            const oDialog = this.getView().byId("priceRequisitionDialog");
            const oIconTabBar = oDialog.getContent()[0].getContent()[1];
            oIconTabBar.getItems().forEach(item => {
                const oContent = item.getContent()[0];
                if (oContent instanceof sap.ui.layout.form.SimpleForm) {
                    oContent.getContent().forEach(control => {
                        if (control instanceof sap.m.Input || control instanceof sap.m.TextArea) {
                            control.setEditable(bEditable);
                        }
                    });
                } else if (oContent instanceof sap.m.Panel && oContent.getContent()[0] instanceof sap.ui.layout.form.SimpleForm) {
                    oContent.getContent()[0].getContent().forEach(control => {
                        if (control instanceof sap.m.Input || control instanceof sap.m.TextArea) {
                            control.setEditable(bEditable);
                        }
                    });
                }
            });

            MessageToast.show(bEditable ? "Edit mode activated" : "Edit mode deactivated");
        },

        onTabSelect: function(oEvent) {
            const sKey = oEvent.getParameter("key");
            if (sKey === "applicationStatus") {
                this._bindTimelineItems();
            }
            MessageToast.show(`Selected tab: ${sKey}`);
        },

        onInfoPress: function() {
            MessageBox.information("This is the Approval Portal Dashboard. Here you can view, filter, and manage all approval requests.");
        },

        onFilterPress: function() {
            this.getView().byId("filterDialog").open();
        },

        onFilterChange: function(oEvent) {
            const oModel = this.getView().getModel();
            const oFilter = oModel.getProperty("/filter");
            const sProperty = oEvent.getSource().getBinding("selectedKey").getPath().split("/")[2];
            oFilter[sProperty] = oEvent.getParameter("selectedItem") ? oEvent.getParameter("selectedItem").getKey() : "";
            oModel.setProperty("/filter", oFilter);
        },

        onApplyFilter: function() {
            const oModel = this.getView().getModel();
            const oFilter = oModel.getProperty("/filter");
            let aFilteredRequests = [...oModel.getProperty("/originalRequests")];

            if (oFilter.createdBy) aFilteredRequests = aFilteredRequests.filter(item => item.createdBy === oFilter.createdBy);
            if (oFilter.createdOn) aFilteredRequests = aFilteredRequests.filter(item => item.createdOn === oFilter.createdOn);
            if (oFilter.status) aFilteredRequests = aFilteredRequests.filter(item => item.status === oFilter.status);
            if (oFilter.referenceNo) aFilteredRequests = aFilteredRequests.filter(item => item.referenceNo === oFilter.referenceNo);
            if (oFilter.approver1) aFilteredRequests = aFilteredRequests.filter(item => item.approver1 === oFilter.approver1);
            if (oFilter.approver2) aFilteredRequests = aFilteredRequests.filter(item => item.approver2 === oFilter.approver2);
            if (oFilter.approver3) aFilteredRequests = aFilteredRequests.filter(item => item.approver3 === oFilter.approver3);

            oModel.setProperty("/requests", aFilteredRequests);
            MessageToast.show("Filters applied");
            this.getView().byId("filterDialog").close();
        },

        onCancelFilter: function() {
            const oModel = this.getView().getModel();
            oModel.setProperty("/requests", JSON.parse(JSON.stringify(oModel.getProperty("/originalRequests"))));
            oModel.setProperty("/filter", { createdBy: "", createdOn: "", status: "", referenceNo: "", approver1: "", approver2: "", approver3: "" });
            MessageToast.show("Filters reset");
            this.getView().byId("filterDialog").close();
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

            aUploads.push({
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
            if (iBytes === 0) return "0 Bytes";
            const k = 1024;
            const sizes = ["Bytes", "KB", "MB", "GB"];
            const i = Math.floor(Math.log(iBytes) / Math.log(k));
            return parseFloat((iBytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
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

            // Update selected request uploads if open
            const oSelectedRequest = oModel.getProperty("/selectedRequest");
            if (oSelectedRequest && oSelectedRequest.uploads) {
                oSelectedRequest.uploads = oSelectedRequest.uploads.filter(item => item.fileName !== sFileName);
                oModel.setProperty("/selectedRequest/uploads", oSelectedRequest.uploads);
            }

            MessageToast.show(`File ${sFileName} deleted`);
        },

        onCloseUpload: function() {
            this.getView().byId("uploadDialog").close();
        },

        onAttachmentPress: function(oEvent) {
            const oItem = oEvent.getSource();
            const oContext = oItem.getBindingContext();
            const oFileData = oContext.getObject();

            if (oFileData.fileUrl) {
                window.open(oFileData.fileUrl, "_blank");
            } else {
                MessageToast.show("File not available for preview");
            }
        }
    });
});








UPDATE DATA 3
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
                editable: false,
                requests: [
                    { 
                        ID: "001", 
                        createdBy: "Ankit", 
                        createdOn: "04/15/2025", 
                        status: "Pending", 
                        modifiedOn: "04/15/2025", 
                        creatorComments: "--", 
                        referenceNo: "10211594", 
                        approver1: "ayush.jha@sumo", 
                        altApprover1: "tanu.singh@sumo", 
                        approver2: "ayushi.khanolkar@sumo", 
                        altApprover2: "aakib.mohd@sumo", 
                        approver3: "yugal.kishore@sumo", 
                        altApprover3: "sumit.jhaldiyal@sumo", 
                        division: "Division1", 
                        salesGroup: "Group1", 
                        dcnrForm: "20", 
                        dcnrTo: "10", 
                        standardReason: "Nil", 
                        approver1Comments: "Looks good", 
                        altApprover1Comments: "", 
                        approver2Comments: "", 
                        altApprover2Comments: "", 
                        approver3Comments: "Approved", 
                        altApprover3Comments: "", 
                        activityAction: "Created", 
                        activitySection: "", 
                        activityDate: "04/15/2025", 
                        updatedTime: "", 
                        preferredKey: "", 
                        changes: "", 
                        timelineItems: this.generateTimelineItems("Ankit", "04/15/2025")
                    },
                    { 
                        ID: "002", 
                        createdBy: "Nadeem", 
                        createdOn: "04/15/2025", 
                        status: "Approved", 
                        modifiedOn: "04/15/2025", 
                        creatorComments: "--", 
                        referenceNo: "10211595", 
                        approver1: "ayush.jha@sumo", 
                        altApprover1: "tanu.singh@sumo", 
                        approver2: "ayushi.khanolkar@sumo", 
                        altApprover2: "aakib.mohd@sumo", 
                        approver3: "yugal.kishore@sumo", 
                        altApprover3: "sumit.jhaldiyal@sumo", 
                        division: "Division1", 
                        salesGroup: "Group1", 
                        dcnrForm: "20", 
                        dcnrTo: "10", 
                        standardReason: "Nil", 
                        approver1Comments: "Looks good", 
                        altApprover1Comments: "", 
                        approver2Comments: "", 
                        altApprover2Comments: "", 
                        approver3Comments: "Approved", 
                        altApprover3Comments: "", 
                        activityAction: "Created", 
                        activitySection: "", 
                        activityDate: "04/15/2025", 
                        updatedTime: "", 
                        preferredKey: "", 
                        changes: "", 
                        timelineItems: this.generateTimelineItems("Nadeem", "04/15/2025")
                    },
                    { 
                        ID: "003", 
                        createdBy: "Ishan", 
                        createdOn: "04/15/2025", 
                        status: "Rejected", 
                        modifiedOn: "04/15/2025", 
                        creatorComments: "--", 
                        referenceNo: "10211596", 
                        approver1: "ayush.jha@sumo", 
                        altApprover1: "tanu.singh@sumo", 
                        approver2: "ayushi.khanolkar@sumo", 
                        altApprover2: "aakib.mohd@sumo", 
                        approver3: "yugal.kishore@sumo", 
                        altApprover3: "sumit.jhaldiyal@sumo", 
                        division: "Division1", 
                        salesGroup: "Group1", 
                        dcnrForm: "20", 
                        dcnrTo: "10", 
                        standardReason: "Nil", 
                        approver1Comments: "Looks good", 
                        altApprover1Comments: "", 
                        approver2Comments: "", 
                        altApprover2Comments: "", 
                        approver3Comments: "Approved", 
                        altApprover3Comments: "", 
                        activityAction: "Created", 
                        activitySection: "", 
                        activityDate: "04/15/2025", 
                        updatedTime: "", 
                        preferredKey: "", 
                        changes: "", 
                        timelineItems: this.generateTimelineItems("Ishan", "04/15/2025")
                    }
                ],
                filter: { createdBy: "", createdOn: "", status: "", referenceNo: "", approver1: "", approver2: "", approver3: "" },
                filterOptions: {
                    createdBy: [],
                    createdOn: [],
                    status: [],
                    referenceNo: [],
                    approver1: [],
                    approver2: [],
                    approver3: []
                },
                uploads: [],
                originalRequests: [],
                selectedRequest: {}
            };

            oData.originalRequests = [...oData.requests];
            this._updateFilterOptions(oData);
            const oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
        },

        _updateFilterOptions: function(oData) {
            oData.filterOptions.createdBy = [...new Set(oData.originalRequests.map(item => item.createdBy))].map(key => ({ key, text: key }));
            oData.filterOptions.createdOn = [...new Set(oData.originalRequests.map(item => item.createdOn))].map(key => ({ key, text: key }));
            oData.filterOptions.status = [...new Set(oData.originalRequests.map(item => item.status))].map(key => ({ key, text: key }));
            oData.filterOptions.referenceNo = [...new Set(oData.originalRequests.map(item => item.referenceNo))].map(key => ({ key, text: key }));
            oData.filterOptions.approver1 = [...new Set(oData.originalRequests.map(item => item.approver1))].map(key => ({ key, text: key }));
            oData.filterOptions.approver2 = [...new Set(oData.originalRequests.map(item => item.approver2))].map(key => ({ key, text: key }));
            oData.filterOptions.approver3 = [...new Set(oData.originalRequests.map(item => item.approver3))].map(key => ({ key, text: key }));
        },

        generateTimelineItems: function(createdBy, startDate) {
            const timelineItems = [
                {
                    Date: "Created on " + startDate,
                    Title: "Created by " + createdBy,
                    Text: "--",
                    UserName: createdBy
                },
                {
                    Date: startDate,
                    Title: "Approver 1",
                    Text: "ayush.jha@sumo",
                    UserName: "ayush.jha@sumo",
                    Comment: "Looks good"
                },
                {
                    Date: startDate,
                    Title: "Alternate Approver 1",
                    Text: "tanu.singh@sumo",
                    UserName: "tanu.singh@sumo",
                    Comment: ""
                },
                {
                    Date: startDate,
                    Title: "Approver 2",
                    Text: "ayushi.khanolkar@sumo",
                    UserName: "ayushi.khanolkar@sumo",
                    Comment: ""
                },
                {
                    Date: startDate,
                    Title: "Alternate Approver 2",
                    Text: "aakib.mohd@sumo",
                    UserName: "aakib.mohd@sumo",
                    Comment: ""
                },
                {
                    Date: startDate,
                    Title: "Approver 3",
                    Text: "yugal.kishore@sumo",
                    UserName: "yugal.kishore@sumo",
                    Comment: "Approved"
                },
                {
                    Date: startDate,
                    Title: "Alternate Approver 3",
                    Text: "sumit.jhaldiyal@sumo",
                    UserName: "sumit.jhaldiyal@sumo",
                    Comment: ""
                }
            ];
            return timelineItems;
        },

        onItemView: function (oEvent) {
            const oContext = oEvent.getSource().getParent().getBindingContext();
            const oData = oContext.getObject();
            this.getView().getModel().setProperty("/selectedRequest", oData);
            this.byId("priceRequisitionDialog").open();
        },

        onSavePriceReq: function() {
            MessageToast.show("Price requisition saved successfully");
            this.byId("priceRequisitionDialog").close();
        },

        onPrintPriceReq: function() {
            MessageToast.show("Printing price requisition...");
        },

        onClosePriceReq: function() {
            this.byId("priceRequisitionDialog").close();
        },

        onEditPriceReq: function() {
            const oModel = this.getView().getModel();
            const bEditable = !oModel.getProperty("/editable");
            oModel.setProperty("/editable", bEditable);

            const oDialog = this.byId("priceRequisitionDialog");
            const oIconTabBar = oDialog.getContent()[0].getContent()[1];
            oIconTabBar.getItems().forEach(item => {
                const oContent = item.getContent()[0];
                if (oContent instanceof sap.ui.layout.form.SimpleForm) {
                    oContent.getContent().forEach(control => {
                        if (control instanceof sap.m.Input || control instanceof sap.m.TextArea) {
                            control.setEditable(bEditable);
                        }
                    });
                }
            });

            MessageToast.show(bEditable ? "Edit mode activated" : "Edit mode deactivated");
        },

        onIconTabBarSelect: function(oEvent) {
            const oModel = this.getView().getModel();
            const sKey = oEvent.getParameter("key");
            oModel.setProperty("/selectedTab", sKey);
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
            oFilter[sProperty] = oEvent.getParameter("selectedItem") ? oEvent.getParameter("selectedItem").getKey() : "";
            oModel.setProperty("/filter", oFilter);
            this.onApplyFilter();
        },

        onApplyFilter: function () {
            const oModel = this.getView().getModel();
            const oFilter = oModel.getProperty("/filter");
            let aFilteredRequests = [...oModel.getProperty("/originalRequests")];

            if (oFilter.createdBy) aFilteredRequests = aFilteredRequests.filter(item => item.createdBy === oFilter.createdBy);
            if (oFilter.createdOn) aFilteredRequests = aFilteredRequests.filter(item => item.createdOn === oFilter.createdOn);
            if (oFilter.status) aFilteredRequests = aFilteredRequests.filter(item => item.status === oFilter.status);
            if (oFilter.referenceNo) aFilteredRequests = aFilteredRequests.filter(item => item.referenceNo === oFilter.referenceNo);
            if (oFilter.approver1) aFilteredRequests = aFilteredRequests.filter(item => item.approver1 === oFilter.approver1);
            if (oFilter.approver2) aFilteredRequests = aFilteredRequests.filter(item => item.approver2 === oFilter.approver2);
            if (oFilter.approver3) aFilteredRequests = aFilteredRequests.filter(item => item.approver3 === oFilter.approver3);

            oModel.setProperty("/requests", aFilteredRequests);
            this.getView().byId("filterDialog").close();
        },

        onCancelFilter: function () {
            const oModel = this.getView().getModel();
            oModel.setProperty("/requests", [...oModel.getProperty("/originalRequests")]);
            oModel.setProperty("/filter", { createdBy: "", createdOn: "", status: "", referenceNo: "", approver1: "", approver2: "", approver3: "" });
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








UPDATE DATA 2
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
                editable: false,
                requests: [
                    { 
                        ID: "001", 
                        createdBy: "Ankit", 
                        createdOn: "04/15/2025", 
                        status: "Pending", 
                        modifiedOn: "04/15/2025", 
                        creatorComments: "--", 
                        referenceNo: "10211594", 
                        approver1: "ayush.jha@sumo", 
                        altApprover1: "tanu.singh@sumo", 
                        approver2: "ayushi.khanolkar@sumo", 
                        altApprover2: "aakib.mohd@sumo", 
                        approver3: "yugal.kishore@sumo", 
                        altApprover3: "sumit.jhaldiyal@sumo", 
                        division: "Division1", 
                        salesGroup: "Group1", 
                        dcnrForm: "20", 
                        dcnrTo: "10", 
                        standardReason: "Nil", 
                        approver1Comments: "Looks good", 
                        altApprover1Comments: "", 
                        approver2Comments: "", 
                        altApprover2Comments: "", 
                        approver3Comments: "Approved", 
                        altApprover3Comments: "", 
                        activityAction: "Created", 
                        activitySection: "", 
                        activityDate: "04/15/2025", 
                        updatedTime: "", 
                        preferredKey: "", 
                        changes: "", 
                        timelineItems: this.generateTimelineItems("Ankit", "04/15/2025")
                    },
                    { 
                        ID: "002", 
                        createdBy: "Nadeem", 
                        createdOn: "04/15/2025", 
                        status: "Approved", 
                        modifiedOn: "04/15/2025", 
                        creatorComments: "--", 
                        referenceNo: "10211595", 
                        approver1: "ayush.jha@sumo", 
                        altApprover1: "tanu.singh@sumo", 
                        approver2: "ayushi.khanolkar@sumo", 
                        altApprover2: "aakib.mohd@sumo", 
                        approver3: "yugal.kishore@sumo", 
                        altApprover3: "sumit.jhaldiyal@sumo", 
                        division: "Division1", 
                        salesGroup: "Group1", 
                        dcnrForm: "20", 
                        dcnrTo: "10", 
                        standardReason: "Nil", 
                        approver1Comments: "Looks good", 
                        altApprover1Comments: "", 
                        approver2Comments: "", 
                        altApprover2Comments: "", 
                        approver3Comments: "Approved", 
                        altApprover3Comments: "", 
                        activityAction: "Created", 
                        activitySection: "", 
                        activityDate: "04/15/2025", 
                        updatedTime: "", 
                        preferredKey: "", 
                        changes: "", 
                        timelineItems: this.generateTimelineItems("Nadeem", "04/15/2025")
                    },
                    { 
                        ID: "003", 
                        createdBy: "Ishan", 
                        createdOn: "04/15/2025", 
                        status: "Rejected", 
                        modifiedOn: "04/15/2025", 
                        creatorComments: "--", 
                        referenceNo: "10211596", 
                        approver1: "ayush.jha@sumo", 
                        altApprover1: "tanu.singh@sumo", 
                        approver2: "ayushi.khanolkar@sumo", 
                        altApprover2: "aakib.mohd@sumo", 
                        approver3: "yugal.kishore@sumo", 
                        altApprover3: "sumit.jhaldiyal@sumo", 
                        division: "Division1", 
                        salesGroup: "Group1", 
                        dcnrForm: "20", 
                        dcnrTo: "10", 
                        standardReason: "Nil", 
                        approver1Comments: "Looks good", 
                        altApprover1Comments: "", 
                        approver2Comments: "", 
                        altApprover2Comments: "", 
                        approver3Comments: "Approved", 
                        altApprover3Comments: "", 
                        activityAction: "Created", 
                        activitySection: "", 
                        activityDate: "04/15/2025", 
                        updatedTime: "", 
                        preferredKey: "", 
                        changes: "", 
                        timelineItems: this.generateTimelineItems("Ishan", "04/15/2025")
                    }
                ],
                filter: { createdBy: "", createdOn: "", status: "", referenceNo: "", approver1: "", approver2: "", approver3: "" },
                filterOptions: {
                    createdBy: [],
                    createdOn: [],
                    status: [],
                    referenceNo: [],
                    approver1: [],
                    approver2: [],
                    approver3: []
                },
                uploads: [],
                originalRequests: [],
                selectedRequest: {}
            };

            oData.originalRequests = [...oData.requests];
            this._updateFilterOptions(oData);
            const oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
        },

        _updateFilterOptions: function(oData) {
            oData.filterOptions.createdBy = [...new Set(oData.originalRequests.map(item => item.createdBy))].map(key => ({ key, text: key }));
            oData.filterOptions.createdOn = [...new Set(oData.originalRequests.map(item => item.createdOn))].map(key => ({ key, text: key }));
            oData.filterOptions.status = [...new Set(oData.originalRequests.map(item => item.status))].map(key => ({ key, text: key }));
            oData.filterOptions.referenceNo = [...new Set(oData.originalRequests.map(item => item.referenceNo))].map(key => ({ key, text: key }));
            oData.filterOptions.approver1 = [...new Set(oData.originalRequests.map(item => item.approver1))].map(key => ({ key, text: key }));
            oData.filterOptions.approver2 = [...new Set(oData.originalRequests.map(item => item.approver2))].map(key => ({ key, text: key }));
            oData.filterOptions.approver3 = [...new Set(oData.originalRequests.map(item => item.approver3))].map(key => ({ key, text: key }));
        },

        generateTimelineItems: function(createdBy, startDate) {
            const timelineItems = [
                {
                    Date: "Created on " + startDate,
                    Title: "Created by " + createdBy,
                    Text: "--",
                    UserName: createdBy
                },
                {
                    Date: startDate,
                    Title: "Approver 1",
                    Text: "ayush.jha@sumo",
                    UserName: "ayush.jha@sumo",
                    Comment: "Looks good"
                },
                {
                    Date: startDate,
                    Title: "Alternate Approver 1",
                    Text: "tanu.singh@sumo",
                    UserName: "tanu.singh@sumo",
                    Comment: ""
                },
                {
                    Date: startDate,
                    Title: "Approver 2",
                    Text: "ayushi.khanolkar@sumo",
                    UserName: "ayushi.khanolkar@sumo",
                    Comment: ""
                },
                {
                    Date: startDate,
                    Title: "Alternate Approver 2",
                    Text: "aakib.mohd@sumo",
                    UserName: "aakib.mohd@sumo",
                    Comment: ""
                },
                {
                    Date: startDate,
                    Title: "Approver 3",
                    Text: "yugal.kishore@sumo",
                    UserName: "yugal.kishore@sumo",
                    Comment: "Approved"
                },
                {
                    Date: startDate,
                    Title: "Alternate Approver 3",
                    Text: "sumit.jhaldiyal@sumo",
                    UserName: "sumit.jhaldiyal@sumo",
                    Comment: ""
                }
            ];
            return timelineItems;
        },

        onItemView: function (oEvent) {
            const oContext = oEvent.getSource().getParent().getBindingContext();
            const oData = oContext.getObject();
            this.getView().getModel().setProperty("/selectedRequest", oData);
            this.byId("priceRequisitionDialog").open();
        },

        onSavePriceReq: function() {
            MessageToast.show("Price requisition saved successfully");
            this.byId("priceRequisitionDialog").close();
        },

        onPrintPriceReq: function() {
            MessageToast.show("Printing price requisition...");
        },

        onClosePriceReq: function() {
            this.byId("priceRequisitionDialog").close();
        },

        onEditPriceReq: function() {
            const oModel = this.getView().getModel();
            const bEditable = !oModel.getProperty("/editable");
            oModel.setProperty("/editable", bEditable);

            const oDialog = this.byId("priceRequisitionDialog");
            const oIconTabBar = oDialog.getContent()[0].getContent()[1];
            oIconTabBar.getItems().forEach(item => {
                const oContent = item.getContent()[0];
                if (oContent instanceof sap.ui.layout.form.SimpleForm) {
                    oContent.getContent().forEach(control => {
                        if (control instanceof sap.m.Input || control instanceof sap.m.TextArea) {
                            control.setEditable(bEditable);
                        }
                    });
                } else if (oContent instanceof sap.m.Panel && oContent.getContent()[0] instanceof sap.ui.layout.form.SimpleForm) {
                    oContent.getContent()[0].getContent().forEach(control => {
                        if (control instanceof sap.m.Input || control instanceof sap.m.TextArea) {
                            control.setEditable(bEditable);
                        }
                    });
                }
            });

            MessageToast.show(bEditable ? "Edit mode activated" : "Edit mode deactivated");
        },

        onTabSelect: function(oEvent) {
            const sKey = oEvent.getParameter("key");
            MessageToast.show("Selected tab: " + sKey);
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
            oFilter[sProperty] = oEvent.getParameter("selectedItem") ? oEvent.getParameter("selectedItem").getKey() : "";
            oModel.setProperty("/filter", oFilter);
            this.onApplyFilter();
        },

        onApplyFilter: function () {
            const oModel = this.getView().getModel();
            const oFilter = oModel.getProperty("/filter");
            let aFilteredRequests = [...oModel.getProperty("/originalRequests")];

            if (oFilter.createdBy) aFilteredRequests = aFilteredRequests.filter(item => item.createdBy === oFilter.createdBy);
            if (oFilter.createdOn) aFilteredRequests = aFilteredRequests.filter(item => item.createdOn === oFilter.createdOn);
            if (oFilter.status) aFilteredRequests = aFilteredRequests.filter(item => item.status === oFilter.status);
            if (oFilter.referenceNo) aFilteredRequests = aFilteredRequests.filter(item => item.referenceNo === oFilter.referenceNo);
            if (oFilter.approver1) aFilteredRequests = aFilteredRequests.filter(item => item.approver1 === oFilter.approver1);
            if (oFilter.approver2) aFilteredRequests = aFilteredRequests.filter(item => item.approver2 === oFilter.approver2);
            if (oFilter.approver3) aFilteredRequests = aFilteredRequests.filter(item => item.approver3 === oFilter.approver3);

            oModel.setProperty("/requests", aFilteredRequests);
            this.getView().byId("filterDialog").close();
        },

        onCancelFilter: function () {
            const oModel = this.getView().getModel();
            oModel.setProperty("/requests", [...oModel.getProperty("/originalRequests")]);
            oModel.setProperty("/filter", { createdBy: "", createdOn: "", status: "", referenceNo: "", approver1: "", approver2: "", approver3: "" });
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




UPDATE DATA 1
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
                editable: false,
                requests: [
                    { 
                        ID: "001", 
                        createdBy: "Ankit", 
                        createdOn: "04/15/2025", 
                        status: "Pending", 
                        modifiedOn: "04/15/2025", 
                        creatorComments: "--", 
                        referenceNo: "10211594", 
                        approver1: "ayush.jha@sumo", 
                        altApprover1: "tanu.singh@sumo", 
                        approver2: "ayushi.khanolkar@sumo", 
                        altApprover2: "aakib.mohd@sumo", 
                        approver3: "yugal.kishore@sumo", 
                        altApprover3: "sumit.jhaldiyal@sumo", 
                        division: "Division1", 
                        salesGroup: "Group1", 
                        dcnrForm: "20", 
                        dcnrTo: "10", 
                        standardReason: "Nil", 
                        approver1Comments: "Looks good", 
                        altApprover1Comments: "", 
                        approver2Comments: "", 
                        altApprover2Comments: "", 
                        approver3Comments: "Approved", 
                        altApprover3Comments: "", 
                        activityAction: "Created", 
                        activitySection: "", 
                        activityDate: "04/15/2025", 
                        updatedTime: "", 
                        preferredKey: "", 
                        changes: "", 
                        timelineItems: this.generateTimelineItems("Ankit", "04/15/2025")
                    },
                    { 
                        ID: "002", 
                        createdBy: "Nadeem", 
                        createdOn: "04/15/2025", 
                        status: "Approved", 
                        modifiedOn: "04/15/2025", 
                        creatorComments: "--", 
                        referenceNo: "10211595", 
                        approver1: "ayush.jha@sumo", 
                        altApprover1: "tanu.singh@sumo", 
                        approver2: "ayushi.khanolkar@sumo", 
                        altApprover2: "aakib.mohd@sumo", 
                        approver3: "yugal.kishore@sumo", 
                        altApprover3: "sumit.jhaldiyal@sumo", 
                        division: "Division1", 
                        salesGroup: "Group1", 
                        dcnrForm: "20", 
                        dcnrTo: "10", 
                        standardReason: "Nil", 
                        approver1Comments: "Looks good", 
                        altApprover1Comments: "", 
                        approver2Comments: "", 
                        altApprover2Comments: "", 
                        approver3Comments: "Approved", 
                        altApprover3Comments: "", 
                        activityAction: "Created", 
                        activitySection: "", 
                        activityDate: "04/15/2025", 
                        updatedTime: "", 
                        preferredKey: "", 
                        changes: "", 
                        timelineItems: this.generateTimelineItems("Nadeem", "04/15/2025")
                    },
                    { 
                        ID: "003", 
                        createdBy: "Ishan", 
                        createdOn: "04/15/2025", 
                        status: "Rejected", 
                        modifiedOn: "04/15/2025", 
                        creatorComments: "--", 
                        referenceNo: "10211596", 
                        approver1: "ayush.jha@sumo", 
                        altApprover1: "tanu.singh@sumo", 
                        approver2: "ayushi.khanolkar@sumo", 
                        altApprover2: "aakib.mohd@sumo", 
                        approver3: "yugal.kishore@sumo", 
                        altApprover3: "sumit.jhaldiyal@sumo", 
                        division: "Division1", 
                        salesGroup: "Group1", 
                        dcnrForm: "20", 
                        dcnrTo: "10", 
                        standardReason: "Nil", 
                        approver1Comments: "Looks good", 
                        altApprover1Comments: "", 
                        approver2Comments: "", 
                        altApprover2Comments: "", 
                        approver3Comments: "Approved", 
                        altApprover3Comments: "", 
                        activityAction: "Created", 
                        activitySection: "", 
                        activityDate: "04/15/2025", 
                        updatedTime: "", 
                        preferredKey: "", 
                        changes: "", 
                        timelineItems: this.generateTimelineItems("Ishan", "04/15/2025")
                    }
                ],
                filter: { createdBy: "", createdOn: "", status: "", referenceNo: "", approver1: "", approver2: "", approver3: "" },
                filterOptions: {
                    createdBy: [],
                    createdOn: [],
                    status: [],
                    referenceNo: [],
                    approver1: [],
                    approver2: [],
                    approver3: []
                },
                uploads: [],
                originalRequests: [],
                selectedRequest: {}
            };

            oData.originalRequests = [...oData.requests];
            this._updateFilterOptions(oData);
            const oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
        },

        _updateFilterOptions: function(oData) {
            oData.filterOptions.createdBy = [...new Set(oData.originalRequests.map(item => item.createdBy))].map(key => ({ key, text: key }));
            oData.filterOptions.createdOn = [...new Set(oData.originalRequests.map(item => item.createdOn))].map(key => ({ key, text: key }));
            oData.filterOptions.status = [...new Set(oData.originalRequests.map(item => item.status))].map(key => ({ key, text: key }));
            oData.filterOptions.referenceNo = [...new Set(oData.originalRequests.map(item => item.referenceNo))].map(key => ({ key, text: key }));
            oData.filterOptions.approver1 = [...new Set(oData.originalRequests.map(item => item.approver1))].map(key => ({ key, text: key }));
            oData.filterOptions.approver2 = [...new Set(oData.originalRequests.map(item => item.approver2))].map(key => ({ key, text: key }));
            oData.filterOptions.approver3 = [...new Set(oData.originalRequests.map(item => item.approver3))].map(key => ({ key, text: key }));
        },

        generateTimelineItems: function(createdBy, startDate) {
            const timelineItems = [
                {
                    Date: "Created on " + startDate,
                    Title: "Created by " + createdBy,
                    Text: "--",
                    UserName: createdBy
                },
                {
                    Date: startDate,
                    Title: "Approver 1",
                    Text: "ayush.jha@sumo",
                    UserName: "ayush.jha@sumo",
                    Comment: "Looks good"
                },
                {
                    Date: startDate,
                    Title: "Alternate Approver 1",
                    Text: "tanu.singh@sumo",
                    UserName: "tanu.singh@sumo",
                    Comment: ""
                },
                {
                    Date: startDate,
                    Title: "Approver 2",
                    Text: "ayushi.khanolkar@sumo",
                    UserName: "ayushi.khanolkar@sumo",
                    Comment: ""
                },
                {
                    Date: startDate,
                    Title: "Alternate Approver 2",
                    Text: "aakib.mohd@sumo",
                    UserName: "aakib.mohd@sumo",
                    Comment: ""
                },
                {
                    Date: startDate,
                    Title: "Approver 3",
                    Text: "yugal.kishore@sumo",
                    UserName: "yugal.kishore@sumo",
                    Comment: "Approved"
                },
                {
                    Date: startDate,
                    Title: "Alternate Approver 3",
                    Text: "sumit.jhaldiyal@sumo",
                    UserName: "sumit.jhaldiyal@sumo",
                    Comment: ""
                }
            ];
            return timelineItems;
        },

        onItemView: function (oEvent) {
            const oContext = oEvent.getSource().getParent().getBindingContext();
            const oData = oContext.getObject();
            this.getView().getModel().setProperty("/selectedRequest", oData);
            this.byId("priceRequisitionDialog").open();
        },

        onSavePriceReq: function() {
            MessageToast.show("Price requisition saved successfully");
            this.byId("priceRequisitionDialog").close();
        },

        onPrintPriceReq: function() {
            MessageToast.show("Printing price requisition...");
        },

        onClosePriceReq: function() {
            this.byId("priceRequisitionDialog").close();
        },

        onEditPriceReq: function() {
            const oModel = this.getView().getModel();
            const bEditable = !oModel.getProperty("/editable");
            oModel.setProperty("/editable", bEditable);

            const oDialog = this.byId("priceRequisitionDialog");
            const aContent = oDialog.getContent()[0].getContent();
            aContent.forEach(panel => {
                if (panel instanceof sap.m.Panel) {
                    const oForm = panel.getContent()[0];
                    if (oForm instanceof sap.ui.layout.form.SimpleForm) {
                        oForm.getContent().forEach(control => {
                            if (control instanceof sap.m.Input || control instanceof sap.m.TextArea) {
                                control.setEditable(bEditable);
                            }
                        });
                    }
                }
            });

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
            oFilter[sProperty] = oEvent.getParameter("selectedItem") ? oEvent.getParameter("selectedItem").getKey() : "";
            oModel.setProperty("/filter", oFilter);
            this.onApplyFilter();
        },

        onApplyFilter: function () {
            const oModel = this.getView().getModel();
            const oFilter = oModel.getProperty("/filter");
            let aFilteredRequests = [...oModel.getProperty("/originalRequests")];

            if (oFilter.createdBy) aFilteredRequests = aFilteredRequests.filter(item => item.createdBy === oFilter.createdBy);
            if (oFilter.createdOn) aFilteredRequests = aFilteredRequests.filter(item => item.createdOn === oFilter.createdOn);
            if (oFilter.status) aFilteredRequests = aFilteredRequests.filter(item => item.status === oFilter.status);
            if (oFilter.referenceNo) aFilteredRequests = aFilteredRequests.filter(item => item.referenceNo === oFilter.referenceNo);
            if (oFilter.approver1) aFilteredRequests = aFilteredRequests.filter(item => item.approver1 === oFilter.approver1);
            if (oFilter.approver2) aFilteredRequests = aFilteredRequests.filter(item => item.approver2 === oFilter.approver2);
            if (oFilter.approver3) aFilteredRequests = aFilteredRequests.filter(item => item.approver3 === oFilter.approver3);

            oModel.setProperty("/requests", aFilteredRequests);
            this.getView().byId("filterDialog").close();
        },

        onCancelFilter: function () {
            const oModel = this.getView().getModel();
            oModel.setProperty("/requests", [...oModel.getProperty("/originalRequests")]);
            oModel.setProperty("/filter", { createdBy: "", createdOn: "", status: "", referenceNo: "", approver1: "", approver2: "", approver3: "" });
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
