---
title: "Vue plugin docs"
date: 2022-01-08T10:41:03+06:00
subTitle: >
    Progress-up - HTML5 based multiple image upload progress indicator plugin demos
---


## [Vue.js](https://www.vuejs.org)  demo

<!--
{{<rawhtml>}}
<div class="w-full">
<iframe class="layout-frame" src="https://stackblitz.com/edit/vue-gctrks?embed=1&file=src/App.vue">
</iframe>
</div>
{{</rawhtml>}}
-->

{{<rawhtml>}}
<div class="flex justify-center">
<a href="https://vue-gctrks.stackblitz.io" class="bg-blue-600 rounded shadow-md text-black px-4 py-3 no-underline">Stackblitz </a>
</div>
{{</rawhtml>}}


## Some code

```js

import axios from "axios";
import ldBar from "./assets/progressBar/loading-bar.js";
import PDFObject from 'pdfobject';


export default {
    data() {
        return {
            openTab: 1,
            dragging: false,
            authEnabled: false,
            filtFiles : {
                "type": "all",
                "action": "allow"
            },
            form: {
                uploadURL: 'https://localhost:2324/uploadmultiple',
                filesName: 'uploadFiles',
                authType: '',
                user: '',
                pass: '',
                progType: 'Line',
                fileSizeLimit: 10,
                sizeLimitType: "Single file limit",
                fileTypeFilter: "All",
                fileTypeAction: "Allow file type"
            },

            fileTypes: {
                "video": "avi.svg",
                "css": "css.svg",
                "csv": "csv.svg",
                "eps": "eps.svg",
                "excel": "excel.svg",
                "html": "html.svg",
                "movie": "mov.svg",
                "mp3": "mp3.svg",
                "other": "other.svg",
                "pdf": "pdf.svg",
                "ppt": "ppt.svg",
                "rar": "rar.svg",
                "text": "txt.svg",
                "audio": "wav.svg",
                "word": "word.svg",
                "zip": "zip.svg"
            },
            uploadFileInfos: [],
            uploadFileList: [],
            errInfos: [],
            statsTable: [],
            progressBars: [],
            disableUpload: true,
            details: "",
        };
    },

    updated() {
        this.$nextTick(() => {
            this.createBars();
            if (this.form.uploadURL == undefined || this.form.filesName == undefined) {
                this.disableUpload = true;
            }
        });
    },

    methods: {

        dragover(e) {
            e.preventDefault();
        },

        onDragEnter() {
            this.dragging = true;
        },
        onDragLeave() {
            this.dragging = false;
        },
        onDrop(evt, list) {
            const files = evt.dataTransfer.files;
            this.clearAll();
            console.log(files);
            this.uploadFileList = files;
            this.setupUpload();
        },

        spitStatistics(self, idx) {
            if (idx == self.uploadFileList.length - 1) {
                let endUploadts = Date.now();
                self.totaltime = `${endUploadts - this.startUploadts}`;
                self.totalsize = this.humanFileSize(this.totalsize);

                var ts = new Date().toLocaleString();
                var tot = self.uploadFileList.length;
                var status = self.totalfiles == tot ?
                    "<img src='src/assets/icons/misc/success-icon.svg' >" :
                    "<img src='src/assets/icons/misc/failure-icon.svg' >";
                self.details = `${self.totalfiles}/${tot} files of size ${this.totalsize} sent in ${self.totaltime} ms`;
                var id = self.statsTable.length + 1;

                let stat = {
                    id: id,
                    ts: ts,
                    status: status,
                    details: self.details
                };
                self.statsTable.push(stat);

                self.progresBars = [];
                self.disableUpload = true;
                self.totalfiles = 0;
                self.totalsize = 0;
                self.totaltime = 0;
                self.startUploadts = 0;
            }
        },

        uploadOneFile(file, idx) {
            let uplFormData = new FormData();
            uplFormData.append(this.form.filesName, file);
            console.log(uplFormData);
            console.log("Uploading to " + this.form.uploadURL);
            console.log("Uploading file name" + this.form.filesName);
            let self = this;
            let options = {
                headers: {
                    "Content-Type": "multipart/form-data"
                },

                onUploadProgress: function(e) {
                    let perc = parseInt(e.progress * 100);
                    console.log(perc + " is the percentage uploaded");
                    self.progressBars[idx].set(perc);
                    file.bytesSent = this.humanFileSize(e.progress * size);
                    file.eta = e.estimated;
                    file.rate = (e.rate / 1024 / 1024).toFixed(2);
                }
            };

            if (this.authEnabled) {
                var username = "user";
                var password = "password";
                var basicAuth = "Basic " + btoa(username + ":" + password);
                options["headers"] = {
                    "Authorization": +basicAuth
                };
            }
            console.log("Uploading to " + this.form.uploadURL);
            axios.post(this.form.uploadURL, uplFormData, options).then((resp) => {
                this.spitStatistics(self, idx);
            }).catch((error) => {
                alert("Upload failed. Please check endpoint in Setup");
                alert(error);
            });
        },

        uploadAll() {
            console.log("Starting upload...");
            this.startUploadts = Date.now();
            for (let i = 0; i < this.uploadFileInfos.length; i++) {
                let f = this.uploadFileInfos[i];
                this.uploadOneFile(f, i);
            }
        },
        saveConfig(e) {

            e.preventDefault();

            console.log(this.form.uploadURL);
            console.log(this.form.filesName);
            console.log(this.form.progType);

            if (this.form.authEnabled) {
                console.log(this.form.authType);
                console.log(this.form.user, inputs.pass);
            }
            console.log(this.form.fileSizeLimit);
            console.log(this.form.sizeLimitType);
            console.log(this.form.fileTypeFilter);
            console.log(this.form.fileTypeAction);

        },

        async testUpload() {
            console.log("Uploading using HTML5 File API...");
            let testForm = new FormData();

            const blob = new Blob(['Test upload DELETE'], {
                type: "plain/text"
            });
            testForm.append(this.form.filesName, blob, "progress-up-test.txt");
            let options = {};
            if (this.authEnabled) {
                var username = "user";
                var password = "password";
                var basicAuth = "Basic " + btoa(username + ":" + password);
                options = {
                    headers: {
                        "Authorization": +basicAuth
                    }
                };
            }

            console.log("Upload test to " + this.form.uploadURL);
            await axios.post(this.form.uploadURL, testForm, options).then((resp) => {
                alert("Test succeeded");
            }).catch((error) => {
                alert("Upload failed. Please check endpoint in Setup");
                alert(error);
            });
        },

        testEP(e) {
            e.preventDefault();
            this.saveConfig(e);
            this.testUpload();
        },

        setIndicator() {
            var progType = this.form.progType;
            console.log(progType);
            switch (progType) {
                case "Bubble":
                    var extra = "data-img-size=\"100,100\"";
                    break;
                case "Rainbow":
                    var extra = "data-stroke=\"data:ldbar/res,gradient(0,1,#f99,#ff9)\"";
                    break;
                default:
                    break;
            }
        },
        clearAll() {
            this.details = "";
            this.uploadFileList = [];
            this.uploadFileInfos = [];
            this.errInfos = [];
            this.progressBars = [];
            this.totalfiles = 0;
            this.totalsize = 0;
            this.totaltime = 0;

            this.disableUpload = true;
            console.log("Cleared");

        },
        openFileBrowser() {
            this.$refs.fileInput.click();
        },
        uploadFile(file, onUploadProgress) {
            let formData = new FormData();

            formData.append(filesName, file);

            return axios.post(uploadURL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress
            });
        },

        fileSelectFinish(evt) {
            let selectedFiles = evt.target.files;
            this.clearAll();
            this.uploadFileList = selectedFiles;
            this.setupUpload();
        },

        humanFileSize(size) {
            const i = Math.floor(Math.log(size) / Math.log(1024));
            let t2 = size / Math.pow(1024, i);
            let t = t2.toFixed(2) * 1;
            const ret = t + " " + ["B", "kB", "MB", "GB", "TB"][i];
            return (ret);
        },
        toggleTabs(tabNumber) {
            this.openTab = tabNumber
        },

        applyFilter() {
            filt = this.form.fileFilter.value;
            filtType = this.form.filterAction;
            console.log(filt, filtType);
            switch (filt) {
                case "All":
                    break;
                case "PDF only":
                    filtFiles = {
                        "type": "application/pdf",
                        "action": action
                    };
                    break;
                case "Image only":
                    filtFiles = {
                        "type": "image",
                        "action": action
                    };
                    break;
                case "Video only":
                    filtFiles = {
                        "type": "video",
                        "action": action
                    };
                    break;
                case "Audio only":
                    filtFiles = {
                        "type": "audio",
                        "action": action
                    };
                    break;
                case "Zip only":
                    filtFiles = {
                        "type": "application/zip",
                        "action": action
                    };
                    break;
                case "Text only":
                    filtFiles = {
                        "type": "text",
                        "action": action
                    };
                    break;
                default:
                    console.log("Filter not understood");
                    break;
            }
        },

        toggleSizeQ() {
            var sizeLabel = "Single file limit";
            val = this.form.sizeLimitType;
            if (val.checked === true) {
                sizeLabel = "Total limit";
            } else {
                sizeLabel = "Single file limit";
            }
        },

        toggleFilterQ() {
            var filterLabel = "Allow file type";
            val = this.form.fileTypeAction;
            if (val.checked === true) {
                filterLabel = "Deny file type";
            } else {
                filterLabel = "Allow file type";
            }
        },

        wordCount(val) {
            var wom = val.match(/\S+/g);
            return {
                chars: val.length,
                words: wom ? wom.length : 0,
                lines: val.split(/\r*\n/).length
            };
        },

        checkFilter(mime) {
            /* No filter XXX */
            if (filtFiles.type == 'all') {
                console.log("No file type filters active");
                return true;
            }
            if (mime.match(filtFiles.type) && filtFiles.action == "allow") {
                return true;
            }
            if (mime.match(filtFiles.type) && filtFiles.action == "deny") {
                return true;
            }
            return false;
        },

        checkSize(size) {
            if (size <= (this.form.fileSizeLimit * 1024 * 1024)) {
                return true;
            }
            return false;
        },

        checkTotalSize() {
            if (this.sizeLimitType == "Total limit") {
                if (totalsize <= (this.form.fileSizeLimit * 1024 * 1024)) {
                    return true;
                }
                return false;
            }
            return false;
        },

        showThumbnail(f, i ) {
        let id = 'a' + i;
        let target = id + '-thumb';
	let self = this;
	let type = f.file.type.split('/')[0];
        switch (true) {
            case /text/.test(f.file.type):
                console.log("Text type detected");
                var reader = new FileReader();
                reader.onload = (function(locf) {
                    return function(e) {
			let res ;
			if(e.target) {
                        	res = e.target.result;
			}
                        let wc = self.wordCount(res);
                        f.meta = ` 
   			Chars : ${wc.chars}
   			Words: ${wc.words}
   			Lines: ${wc.lines}
			`;
                        var dataArray = res.split("\n");
                        dataArray = dataArray.slice(0, 20);
                        let txt = dataArray.join("\n");

                        var fileIcon = self.fileTypeIcons[type];
                        let pic = "src/assets/icons/filetypes/" +
                            fileIcon;
                        f.thumb = [
                                '<img width="125" height="125" src="',
                                pic,
                                '" title="',
                                txt,
				 '" alt="',
                                locf.name,
                                '" class="w-12 h-12" />'
                            ].join('');

                    };
                })(f.file);
                reader.readAsText(f.file);
                break;
            case /image/.test(f.file.type):
                console.log("Image type detected");
                var reader = new FileReader();
                reader.onload = (function(locf) {
                    return function(e) {
			let pic;
			if(e.target) {
                        	pic = e.target.result;
			}
                        f.thumb = [
                                '<img width="125" height="125" src="',
                                pic,
                                '" title="',
                                locf.name,
				 '" alt="',
                                locf.name,
                                '" class="w-12 h-12" />'
                            ].join(''); 
                            f.meta = locf.name;
                    };
                })(f.file);
                reader.readAsDataURL(f.file);
                break;
            case /audio/.test(f.file.type):
                console.log("Audio type detected");
                var audioUrl = window.URL.createObjectURL(f.file);
                f.thumb = [
                    '<audio controls class="h-9 w-9" width="125" height="125"> ',
		    '<source src="',
                    audioUrl,
                    '" title="',
                    f.file.name,
                    '" alt="',
                    f.file.name,
                    '" > </source> </audio> />'
                ].join('');
                f.meta = f.file.name;
                break;
            case /video/.test(f.file.type):
                console.log("Video type detected");
                var videoUrl = window.URL.createObjectURL(f.file);
                f.thumb = [
                    '<video controls class="h-9 w-9" width="125" height="125">',
		    '<source src="',
                    videoUrl,
                    '" title="',
                    f.file.name,
                    '" alt="',
                    f.file.name,
                    '" > </source> </video> />'
                ].join('');
                f.meta = f.file.name;
                break;
            case /pdf/.test(f.file.type):
                console.log("PDF type detected");
                var pdfURL = window.URL.createObjectURL(f.file);
                f.meta = f.file.name;
                PDFObject.embed(pdfURL, target);
                break;
            default:
                console.log("default type detected");
                var fileIcon = this.fileTypeIcons[type];
                if (fileIcon == undefined) {
                    fileIcon = "file.svg";
                }
                f.meta = f.file.name;
                let pic = "src/assets/icons/filetypes/" + fileIcon;
                f.thumb = [
                    '<img width="125" height="125" src=',
                    pic,
                    '" title="',
                    f.file.name,
		    '" alt="',
                    f.file.name,
                    '" class="w-12 h-12" />'
                ].join('');
                break;
        }
    },


        createBars() {
            for (var i = 0; i < this.uploadFileInfos.length; i++) {
                f = this.uploadFileInfos[i];
                var selector = '#a' + i;
                var bar = new ldBar(selector, {
                    preset: progType.toLowerCase()
                });
                bar.set(0);
                progressBars.push(bar);
                showThumbnail(f, i);
            }
            for (var i = 0; i < this.errInfos.length; i++) {
                f = this.errInfos[i];
                showThumbnail(f, i);
            }
        },
	        setupUpload() {
            var delQ = [];
            for (var i = 0; i < uploadFileList.length; i++) {
                let f = uploadFileList[i];
                let mime = f.type;
                let name = f.name;
                let ts = f.lastModifiedDate.toLocaleDateString();
                totalsize += f.size;
                let size = humanFileSize(f.size);
                let id = 'a' + i;
                if (!checkSize(f.size)) {
                    console.log("Size check:: size is " + f.size);
                    msg = `${name} too big for upload`;
                    console.log(msg);
                    this.printBannedBanner(f, id, ts, msg);
                    delQ.push(i);
                    continue;
                }
                if (!checkFilter(mime)) {
                    console.log("Hit banned file type:: filter issue");
                    msg = `${name} cannot be uploaded due to policy.`;
                    this.printBannedBanner(f, id, ts, msg);
                    delQ.push(i);
                    continue;
                }
                if (i == uploadFileList.length - 1) {
                    console.log("Total size check:: total size is " +
                        totalsize);
                    if (!checkTotalSize()) {
                        msg = `Total size exceeds policy, delete some`;
                        this.disableUpload = true;
                    }
                }
                totalfiles += 1;
                this.uploadFileInfos.push({
                    file: f,
                    id: id,
                    meta: '',
                    thumb: '',
                    bytesSent: 0,
                    eta: 0,
                    rate: 0,
                });
            }
            this.uploadFileList = this.uploadFileList.filter(function(value, index) {
                return delQ.indexOf(index) == -1;
            });
            this.disableUpload = false;
        },
        delItem(index) {
            let list = [...this.uploadFileList];
            list.splice(index, 1);
            this.uploadFileList = list;
            this.uploadFileInfos = list;
            this.totalsize -= this.upLoadFileList[index].size;
            this.checkTotalSize();
        },
	printBannedBanner(file, id , ts, msg) {
        this.errInfos.push({
            file: file,
            id: id,
            meta: '',
            thumb: '',
            ts: ts,
            msg: msg
        });
    },


    }
};
```
