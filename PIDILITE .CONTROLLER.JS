sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Text",
    "sap/ui/model/json/JSONModel",
    "sap/m/ObjectStatus",
    "sap/ui/unified/FileUploader"
], function (Controller, MessageBox, MessageToast, Dialog, Button, Text, JSONModel, ObjectStatus, FileUploader) {
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
                    referenceNo: "",
                    level1: "",
                    level2: "",
                    level3: ""
                },
                attachments: [],
                originalRequests: [],
                uploadedRequests: [],
                formData: {
                    createdBy: "",
                    createdDate: new Date().toLocaleDateString(),
                    referenceNo: "",
                    division: "",
                    dcnrForm: "",
                    status: "Pending",
                    salesGroup: "",
                    dcnrTo: "",
                    standardReason: "",
                    comment: "",
                    approver: "",
                    alternateApprover1: "",
                    alternateApprover2: "",
                    alternateApprover3: ""
                }
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
            MessageBox.information("Info button pressed.");
        },

        onFilterPress: function () {
            this.getView().byId("filterDialog").open();
        },

        onApplyFilter: function () {
            const oModel = this.getView().getModel();
            const oFilter = oModel.getProperty("/filter");
            let aFilteredRequests = [...oModel.getProperty("/originalRequests")];

            if (oFilter.type) aFilteredRequests = aFilteredRequests.filter(item => item.status === oFilter.type);
            if (oFilter.createdBy) aFilteredRequests = aFilteredRequests.filter(item => item.createdBy === oFilter.createdBy);
            if (oFilter.createdOn) aFilteredRequests = aFilteredRequests.filter(item => item.createdOn === oFilter.createdOn);
            if (oFilter.status) aFilteredRequests = aFilteredRequests.filter(item => item.status === oFilter.status);
            if (oFilter.referenceNo) aFilteredRequests = aFilteredRequests.filter(item => item.referenceNo === oFilter.referenceNo);
            if (oFilter.level1) aFilteredRequests = aFilteredRequests.filter(item => item.level1 === oFilter.level1);
            if (oFilter.level2) aFilteredRequests = aFilteredRequests.filter(item => item.level2 === oFilter.level2);
            if (oFilter.level3) aFilteredRequests = aFilteredRequests.filter(item => item.level3 === oFilter.level3);

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
                referenceNo: "",
                level1: "",
                level2: "",
                level3: ""
            });
            this.getView().byId("filterDialog").close();
        },

        onCreatePress: function () {
            this.getView().byId("uploadDialog").open();
        },

        onFileChange: function (oEvent) {
            const oFileInput = this.getView().byId("fileInput");
            const oFile = oEvent.getParameter("files") && oEvent.getParameter("files")[0]; // Corrected to use getParameter("files")
            if (oFile) {
                this.getView().getModel().setProperty("/currentFile", oFile.name); // Store file name
            }
        },

        onFileSubmit: function () {
            var oFileInput = this.getView().byId("fileInput");
            var oFiles = oFileInput.getValue(); // This should use the file input value or file object
            if (!oFiles) {
                MessageToast.show("No file selected.");
                return;
            }
            var oFile = oFiles[0]; // Assuming oFiles is an array of files
            var sFileName = oFile.name;
            var sExtension = sFileName.split('.').pop().toLowerCase();
            if (sExtension !== "csv") {
                MessageToast.show("Invalid file type! Please select a CSV file.");
                return;
            }
            var that = this;
            var oReader = new FileReader();
            oReader.onload = function (e) {
                var sCSV = e.target.result;
                var aUploadedData = that._parseCSV(sCSV);
                if (aUploadedData.length === 0) {
                    MessageBox.error("Uploaded file is empty or has an invalid format.");
                    return;
                }
                that._validateAndSubmitMassUpload(aUploadedData);
            };
            oReader.readAsText(oFile);
        },

        _parseCSV: function (sCSV) {
            const aRows = sCSV.split('\n').filter(row => row.trim());
            const aHeaders = aRows[0].split(',').map(header => header.trim());
            const aData = [];
            for (let i = 1; i < aRows.length; i++) {
                const aValues = aRows[i].split(',').map(value => value.trim());
                if (aValues.length === aHeaders.length) {
                    const oRow = {};
                    aHeaders.forEach((header, index) => {
                        oRow[header] = aValues[index];
                    });
                    aData.push(oRow);
                }
            }
            return aData;
        },

        _validateAndSubmitMassUpload: function (aData) {
            var aValidEntries = [];
            var aInvalidEntries = [];
            var oModel = this.getView().getModel();
            var aExistingData = oModel.getProperty("/requests") || [];

            var oExistingCombos = {};
            aExistingData.forEach(function (item) {
                var sCombo = item.referenceNo + "_" + item.createdBy + "_" + item.status;
                oExistingCombos[sCombo] = true;
            });

            aData.forEach(function (row) {
                if (!row.referenceNo || !row.status || !row.level1) {
                    aInvalidEntries.push(row);
                    return;
                }

                var sCombo = row.referenceNo + "_" + row.createdBy + "_" + row.status;
                if (oExistingCombos[sCombo]) {
                    aInvalidEntries.push(row);
                } else {
                    aValidEntries.push(row);
                    oExistingCombos[sCombo] = true;
                }
            });

            MessageBox.information(
                aValidEntries.length + " valid records added.\n" + aInvalidEntries.length + " invalid records found.",
                {
                    actions: ["Export Invalid Records", MessageBox.Action.OK],
                    onClose: function (sAction) {
                        if (sAction === "Export Invalid Records") {
                            this._exportInvalidRecords(aInvalidEntries);
                        }
                    }.bind(this)
                }
            );

            if (aValidEntries.length > 0) {
                var aRequests = aValidEntries.map(row => ({
                    createdBy: "UploadedUser",
                    createdOn: new Date().toLocaleDateString(),
                    status: row.status || "Pending",
                    modifiedOn: new Date().toLocaleDateString(),
                    creatorComments: row.comment || "",
                    referenceNo: row.referenceNo || "AutoGenerated",
                    level1: row.level1 || "Submitted",
                    level2: row.level2 || "-",
                    level3: row.level3 || "-"
                }));
                oModel.setProperty("/uploadedRequests", aRequests);
                oModel.setProperty("/requests", [...oModel.getProperty("/requests"), ...aRequests]);
                oModel.setProperty("/originalRequests", [...oModel.getProperty("/originalRequests"), ...aRequests]);

                // Automatically fill the form with the first valid entry
                const firstEntry = aValidEntries[0];
                oModel.setProperty("/formData/createdBy", "UploadedUser");
                oModel.setProperty("/formData/createdDate", new Date().toLocaleDateString());
                oModel.setProperty("/formData/referenceNo", firstEntry.referenceNo || "");
                oModel.setProperty("/formData/division", firstEntry.division || "Division1");
                oModel.setProperty("/formData/dcnrForm", firstEntry.dcnrForm || "20");
                oModel.setProperty("/formData/status", firstEntry.status || "Pending");
                oModel.setProperty("/formData/salesGroup", firstEntry.salesGroup || "Group1");
                oModel.setProperty("/formData/dcnrTo", firstEntry.dcnrTo || "10");
                oModel.setProperty("/formData/standardReason", firstEntry.standardReason || "Nil");
                oModel.setProperty("/formData/comment", firstEntry.comment || "--");
                oModel.setProperty("/formData/approver", firstEntry.level1 || "Submitted");
                oModel.setProperty("/formData/alternateApprover1", firstEntry.level2 || "-");
                oModel.setProperty("/formData/alternateApprover2", firstEntry.level3 || "-");
                oModel.setProperty("/formData/alternateApprover3", "-");

                this._showObjectPageLayout();
                MessageBox.success("Mass upload completed – valid records added and form filled.");
            }
        },

        _exportInvalidRecords: function (aInvalidEntries) {
            if (aInvalidEntries.length === 0) {
                MessageToast.show("No invalid records to export.");
                return;
            }

            var sCSV = "Reference No,Status,Level 1 Approver,Level 2 Approver,Level 3 Approver,Division,DCNR Form,DCNR To,Sales Group,Standard Reason,Comment\n";
            aInvalidEntries.forEach(function (oRecord) {
                sCSV += `${oRecord.referenceNo || ""},${oRecord.status || ""},${oRecord.level1 || ""},${oRecord.level2 || ""},${oRecord.level3 || ""},${oRecord.division || ""},${oRecord.dcnrForm || ""},${oRecord.dcnrTo || ""},${oRecord.salesGroup || ""},${oRecord.standardReason || ""},${oRecord.comment || ""}\n`;
            });

            var oBlob = new Blob([sCSV], { type: "text/csv;charset=utf-8;" });
            var sFileName = "Invalid_Records.csv";
            var oLink = document.createElement("a");

            if (navigator.msSaveBlob) {
                navigator.msSaveBlob(oBlob, sFileName);
            } else {
                oLink.href = URL.createObjectURL(oBlob);
                oLink.download = sFileName;
                document.body.appendChild(oLink);
                oLink.click();
                document.body.removeChild(oLink);
            }

            MessageToast.show("Invalid records exported successfully.");
        },

        _showObjectPageLayout: function () {
            this.getView().byId("objectPageLayout").setVisible(true);
        },

        onFileDeleted: function (oEvent) {
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
        },

        onSavePress: function () {
            MessageToast.show("Form saved successfully.");
        },

        onPrintPress: function () {
            MessageToast.show("Printing form...");
        },

        onExitPress: function () {
            this.getView().byId("objectPageLayout").setVisible(false);
            MessageToast.show("Exited form.");
        },

        onSendPress: function () {
            MessageToast.show("Form sent successfully.");
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
