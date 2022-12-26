---
title: "Vue plugin for progress-up"
date: 2018-11-28T15:15:26+10:00
featureImage: vue.webp
draft: false
weight: 3
---

# Vue plugin development

Vue is a great replacement for Angular and its complexity, developed by
Even You, an ex Googler.

It is not so difficult and is pleasant to work with.

But its compiler errors were a pain to deal with.

And I found it to be quite forgiving of all the frameworks.

It is also richly popular due to its low learning curve and high
utility.

It is useful either or SPA or simply plug it as a standalone
project inside normal web pages.

## Plugin architecture

Just like react `ProgressUp.vue` is the one with the template,style and
the typescript.

## How it works?

The vue plugin is similar to other plugins in the sense that the code
sits along with template to deliver functionality.

Reactivity and HTML interpolation occurs using the standard vue methods
and `v-for` looping constructs.

## Code sample

Here is some sample code from `ProgressUp.vue`.


```ts
<script lang="ts">
import axios from "axios";
import ldBar from "./assets/progressBar/loading-bar.js";
import PDFObject from 'pdfobject';

export default {
    data() {
        return {
            openTab: 1,
	    errAlert: false,
	    thumbNailsDone: false,
            dragging: false,
	    totalsize: 0,
	    totalfiles: 0,
	    totaltime: 0,
            authEnabled: false,
            filterLabel : "Allow file type",
            sizeLabel : "Single file limit",
            filtFiles : {
                "type": "all",
                "action": "allow"
            },
            form: {
                uploadURL: '',
                filesName: '',
                authType: '',
                user: '',
                pass: '',
                progType: 'Rainbow',
                fileSizeLimit: 10,
                sizeLimitType: "Single file limit",
                fileTypeFilter: "All",
                fileTypeAction: "Allow file type"
            },

    fileTypes:  {
        "video": 'avi.svg',
        "css": 'css.svg',
        "csv": 'csv.svg',
        "eps": 'eps.svg',
        "excel": 'excel.svg',
        "html": 'html.svg',
        "movie": 'mov.svg',
        "mp3": 'mp3.svg',
        "other": 'other.svg',
        "pdf": 'pdf.svg',
        "ppt": 'ppt.svg',
        "rar": 'rar.svg',
        "text": 'txt.svg',
        "audio": 'wav.svg',
        "word": 'word.svg',
        "zip": 'zip.svg'
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
            if (this.form.uploadURL == '' || this.form.filesName == '') {
                this.disableUpload = true;
            } else {
		if(this.uploadFileList.length > 0) {
                	this.disableUpload = false;
		}
	    }
        });
    },


```

And some template.

```html

<div id="progress-up-progressArea"> 
  <div v-for="(info,id) in uploadFileInfos" :key="id" >
    <section class="m-4 p-4 mt-4 mb-4 transition-colors
    text-light-100 dark:text-white mx-auto">
     <div class="bg-dark dark:bg-gray dark:text-white rounded-md border border-red-800 rounded py-3 px-6
    border-gray-300 text-gray-600 dark:text-white relative">
    
      <div @click="delItem(id)" title="Delete" class="absolute
    cursor-pointer top-0 right-0 mr-2 dark:bg-white" >
    	<img width="25" height="25" src="./assets/icons/misc/trash-icon.svg" />
      </div>
    
      <div class="flex flex-wrap -mx-2 mb-8">
          <div class="w-full md:w-1/3 lg:w-1/4 px-2 mb-4">
             <div class="h-12 text-sm text-grey-dark flex items-left
    justify-left">
		<div  v-html="info.thumb" :id="info.id + '-thumb'"></div>
             </div>
          </div>
    
          <div class="w-full md:w-1/3 lg:w-1/4 px-2 mb-4">
            <div class="h-12 text-sm text-grey-dark flex items-left justify-left">
              <ul>
          	    <li  class="text-xl font-light leading-relaxed text-gray-800
    dark:text-white">
          	    Name: {{info.file.name}}
          	    </li>
          	    <li class="text-xl font-light leading-relaxed text-gray-800
    dark:text-white">
          	    Date: {{info.ts}}
          	    </li>
          	    <li class="text-xl font-light leading-relaxed text-gray-800
    dark:text-white">
          	    Type: {{info.file.type}}
          	    </li>
          	    <li class="text-xl font-light leading-relaxed text-gray-800
    dark:text-white">
          	    Size: {{info.size}} 
          	    </li>
       	    <li class="font-light leading-relaxed text-gray-800 dark:text-white">
		    Metadata: {{info.meta}}
          	    </li>

      	    <li class="text-xl font-light leading-relaxed text-gray-800
    dark:text-white">

		<span>{{info.bytesSent}} of {{info.size}} uploaded
{{info.rate}} MB/s ETA {{info.eta}} s</span>
          	    </li>
     
              </ul>
            </div>
           </div>
      </div>
          <div class='ldBar bottom-0 right-0 pb-8' :id="info.id" >
	  </div>
      </div>
    </section>
  </div>
</div>


```

## How you can use it

{{<rawhtml>}}
<div class="flex justify-center">
<a href="https://vue-gctrks.stackblitz.io" class="bg-blue-600 rounded shadow-md text-black px-4 py-3 no-underline">Stackblitz </a>
</div>
{{</rawhtml>}}


The stackblitz link has the instructions and help needed.

In short, just installing using npm or yarn like this will get you
started.

```shell
	$ yarn install progress-up-vue
```

or

```shell
	$ npm install progress-up-vue
```

Then just put this inside the HTML source the tags needed and you are
done.

```html
	<progress-up></progress-up>
```


## Challenges

The only challenge I faced in the vue work was the unhelpful debug
messages.

